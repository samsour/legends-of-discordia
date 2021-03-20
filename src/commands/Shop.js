import BaseCommand from './BaseCommand.js';

export default class Shop extends BaseCommand {
    constructor() {
        super({
            aliases: ['shop', 'sh']
        })
    }

    item({args}) {
        console.log(`Shopping items: "${args}"`);
    }
}