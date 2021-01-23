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

	///*
	const apiUrl = 'http://localhost:3000';
	const websocketServerUrl = 'ws:localhost:8181';
	//*/
	/*
	const apiUrl = 'http://proxya.ddnss.org:3000';
	const websocketServerUrl = 'ws:proxya.ddnss.org:8181';
	//*/
	/*
	const apiUrl = 'http://192.168.178.47:3000';
	const websocketServerUrl = 'ws:192.168.178.47:8181';
	//*/


	let socket: WebSocketHandler;
	let webApiWrapper: WebServiceWrapper;
	let eventHandler: GameEventHandler;

	let myUserKey = '';
	const technicalNameRandom = 'default';
	const defaultEntry:OptionSelect = {technicalName: technicalNameRandom, name: 'Random game', description: 'chose a random layout of the existing ones'}
	let availableGameTypes = [defaultEntry];
	let selectedGameType: string = undefined;

	let availableGames: Array<GameStatusMessage> = [];
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


	// wanted to get rid of those wrapper functions,
	// but calling "eventHandler.[EventFunction]" did
	// not use the correct eventHandler object
	function startGame(event) {
		eventHandler.startGame(event)
	}

	function subscribeGame(event) {
		eventHandler.subscribeGame(event)
	}

	function revealCell(event) {
		eventHandler.revealCell(event)
	}

	function revealSafeCell(event) {
		eventHandler.revealSafeCell(event)
	}

	function toggleMark(event) {
		eventHandler.toggleMark(event)
	}

	// simple (temporary) helper to reset games on server
	async function resetGames() {
		webApiWrapper.resetGames();
	}

</script>

<main>
	<Heading/>
	<div class="dummyButtons">
		<button on:click={subscribeGame}>Subscribe</button>
		<button on:click={revealCell}>reveal</button>
		<button on:click={resetGames}>reset Games</button>
	</div>
<div class="body">
	<div class="sidebar">
		<GameTypeSelection
			on:startGame="{startGame}"
			options="{availableGameTypes}"
			selected="{selectedGameType}"
			/>

		<RunningGames on:observeGame={subscribeGame}/>
	</div>
	<div class="game">
		{#if availableGames && availableGames.length > 0}
			{#each availableGames as nextGameBoard}
					<GameBoard
						bind:myGameBoard="{nextGameBoard}"
						on:revealCell="{revealCell}"
						on:toggleMark="{toggleMark}"
						on:revealSafeCell="{revealSafeCell}"/>
			{/each}
		{/if}
	</div>
</div>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	div.body {
		display: flex;
	}

	div.body .sidebar {
		flex:2
	}

	div.body .game {
		flex: 4;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>