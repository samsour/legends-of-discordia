import BaseCommand from './BaseCommand.js';

export default class Ping extends BaseCommand {
    constructor() {
        super({
            aliases: ['ping', 'p']
        })

    }
    smash(args) {
        console.log(`SMASHING ${args}`);
    }
}