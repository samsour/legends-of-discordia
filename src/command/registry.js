import { eventEmitter, Events } from '../events.js';

export default class CommandRegistry {
    constructor() {
        eventEmitter.on(Events.DISCORD.READY, () => {
            console.log('CommandRegistry received event: ', Events.DISCORD.READY);
        })
    }
}
