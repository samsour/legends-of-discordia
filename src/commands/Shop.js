/** @typedef {import('discord.js/src/structures/Message')} Message */

import BaseCommand from './BaseCommand.js';

export default class Shop extends BaseCommand {
    /**
     *
     */
    constructor() {
        super(['shop', 'sh']);
    }

    /**
     * @param {Message} message
     * @param {Array<string>} args
     */
    item(message, args = []) {
        message.reply(`Item "${args.join(' ')}" ist nicht auf lager. Geh weg!`);
    }
}
