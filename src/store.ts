import { createFiFoMessageQueue, createFiFoStringQueue } from './modules/fiFoQueueStore';
import { createIdStore, createStringIdStore } from './modules/myIdStore';

export const myWebsocketId = createStringIdStore();

export const myCurrentGameId = createIdStore();

export const chatMessageQueue = createFiFoMessageQueue();

export const gameUpdateMessageQueue = createFiFoStringQueue();

// TODO: Define different stores for message types to be defined)