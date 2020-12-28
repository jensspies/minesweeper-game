import { writable } from 'svelte/store';

import { createFiFoQueue } from './modules/fiFoQueue';

export const myWebsocketId = writable('');

export const messageQueue = createFiFoQueue();

