<script lang="ts">
import { createEventDispatcher } from "svelte";


import Bomb from "./cellTypes/bomb.svelte";
import Dummy from "./cellTypes/dummy.svelte";
import MarkedBomb from "./cellTypes/markedBomb.svelte";
import MarkedQuestion from "./cellTypes/markedQuestion.svelte";
import Revealed from "./cellTypes/revealed.svelte";
import Untouched from "./cellTypes/untouched.svelte";

    const dispatch: ((name: string, detail?: any) => void) = createEventDispatcher();

    export let currentCell: any;
    export let gameWon: boolean;
    let additionalClass: string = '';

    const findComponent = () => {
        let component = Untouched;
        let newClass = '';
        switch (true) {
            case currentCell.exploded:
                newClass = 'exploded';
                component = Bomb;
                break;
            case currentCell.isRevealed:
                newClass = 'revealed';
                component = Revealed;
                break;
            case currentCell.isDummy:
                newClass = 'dummy';
                component = Dummy;
                break;
            case currentCell.mark === 1:
                newClass = 'markedBomb';
                if (gameWon) {newClass += ' won';}
                component = MarkedBomb;
                break;
            case currentCell.mark === 2:
                newClass = 'markedQuestion';
                component = MarkedQuestion
                break;
            default:
        }
        additionalClass = newClass;
        return component;
    }

</script>

<style>
    .cell {
        @apply h-5;
        @apply w-5;
        @apply m-0.5;
        @apply text-xs;
        @apply md:h-10;
        @apply md:w-10;
        @apply md:text-lg;
        @apply select-none;
        @apply bg-gray-400;
        @apply rounded-md;
    }

    div.exploded {
        @apply bg-red-700;
    }
    div.dummy {
        @apply bg-yellow-400;
    }

    div.markedBomb {
        @apply bg-yellow-600;
    }

    div.markedBomb.won {
        @apply bg-green-600;
    }

    div.revealed {
        @apply bg-gray-500;
        border-width: 1px;
        @apply border-white;
        @apply border-solid;
    }

</style>

    <div class="cell border-white border-solid {additionalClass}"
        on:contextmenu|preventDefault="{() => dispatch('toggleMark', currentCell.coord)}"
        on:click="{() => dispatch('revealCell', currentCell.coord)}"
        on:dblclick="{() => dispatch('revealSafeCell', currentCell.coord)}"
        >
        {#if currentCell}
        <span>
            <svelte:component this={findComponent()} bind:cell={currentCell}/>
        </span>
        {/if}
    </div>
