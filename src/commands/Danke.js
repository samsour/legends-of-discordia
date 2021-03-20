import BaseCommand from './BaseCommand.js';

export default class Danke extends BaseCommand {
    constructor() {
        super({
            aliases: ['danke', 'd']
        })
    }

    execute({message}) {
        message.reply('Gerne!');
    }

    detlef({message}) {
        message.reply('Kein Ding Brudi, ich mach dich krass!');
    }
}