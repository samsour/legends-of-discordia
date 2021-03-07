const itemSystem = require('../../itemSystem')

module.exports = {
    commands: 'getall',
    expectedArgs: '<type>',
    permissionError: 'You need admin permissions to run this command',
    minArgs: 1,
    maxArgs: 1,
    callback: async (message, arguments) => {

      const type = arguments.shift();
      const items = await itemSystem.getAllItems(type);

      message.reply(
        `
        All items of type "${type}":
        ${items.join('\n    ')}
        `
      )
    },
  }