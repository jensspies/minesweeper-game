import { writable } from "svelte/store";
import type { GameIdMessage } from "../classes/messages/gameId";
import type { WelcomeMessage } from "../classes/messages/welcome";

export const createStringIdStore = () => {
  // initialize internal writable store with empty list
  const { subscribe, set } = writable('');

  const init = (message: WelcomeMessage): void => {
      set(message.getId());
  }

  return {
    subscribe,
    init
  };
};

export const createIdStore = () => {
  // initialize internal writable store with empty list
  const { subscribe, set } = writable('');

  const init = (message: GameIdMessage): void => {
      set(message.getId());
  }

  return {
    subscribe,
    init
  };
};

