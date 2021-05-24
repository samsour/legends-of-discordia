/** @typedef {import('discord.js/src/structures/Message')} Message */

import Client from '../../node_modules/discord.js/src/client/Client.js';
import CommandRegistry from './CommandRegistry.js';

/**
 * TODO i think it'd be cooler if this class actually was the discord.js-client (maybe by extending it?)
 * and all it does is directly registering events on construct or something.
 */
export default class DiscordClient {
    /**
     * @type {Client}
     * @private
     */
    _client = new Client();

    /**
     * @type {CommandRegistry}
     * @private
     */
    _commandRegistry = new CommandRegistry();

    /**
     * @param {Client} client
     * @param {CommandRegistry} commandRegistry
     */
    constructor(client = new Client(), commandRegistry = new CommandRegistry()) {
        this._client = client;
        this._commandRegistry = commandRegistry;

        this._client.on('ready', () => this._commandRegistry.readCommands());

        /** @var {Message} message */
        this._client.on('message', (message) => this._handleMessage(message));
    }

    /**
     * @param {string} token
     * @return {Promise<string>}
     */
    login(token) {
        return this._client.login(token);
    }

    /**
     * @param {Message} message
     * @return {void}
     */
    _handleMessage(message) {
        const { content } = message;

        if (!content.startsWith(process.env.COMMAND_PREFIX)) {
            return;
        }

        // Split on any number of spaces after the prefix
        const args = content.slice(process.env.COMMAND_PREFIX.length).trim().split(/[ ]+/);
        // Command typed by user
        const userCommand = args.shift();

        // const command = `${process.env.PREFIX}${alias.toLowerCase()}`;

        const avaliableCommands = this._commandRegistry.getCommands(message);

        if (avaliableCommands.has(userCommand)) {
            const selectedCommand = avaliableCommands.get(userCommand);

            if (0 < args.length) {
                const commandActionName = args[0];

                if (typeof selectedCommand[commandActionName] === 'function') {
                    // Remove action name from function arguments
                    args.shift();

                    selectedCommand[commandActionName](message, args);
                    return;
                }
            }
            selectedCommand.execute(message, args);
        }
    }
}
