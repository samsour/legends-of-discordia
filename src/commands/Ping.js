import BaseCommand from './BaseCommand.js';

export default class Ping extends BaseCommand {
    constructor() {
        super({
            aliases: ['ping', 'p']
        })
    }

    execute({message}) {
        message.reply('Pong!');
    }

    smash({message}) {
        message.reply('SCHMETTERBALL!');
    }
}