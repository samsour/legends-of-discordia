/** @typedef {import('discord.js/src/structures/Message')} Message */

import BaseCommand from './BaseCommand.js';
import ItemFactory from '../factory/ItemFactory.js';
import Item from '../schema/Item.js';
import mongoose from 'mongoose';
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
    async item(message, args = []) {
        // await mongoose.connection.db.dropDatabase();

        if (!args[0]) {
            return message.reply(`Kein Itemname übergeben. Geh weg!`);
        }

        const item = await Item.findOne({name: args[0]});
        if (item !== null) {
            return message.reply(`Item "${args[0]}" gibt es schon. Geh weg!`);
        }

        const newItem = await ItemFactory.create('sword', args[0], 123, ['forest', 'wiese'], 'weapon', {atk: 12, range: 1});
        return message.reply(`Item "${newItem.name}" ist erstellt`);
    }

    /**
     * @param {Message} message
     * @param {Array<string>} args
     */
    async execute(message, args = []) {
        const items = await Item.find();
        if (items.length === 0) {
            return message.reply(`Shop has no goods to display. Please come back later.`);
        }
        return message.reply(`Vergügbare items:\n- ${(items.map((item) => item.name)).join('\n- ')}`);
    }
}
