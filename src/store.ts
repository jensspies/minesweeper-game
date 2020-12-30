import { createFiFoMessageQueue, createFiFoStringQueue } from './modules/fiFoQueueStore';
import { createIdStore } from './modules/myIdStore';

export const myWebsocketId = createIdStore();

export const chatMessageQueue = createFiFoMessageQueue();

export const gameUpdateMessageQueue = createFiFoStringQueue();

// TODO: Define different stores for message types to be defined)