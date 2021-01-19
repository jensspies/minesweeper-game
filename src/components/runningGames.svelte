<script lang="ts">

//import { createEventDispatcher } from "svelte";
import { createEventDispatcher, onMount } from "svelte";
import { openGamesToObserveQueue } from "../store";

const dispatch: ((name: string, detail?: any) => void) = createEventDispatcher();

let observableGames: any[] = [];

onMount(() => {
		const gameObserverSubscription = openGamesToObserveQueue.subscribe(value => {
			if (value) {
                observableGames = value.data;
			}
		});
    });


</script>

<div>

    Hallo
    <ul>
        {#each observableGames as game}
        <li on:click="{() => dispatch('observeGame', game.gameId)}">[{game.gameId}] - {game.Name} ({game.desc}) </li>
        {/each}
    </ul>
</div>