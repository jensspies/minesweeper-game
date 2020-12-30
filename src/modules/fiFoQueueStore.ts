import { writable } from 'svelte/store';
import type { Message } from '../classes/message';

/* with kind support of https://codechips.me/building-notification-center-with-svelte-stores/ */
export const createFiFoStringQueue = () => {
    // initialize internal writable store with empty list
    const { subscribe, set, update } = writable('');

    const queue: string[] = [];

    // mark message as read by removing it from the list
    const nextMessage = function (): void {
        if (queue.length > 0) {
            update( () => {
                const nextItem = queue.shift();
                return nextItem;
            });
        }
    }

    const add = (message: string) => {queue.push(message);};

    setInterval(nextMessage, 3);

    return {
      subscribe,
      add,
      init: set, // alias set method to init
    };
};

export const createFiFoMessageQueue = () => {
    // initialize internal writable store with empty list
    const { subscribe, set, update } = writable(undefined);

    const queue: Message[] = [];

    // mark message as read by removing it from the list
    const nextMessage = function (): void {
        if (queue.length > 0) {
            update( (): Message => {
                const nextItem = queue.shift();
                return nextItem;
            });
        }
    }

    const add = (message: Message) => {queue.push(message);};

    setInterval(nextMessage, 3);

    return {
      subscribe,
      add,
      init: set, // alias set method to init
    };
};
