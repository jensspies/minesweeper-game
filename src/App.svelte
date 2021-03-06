<script lang="ts">
	import { onMount } from 'svelte';

	import Heading from './components/header.svelte';

	import { myWebsocketId, chatMessageQueue, availableTypes, gameStatusMessageQueue, myObservedGames } from './store';
	import { WebSocketHandler } from './classes/webSocketHandler';
	import { WebServiceWrapper } from './classes/webServiceWrapper';
	import GameBoard from './components/gameBoard.svelte';
	import GameTypeSelection from './components/gameTypeSelection.svelte';
	import type { OptionSelect } from './main.d';
	import RunningGames from './components/runningGames.svelte';
	import type { GameStatusMessage } from './classes/messages/gameStatus';
	import { GameKeeper } from './classes/GameKeeper';
	import { GameEventHandler } from './classes/eventHandler';

	let host = '';
	host = 'localhost';
	//host = 'proxya.ddnss.org';
	//host = '192.168.178.47';

	const apiUrl = 'http://' + host + ':3000';
	const websocketServerUrl = 'ws:' + host + ':8181';


	let socket: WebSocketHandler;
	let webApiWrapper: WebServiceWrapper;
	let eventHandler: GameEventHandler;

	let myUserKey = '';
	const technicalNameRandom = 'default';
	const defaultEntry:OptionSelect = {technicalName: technicalNameRandom, name: 'Random game', description: 'chose a random layout of the existing ones'}
	let availableGameTypes = [defaultEntry];
	let selectedGameType: string = undefined;

	let availableGames: GameStatusMessage[] = [];
	const gameKeeper: GameKeeper = new GameKeeper();

	onMount(() => {
		socket = new WebSocketHandler(websocketServerUrl);
		webApiWrapper = new WebServiceWrapper(apiUrl);

		const myIdSubscription = myWebsocketId.subscribe((value) => {
			if(value) {
				myUserKey = value;
				eventHandler = new GameEventHandler(webApiWrapper, myUserKey, availableGameTypes)
				webApiWrapper.getGameTypes();
			}
		});

		const myAvailableTypesSubscription = availableTypes.subscribe((value) => {
			if (value.length > 0) {
				availableGameTypes = [defaultEntry];
				Array.prototype.push.apply(availableGameTypes, value);
				eventHandler.updateGameTypes(availableGameTypes);
			}
		});

		const messageSubscription = chatMessageQueue.subscribe(value => {
			if (value) {
				console.log(value);
			}
		});

		const gameStatusSubscription = gameStatusMessageQueue.subscribe((value: GameStatusMessage) => {
			if (value) {
				gameKeeper.updateGame(value);
			}
		});

		const myObservedGamesSubcription = myObservedGames.subscribe((value) => {
			if (value) {
				availableGames = value;
			};
		})
	});

</script>

<main>
	<Heading/>
	<div class="container text-lg align-baseline text-center">
		<button on:click={eventHandler.subscribeGame}>Subscribe</button>
		<button on:click={eventHandler.revealCell}>reveal</button>
		<button on:click={webApiWrapper.resetGames}>reset Games</button>
	</div>
<div class="grid grid-cols-3">
	<div class="col-span-1">
		<GameTypeSelection
			on:startGame="{eventHandler.startGame}"
			options="{availableGameTypes}"
			selected="{selectedGameType}"
			/>

		<RunningGames on:observeGame={eventHandler.subscribeGame}/>
	</div>
	<div class="">
		{#if availableGames && availableGames.length > 0}
			{#each availableGames as nextGameBoard}
					<GameBoard
						bind:myGameBoard="{nextGameBoard}"
						on:revealCell="{eventHandler.revealCell}"
						on:toggleMark="{eventHandler.toggleMark}"
						on:revealSafeCell="{eventHandler.revealSafeCell}"/>
			{/each}
		{/if}
	</div>
</div>
</main>

<style global lang="postcss">
	/* only apply purgecss on utilities, per Tailwind docs */
	/* purgecss start ignore */
  	@tailwind base;
	@tailwind components;
	/* purgecss end ignore */

	@tailwind utilities;


</style>