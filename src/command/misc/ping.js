module.exports = {
    commands: 'ping',
    minArgs: 0,
    maxArgs: 0,
    callback: (message, arguments, text) => {
        if (Math.random() > 0.15) {
            message.reply('Pong! SCHMETTERBALL!')
        } else {
            message.reply('Pong!')
        }
    },
  }