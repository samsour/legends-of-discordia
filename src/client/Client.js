import { Client } from 'discord.js';
import CommandHandler from './CommandHandler.js';

/**
 * TODO i think it'd be cooler if this class actually was the discord.js-client (maybe by extending it?)
 * and all it does is directly registering events on construct or something.
 */
export default class DiscordClient {
    /**
     * @type {Client}
     * @private
     */
    _client = new Client();

    /**
     *
     */
    constructor() {
        this._commandHandler = new CommandHandler();
        
        this._client.on('ready', () => {

            this._commandHandler.readCommands();
        });

        this._client.on('message', (message) => {
            console.log("> Client: on message");
            const { member, content, guild } = message;

            console.log(`Starts with ${process.env.COMMAND_PREFIX}? ${content.startsWith(process.env.COMMAND_PREFIX)}`);
            if (!content.startsWith(process.env.COMMAND_PREFIX)) return;
            
            // Split on any number of spaces after the prefix
            const args = content.slice(process.env.COMMAND_PREFIX.length).trim().split(/[ ]+/);
            // Command typed by user
            const userCommand = args.shift();

            console.log(`User command: ${userCommand}`);

            // const command = `${process.env.PREFIX}${alias.toLowerCase()}`;


            const avaliableCommands = this._commandHandler.getCommands(message);

            if (avaliableCommands.has(userCommand)) {
                const selectedCommand = avaliableCommands.get(userCommand);
                const firstArgument = args[0];

                if (0 < args.length) {
                    if (typeof selectedCommand[firstArgument] === 'function') {
                        // Delete function argument
                        args.shift();
                        selectedCommand[firstArgument](args.length > 0 ? args : '');
                        return;
                    }
                    selectedCommand.execute(args);
                    return;
                }
                selectedCommand.execute();
            }
        });
    }

    /**
     * @param {string} token
     * @return {Promise<string>}
     */
    login(token) {
        return this._client.login(token);
    }
}
