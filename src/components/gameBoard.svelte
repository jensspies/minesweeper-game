<script lang="ts">
import { onMount } from "svelte";

import type { GameStatusMessage } from "../classes/messages/gameStatus";
import { gameStatusMessageQueue } from "../store";
import GameBoardRow from "./gameBoardRow.svelte";

    let currentGameboard: GameStatusMessage;
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
                currentGameboard = value;
                gameRows = getBoardRows();
			}
		});
    });

</script>

<div id='gameboard'>
    <div class="gameBoarder">
        {#if currentGameboard}
            {#each gameRows as cellRow}
                <GameBoardRow on:revealCell on:toggleMark bind:currentRowCells={cellRow}/>
            {/each}
        {/if}
    </div>

</div>