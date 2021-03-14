/** @typedef {import('discord.js/src/structures/Message')} Message */

export default class CharacterCommand {
    /**
     * default command action
     */
    execute() {
        console.log('CharacterCommand.execute();');
    }

    /**
     * @param {Array<string>} args
     */
    info(args) {
        console.log('CharacterCommand.info(); ', args);
    }

    /**
     * @param {Array<string>} args
     * @param {Message} message
     */
    create(args, message) {
        console.log('CharacterCommand.execute();');
    }
}
