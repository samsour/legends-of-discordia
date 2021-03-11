import { eventEmitter, Event } from '../Event.js';

export default class CommandRegistry {
    /**
     *
     */
    constructor() {
        eventEmitter.on(Event.DISCORD.READY, () => {
            console.log('CommandRegistry received event: ', Event.DISCORD.READY);

            const baseFile = 'command-base.js'
            const commandBase = require(`./commands/${baseFile}`)

            readCommands('commands')
        });
    }

    /**
     * 
     * @param {*} directory 
     */
    readCommands(directory) {
        const files = fs.readdirSync(path.join(__dirname, dir))
        for (const file of files) {
          const stat = fs.lstatSync(path.join(__dirname, dir, file))
          if (stat.isDirectory()) {
            readCommands(path.join(dir, file))
          } else if (file !== baseFile) {
            const option = require(path.join(__dirname, dir, file))
            commandBase(client, option)
          }
        }
      }
    
      
}
