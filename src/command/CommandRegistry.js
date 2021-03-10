import { eventEmitter, Event } from '../Event.js';

export default class CommandRegistry {
    /**
     *
     */
    constructor() {
        eventEmitter.on(Event.DISCORD.READY, () => {
            console.log('CommandRegistry received event: ', Event.DISCORD.READY);
        });
    }
}
