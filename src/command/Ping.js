import Command from './Command.js';

export default class Ping extends Command {
    constructor() {
        super(client, {
            aliases: ['ping', 'p']
        })
    }

    execute() {
        console.log("Do something!")
    }

    smash() {

    }
}