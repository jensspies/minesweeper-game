import { writable } from 'svelte/store';
import { createFiFoMessageQueue, createFiFoStringQueue } from './modules/fiFoQueueStore';
import { createIdStore, createStringIdStore } from './modules/myIdStore';

export const myWebsocketId = createStringIdStore();

export const gameSelection = writable('');

export const availableTypes = writable([]);

export const myCurrentGameId = createIdStore();

export const chatMessageQueue = createFiFoMessageQueue();

export const gameStatusMessageQueue = createFiFoMessageQueue();

export const openGamesToObserveQueue = createFiFoMessageQueue();

export let myObservedGames = writable([]);