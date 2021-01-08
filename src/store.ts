import { writable } from 'svelte/store';
import { createFiFoMessageQueue, createFiFoStringQueue } from './modules/fiFoQueueStore';
import { createIdStore, createStringIdStore } from './modules/myIdStore';

export const myWebsocketId = createStringIdStore();

export const gameSelection = writable('');

export const availableTypes = writable([]);

export const myCurrentGameId = createIdStore();

export const chatMessageQueue = createFiFoMessageQueue();

export const gameStatusMessageQueue = createFiFoMessageQueue();

// TODO: Define different stores for message types to be defined)