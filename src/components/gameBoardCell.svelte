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
    let additionalClass: string = '';
    const findComponent = () => {
        let component = Untouched;
        switch (true) {
            case currentCell.exploded:
                additionalClass = 'exploded';
                component = Bomb;
                break;
            case currentCell.isRevealed:
                component = Revealed;
                break;
            case currentCell.isDummy:
                additionalClass = 'dummy';
                component = Dummy;
                break;
            case currentCell.mark === 1:
                additionalClass = 'markedBomb';
                component = MarkedBomb;
                break;
            case currentCell.mark === 2:
                additionalClass = 'markedQuestion';
                component = MarkedQuestion
                break;
            default:
                additionalClass = '';
        }
        return component;
    }

</script>

<style>
    div.cell {
        width:30px;
        height: 30px;
        display: inline-block;
    }
    div.exploded {
        background-color: red;
    }
    div.dummy {
        background-color: yellow;
    }

    div.markedBomb {
        background-color: orange;
    }
</style>

    <div class="cell {additionalClass}"
        on:contextmenu|preventDefault="{() => dispatch('toggleMark', currentCell.coord)}"
        on:click="{() => dispatch('revealCell', currentCell.coord)}"
        >
        {#if currentCell}
            <svelte:component this={findComponent()} bind:cell={currentCell}/>
        {/if}
    </div>
