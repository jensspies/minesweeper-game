
<script lang="ts">
import type { Cell } from "../../main";


    const space = ' ';
    export let cell: Cell;
</script>
{#if cell.bombNeighbours > 0 }
 {cell.bombNeighbours}
{:else}
 &nbsp;
{/if}