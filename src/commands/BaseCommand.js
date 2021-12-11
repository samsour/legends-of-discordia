/** @typedef {import('discord.js/src/structures/Message')} Message */

import NotImplementedError from '../error/NotImplementedError.js';

export default class BaseCommand {
    /**
     * @type {Object}
     */
    config = {
        expectedArgs: '',
        permissionError: 'You do not have permission to run this command.',
        minArgs: 0,
        maxArgs: null,
        permissions: [],
        requiredRoles: [],
    };

    /**
     * @param {Array<string>} aliases
     * @param {Object} options
     */
    constructor(aliases = [], options = {}) {
        this.config = {
            ...this.config,
            aliases,
            ...options,
        };
    }

    /**
     * @param {Message} message
     * @param {Array<string>} args
     */
    execute(message, args = []) {
        throw new NotImplementedError();
    }
}
