<script lang="ts">
import GameBoardCell from "./gameBoardCell.svelte";


    export let currentRowCells: any[];
</script>

<style>
    .boardRow {
        padding: 2px 0px;
    }

</style>
    <div class="boardRow">
        {#if currentRowCells}
            {#each currentRowCells as cell}
                <GameBoardCell on:revealCell on:toggleMark bind:currentCell={cell} />
            {/each}
        {/if}
    </div>