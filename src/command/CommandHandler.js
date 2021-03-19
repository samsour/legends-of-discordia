import { eventEmitter, Event } from '../Event.js';
import fs from 'fs';
import path from 'path';
import Command from './Command.js';

export default class CommandRegistry {

	/**
	 * @type {Array<string>}
	 */
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
	]

	/**
	 * @type {Array[Command]}
	 */
	_commands = new Map();

	/**
	 * 
	 * @param {FileSystemDirectoryEntry|string} directory 
	 */
	async readCommands(directory) {
		const __dirname = path.dirname(new URL(import.meta.url).pathname);
		const files = fs.readdirSync(path.join(__dirname, directory));

		for (const file of files) {
			const statsObject = fs.lstatSync(path.join(__dirname, directory, file));

			if (statsObject.isDirectory()) {
				readCommands(path.join(directory, file));
			} else if (file !== Command) {
				const { default: ClassName } = await import(path.join(__dirname, directory, file));
				this._commands.set(Object.keys(ClassName)[0], ClassName);
			}
		}

		console.log(`Registered commands: ${this._commands.entries}`);
	}

	getCommands(message) {
		const { member, content, guild } = message;
		const availableCommands = new Map();

		this._commands.forEach((command, key) => {
			// Ensure the user has the required permissions
			for (const permission of command.config.permissions) {
				if (!member.hasPermission(permission)) {
					// TODO: Handle permission error client reply
					// message.reply(permissionError);
					return;
				}
			}
	
			// Ensure the user has the required roles
			for (const requiredRole of command.config.requiredRoles) {
				const role = guild.roles.cache.find(
					(role) => role.name === requiredRole,
				);
	
				if (!role || !member.roles.cache.has(role.id)) {
					// TODO: Handle permission error client reply
					// message.reply(
					// 	`You must have the "${requiredRole}" role to use this command.`,
					// );
					return;
				}
			}

			command.config.aliases.forEach(alias => availableCommands.set(alias, command))
		})
	}
}
