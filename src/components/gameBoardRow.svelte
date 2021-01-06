<script lang="ts">
import GameBoardCell from "./gameBoardCell.svelte";


    export let currentRowCells: any[];
</script>

    <div class="boardRow">
        {#if currentRowCells}
            {#each currentRowCells as cell}
                <GameBoardCell bind:currentCell={cell} />
            {/each}
        {/if}
    </div>