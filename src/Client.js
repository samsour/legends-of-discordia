import { Client } from 'discord.js';
import CommandHandler from './command/CommandHandler.js';

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
            this._commandHandler.readCommands('./');
        });

        this._client.on('message', (message) => {
            const { member, content, guild } = message;

            // Split on any number of spaces
            const args = content.split(/[ ]+/);
            
            // Command typed by user
            const userCommand = args.shift();


            // const command = `${process.env.PREFIX}${alias.toLowerCase()}`;


            const avaliableCommands = this._commandHandler.getCommands(message);

            if (avaliableCommands.has(userCommand)) {
                const selectedCommand = avaliableCommands.get(userCommand);
                const firstArgument = args[0];

                if (0 < args.length) {
                    if (typeof selectedCommand[firstArgument] === 'function') {
                        args.shift();
                        characterCommand[firstArgument](args);
                        return;
                    }
                    characterCommand.execute(args);
                    return;
                }
                characterCommand.execute();
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
