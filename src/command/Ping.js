import Command from './Command.js';

export default class Ping extends Command {
    constructor() {
        super(client, {
            commands: 'ping',
            minArgs: 0,
            maxArgs: 0,
            execute: (message, args, text) => {
                message.reply('Pong!')
            },
        })
    }
}