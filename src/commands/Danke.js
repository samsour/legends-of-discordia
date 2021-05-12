/** @typedef {import('discord.js/src/structures/Message')} Message */

import BaseCommand from './BaseCommand.js';

export default class Danke extends BaseCommand {
    /**
     *
     */
    constructor() {
        super({
            aliases: ['danke', 'd'],
        });
    }

    /**
     * @param {Message} message
     * @param {Array<string>} args
     */
    execute(message, args = []) {
        message.reply('Gerne!');
    }

    /**
     * @param {Message} message
     * @param {Array<string>} args
     */
    detlef(message, args = []) {
        message.reply('Kein Ding Brudi, ich mach dich krass!');
    }
}
