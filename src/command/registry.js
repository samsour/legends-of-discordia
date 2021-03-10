import { eventEmitter, Event } from '../event.js';

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
