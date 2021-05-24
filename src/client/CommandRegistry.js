/** @typedef {import('discord.js/src/structures/Message')} Message */
/** @typedef {import('./../commands/BaseCommand')} BaseCommand */

import fs from 'fs';
import path from 'path';

export default class CommandRegistry {
    _validPermissions = [
        'CREATE_INSTANT_INVITE',
        'KICK_MEMBERS',
        'BAN_MEMBERS',
        'ADMINISTRATOR',
        'MANAGE_CHANNELS',
        'MANAGE_GUILD',
        'ADD_REACTIONS',
        'VIEW_AUDIT_LOG',
        'PRIORITY_SPEAKER',
        'STREAM',
        'VIEW_CHANNEL',
        'SEND_MESSAGES',
        'SEND_TTS_MESSAGES',
        'MANAGE_MESSAGES',
        'EMBED_LINKS',
        'ATTACH_FILES',
        'READ_MESSAGE_HISTORY',
        'MENTION_EVERYONE',
        'USE_EXTERNAL_EMOJIS',
        'VIEW_GUILD_INSIGHTS',
        'CONNECT',
        'SPEAK',
        'MUTE_MEMBERS',
        'DEAFEN_MEMBERS',
        'MOVE_MEMBERS',
        'USE_VAD',
        'CHANGE_NICKNAME',
        'MANAGE_NICKNAMES',
        'MANAGE_ROLES',
        'MANAGE_WEBHOOKS',
        'MANAGE_EMOJIS',
    ];

    /**
     * @type {Map<string, Class<BaseCommand>>}
     */
    _commands = new Map();

    /**
       * @type {String}
     */
    _commandDirectory = '../commands';

    /**
     * @type {String}
     */
    _ignoreFiles = ['BaseCommand.js'];

    /**
     *
     * @param {string} directory
     */
    async readCommands(directory = this._commandDirectory) {
        const directoryName = path.dirname(new URL(import.meta.url).pathname);
        const files = fs.readdirSync(path.join(directoryName, directory));

        for (const file of files) {
            const statsObject = fs.lstatSync(path.join(directoryName, directory, file));

            if (statsObject.isDirectory()) {
                await this.readCommands(path.join(directory, file));
            } else if (!this._ignoreFiles.includes(file)) {
                const { default: CommandClass } = await import(path.join(directoryName, directory, file));
                this._commands.set(CommandClass.name, CommandClass);
            }
        }
    }

    /**
     * @param {Message} message
     * @return {Map}
     */
    getCommands(message) {
        const { member, guild } = message;
        const availableCommands = new Map();

        this._commands.forEach((Command, key) => {
            const commandInstance = new Command();

            // Ensure the permissions are in an array and are all valid
            if (this._validateCommandPermissionNames(commandInstance.config.permissions) === false) {
                return;
            }

            // Ensure the user has the required permissions
            for (const permission of commandInstance.config.permissions) {
                if (!member.hasPermission(permission)) {
                    // TODO: Handle permission error client reply
                    // message.reply(permissionError);
                    return;
                }
            }

            // Ensure the user has the required roles
            for (const requiredRole of commandInstance.config.requiredRoles) {
                const role = guild.roles.cache.find(
                    (role) => role.name === requiredRole,
                );

                if (role && member.hasPermission(requiredRole)) {
                    continue;
                }

                if ( !(( role || member.hasPermission(requiredRole) ) && !( role && member.hasPermission(requiredRole) )) ) {
                    // TODO: Handle permission error client reply
                    // message.reply(
                    //     `You must have the "${requiredRole}" role to use this command.`,
                    // );
                    return;
                }
            }

            commandInstance.config.aliases.forEach((alias) => {
                availableCommands.set(alias, commandInstance);
            });
        });
        return availableCommands;
    }

    /**
     * @param {Array<string>} permissions
     * @return {boolean}
     * @private
     */
    _validateCommandPermissionNames(permissions) {
        if (permissions.length === 0) {
            return true;
        }

        for (const permission of permissions) {
            if (!this._validPermissions.includes(permission)) {
                return false;
            }
        }
        return true;
    };
}
