import { EventEmitter } from 'events';

const eventEmitter = new EventEmitter();
const Event = {
    DISCORD: {
        READY: 'discord:ready',
    },
};

export { eventEmitter, Event };
