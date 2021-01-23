import { myObservedGames } from "../store";
import type { GameStatusMessage } from "./messages/gameStatus";

export interface IndexedGameObject {
    index: number,
    game: GameStatusMessage
}

export class GameKeeper {
    myRunningGames: GameStatusMessage[] = [];
    indexMapping: any = {}

    public updateGame(game: GameStatusMessage) {
        //this.addMultipleGames(game);
        this.keepSingleGame(game);
        myObservedGames.set([]);
        myObservedGames.set(this.myRunningGames);
    }

    private keepSingleGame(game: GameStatusMessage) {
        this.myRunningGames = [game];
    }

    /**
     * TODO: doesn't work like expected yet.
     * App-Component gets confused with multiple the game boards
     * (probably missing "Object-Index")
     * @param game
     */
    private addMultipleGames(game: GameStatusMessage) {
        const gameIndex = this.indexMapping[game.gameId];
        if (gameIndex !== undefined) {
            this.myRunningGames[gameIndex] = game;
        } else {
            const newIndex = (this.myRunningGames.push(game) - 1);
            this.indexMapping[game.gameId] = newIndex;
        }
    }

    public removeFinishedGames(): void {
        const removeEntries: number[] = [];
		this.myRunningGames.forEach((game, index) => {
            if (game.isOver) {
                removeEntries.push(index);
            };
        })
        removeEntries.forEach((index) => {
            this.myRunningGames.splice(index, 1);
            this.indexMapping[index] = undefined;
        });
        myObservedGames.set(this.myRunningGames);
    }

}