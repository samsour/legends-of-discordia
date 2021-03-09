import { Client } from 'discord.js';
import { eventEmitter, Events } from './events.js';

/**
 * TODO i think it'd be cooler if this class actually was the discord.js-client (maybe by extending it?)
 * and all it does is directly registering events on construct or something.
 */
export default class DiscordClient {
    _client;

    constructor() {
        this._client = new Client();
        this._client.on('ready', () => eventEmitter.emit(Events.DISCORD.READY))
    }

    /**
     * @param {string} token
     * @returns {Promise<string>}
     */
    login(token) {
        return this._client.login(token);
    }
}
