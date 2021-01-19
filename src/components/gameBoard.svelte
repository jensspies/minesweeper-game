<script lang="ts">
import { onMount } from "svelte";

import type { GameStatusMessage } from "../classes/messages/gameStatus";
import { gameStatusMessageQueue } from "../store";
import GameBoardRow from "./gameBoardRow.svelte";

    let currentGameboard: GameStatusMessage;
    export let currentGameId: number = -1;
    let gameRows: any[];

    let getBoardRows = (): any[] => {
        const rows = [];
        let startIndex = 0;
        const width = currentGameboard.getWidth();
        const height = currentGameboard.getHeight();
        const maximumIndex = (height * width);
        while (startIndex + width <=  maximumIndex) {
            rows.push(currentGameboard.getCells().filter( (item, index) => {
                const greaterThanMinIndex = index >= startIndex;
                const smallerThanMaxIndex = index < startIndex + width;
                return greaterThanMinIndex && smallerThanMaxIndex;
            }));
            startIndex += width;
        }
        return rows;
    };

    onMount(() => {
		const gameStatusSubscription = gameStatusMessageQueue.subscribe(value => {
			if (value) {
                if ((currentGameId > -1) || !currentGameboard || value.gameId == currentGameboard.getId()) {
                    currentGameboard = value;
                    gameRows = getBoardRows();
                }
			}
		});
    });

</script>

<style>
    div#gameboard {
        text-align: center;
    }

    div.gameBorder {
        display: inline-block;
        background-color: gray;
        padding: 2px 4px 2px 3px;
        border-radius: 5px;
        -webkit-user-select: none;  /* Chrome all / Safari all */
        -moz-user-select: none;     /* Firefox all */
        -ms-user-select: none;      /* IE 10+ */
        user-select: none;
    }

</style>
<div id='gameboard'>
    {#if currentGameboard}
        <p>Marked {currentGameboard.getMarkedBombs()} of {currentGameboard.getTotalBombs()}</p>
        {#if currentGameboard.getGameStatus() === 'Won'}
            <p>YOU WON!!!</p>
        {/if}
        <div class="gameBorder">
                {#each gameRows as cellRow}
                    <GameBoardRow
                        bind:currentRowCells={cellRow}
                        on:revealCell
                        on:toggleMark
                        on:revealSafeCell/>
                {/each}
        </div>
    {/if}

</div>