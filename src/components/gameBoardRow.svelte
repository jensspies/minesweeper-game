<script lang="ts">

    import GameBoardCell from "./gameBoardCell.svelte";

    export let currentRowCells: any[];
    export let gameWon: boolean;
</script>

<style>
    .boardRow {
        padding: 1px 0px;
        -webkit-user-select: none;  /* Chrome all / Safari all */
        -moz-user-select: none;     /* Firefox all */
        -ms-user-select: none;      /* IE 10+ */
        user-select: none;
    }

</style>
    <div class="boardRow">
        {#if currentRowCells}
            {#each currentRowCells as cell}
                <GameBoardCell
                    bind:gameWon={gameWon}
                    bind:currentCell={cell}
                    on:revealCell
                    on:toggleMark
                    on:revealSafeCell
                />
            {/each}
        {/if}
    </div>