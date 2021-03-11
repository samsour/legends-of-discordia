/** @typedef {import('discord.js/src/structures/Message')} Message */

export default class Command {
    /**
     * @param {Array<string>} aliases
     * @param {Object} options
     */
    constructor(aliases = [], options = {}) {
        this.config = {
            expectedArgs: '',
            permissionError: 'You do not have permission to run this command.',
            minArgs: 0,
            maxArgs: null,
            permissions: [],
            requiredRoles: [],
            aliases,
            ...options,
        };
    }

    /**
     * @param {Message} message
     * @param {Array<string>} args
     */
    execute(message, args = []) {
        console.log(`Command run: "${this.config.aliases[0]}" with ${args}`);
    }
}
