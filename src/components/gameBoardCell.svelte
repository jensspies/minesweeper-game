<script lang="ts">

import Bomb from "./cellTypes/bomb.svelte";
import Dummy from "./cellTypes/dummy.svelte";
import MarkedBomb from "./cellTypes/markedBomb.svelte";
import MarkedQuestion from "./cellTypes/markedQuestion.svelte";
import Revealed from "./cellTypes/revealed.svelte";
import Untouched from "./cellTypes/untouched.svelte";


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
            case currentCell.mark === '1':
                component = MarkedBomb;
                break;
            case currentCell.mark === '2':
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
</style>

    <div class="cell {additionalClass}" >
        {#if currentCell}
            <svelte:component this={findComponent()} bind:cell={currentCell}/>
        {/if}
    </div>
