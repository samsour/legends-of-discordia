import { Client } from 'discord.js';
import { eventEmitter, Event } from './Event.js';
import CharacterCommand from './command/CharacterCommand.js';

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
     *
     */
    constructor() {
        this._client.on('ready', () => eventEmitter.emit(Event.DISCORD.READY));

        this._client.on('message', (message) => {
            if (!message.content.startsWith(process.env.PREFIX) || message.author.bot) return;

            const userCommandArguments = message.content.slice(process.env.PREFIX.length).trim().split(' ');
            const command = userCommandArguments.shift().toLowerCase();

            if (command === 'character') {
                const characterCommand = new CharacterCommand();
                if (0 < userCommandArguments.length) {
                    const action = userCommandArguments.shift();

                    if (typeof characterCommand[action] === 'function') {
                        characterCommand[action](userCommandArguments);
                        return;
                    }
                }

                characterCommand.execute();
                // message.reply('Pong.');
            }
        });
    }

    /**
     * @param {string} token
     * @return {Promise<string>}
     */
    login(token) {
        return this._client.login(token);
    }
}
