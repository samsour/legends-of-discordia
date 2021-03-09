import { EventEmitter } from 'events';

const eventEmitter = new EventEmitter();
const Events = {
    DISCORD: {
        READY: 'discord:ready',
    },
};

export { eventEmitter, Events };
