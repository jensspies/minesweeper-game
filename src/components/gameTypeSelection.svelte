
<script lang="ts">
import { createEventDispatcher } from "svelte";
import type { OptionSelect } from "../main.d";

export let options: Array<OptionSelect>;
    export let selected: string;
    const dispatch: ((name: string, detail?: any) => void) = createEventDispatcher();

</script>

<div id="gameSelector">
    {#if options}
    <!-- svelte-ignore a11y-no-onchange -->
        <select class="form-select rounded-md focus:border-blue-400 hover:border-red-400 border-blue-400" style="border-width: 1px;" bind:value={selected}>
            {#each options as option}
                <option value="{option.technicalName}"
                    on:mouseenter="{() => console.log('Entering: ' + option.description) }"
                    on:mouseleave="{() => console.log('Leaving: ' + option.description) }"
                    >
                    {option.name}
                </option>
            {/each}
        </select>
    	<button on:click={() => dispatch('startGame', selected)}>startGame</button>
    {/if}
</div>