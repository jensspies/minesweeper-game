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
    div.cell {
        width:30px;
        height: 30px;
        display: inline-block;
        margin: 1px 1px 1px 2px;
        border-radius: 5px;
        background-color: lightgray;
        -webkit-user-select: none;  /* Chrome all / Safari all */
        -moz-user-select: none;     /* Firefox all */
        -ms-user-select: none;      /* IE 10+ */
        user-select: none;
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

    div.markedBomb.won {
        background-color: green;
    }

    div.revealed {
        background-color: gray;
        border: 1px solid;
        margin:0px 0px 0px 1px;
        border-color: white;
    }
</style>

    <div class="cell {additionalClass}"
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
