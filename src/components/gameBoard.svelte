<script lang="ts">
import { createEventDispatcher, onMount } from "svelte";
import { current_component } from "svelte/internal";

import type { GameStatusMessage } from "../classes/messages/gameStatus";
import GameBoardRow from "./gameBoardRow.svelte";

    export let myGameBoard: GameStatusMessage;
    const dispatch: ((name: string, detail?: any) => void) = createEventDispatcher();
    onMount(() => {
    });

    const toggleMark = (event) => {
        const data = event.detail;
        data['gameId'] = myGameBoard.gameId;
        dispatch(event.type, data);
    }

    const revealCell = (event) => {
        const data = event.detail;
        data['gameId'] = myGameBoard.gameId;
        dispatch(event.type, data);
    }

    const revealSafeCell = (event) => {
        const data = event.detail;
        data['gameId'] = myGameBoard.gameId;
        dispatch(event.type, data);
    }
</script>

<style>

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
<div id='gameboard' class="">
    {#if myGameBoard}
        {#if myGameBoard.gameWon}
            <p class="text-center">YOU WON!!!</p>
        {:else}
            <p class="text-center">Marked {myGameBoard.getMarkedBombs()} of {myGameBoard.getTotalBombs()}</p>
        {/if}
        <div class="bg-gray-500 inline-flex flex-col rounded-md select-none p-1 text-center">
            {#each myGameBoard.cellRows as cellRow}
                    <GameBoardRow
                    bind:gameWon={myGameBoard.gameWon}
                    bind:currentRowCells={cellRow}
                    on:revealCell={revealCell}
                    on:toggleMark={toggleMark}
                    on:revealSafeCell={revealSafeCell}/>
            {/each}
        </div>
    {:else}
        GameBoard seems not to be defined
    {/if}

</div>