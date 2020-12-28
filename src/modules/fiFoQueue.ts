import { writable } from 'svelte/store';

/* with kind support of https://codechips.me/building-notification-center-with-svelte-stores/ */
export const createFiFoQueue = () => {
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
