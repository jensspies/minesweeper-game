
<script lang="ts">
    const space = ' ';
    export let cell: any;
</script>
{#if cell.bombNeighbours > 0 }
 {cell.bombNeighbours}
{:else}
 &nbsp;
{/if}