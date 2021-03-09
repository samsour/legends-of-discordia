const itemSystem = require('../../itemSystem');

module.exports = {
    commands: 'add',
    expectedArgs: '<type> <name>',
    permissionError: 'You need admin permissions to run this command',
    minArgs: 2,
    callback: async (message, args) => {
        const type = args.shift();
        const name = args.join(' ');
        const value = 5;
        const dropsAt = [0, 25];

        await itemSystem.addItem(type, name, value, dropsAt);

        message.reply(
            `You have created a ${type} item called "${name}". You can find it at level ${dropsAt.join(' - ')}!`,
        );
    },
};
