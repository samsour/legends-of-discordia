import { Client } from 'discord.js';
import { eventEmitter, Event } from './event.js';

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
    }

    /**
     * @param {string} token
     * @return {Promise<string>}
     */
    login(token) {
        return this._client.login(token);
    }
}
