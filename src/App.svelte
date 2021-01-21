<script lang="ts">
	import { onMount } from 'svelte';

	import Heading from './components/header.svelte';

	import { myWebsocketId, chatMessageQueue, myCurrentGameId, availableTypes, gameSelection, gameStatusMessageQueue, myObservedGames } from './store';
	import { WebSocketHandler } from './classes/webSocketHandler';
	import { WebServiceWrapper } from './classes/webServiceWrapper';
	import GameBoard from './components/gameBoard.svelte';
	import GameTypeSelection from './components/gameTypeSelection.svelte';
	import type { OptionSelect } from './main.d';
	import RunningGames from './components/runningGames.svelte';
	import type { GameStatusMessage } from './classes/messages/gameStatus';
	import { GameKeeper } from './classes/GameKeeper';

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
	let myId = '';
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
			myId = value;
		});

		const myAvailableTypesSubscription = availableTypes.subscribe((value) => {
			if (value.length > 0) {
				availableGameTypes = [defaultEntry];
				Array.prototype.push.apply(availableGameTypes, value);
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

		webApiWrapper.getGameTypes();

	});

	async function startGame(event){
		let startGameType = event.detail;
		if (startGameType === technicalNameRandom && availableGameTypes.length > 0) {
			startGameType = availableGameTypes[Math.floor(Math.random() * (availableGameTypes.length - 1)) +1].technicalName;
		}
		if (availableGameTypes.length > 0 ) {
			webApiWrapper.startGame(myId, startGameType);
		}
		gameKeeper.removeFinishedGames();
	}

	async function subscribeGame(event) {
		let gameId = 2;
		if (event.type === 'observeGame') {
			gameId = event.detail;
		}
		webApiWrapper.subscribeGame(myId, gameId);
		gameKeeper.removeFinishedGames();
	}

	async function updateGame(event) {
//		webApiWrapper.updateGame(currentGameId);
	}

	async function revealCell(event) {
		let column = -1;
		let row = -1;
		let currentGameId = -1;
		if (event.type === 'revealCell') {
			column = event.detail.column;
			row = event.detail.row;
			currentGameId = event.detail.gameId;
		} else {
			const currentGameBoard = {getWidth: () => {return 8}, getHeight: () => { return 8;}};
			column = Math.floor(Math.random() * currentGameBoard.getWidth())+1;
			row = Math.floor(Math.random() * currentGameBoard.getHeight())+1;
		}

		webApiWrapper.revealCell(myId, currentGameId, column, row);
	}

	async function revealSafeCell(event) {
		console.log('double click registered');
		let column = -1;
		let row = -1;
		let currentGameId = -1;
		if (event.type === 'revealSafeCell') {
			currentGameId = event.detail.gameId;
			column = event.detail.column;
			row = event.detail.row;
		}
		if (column > -1 && row > -1){
			webApiWrapper.revealSafeCell(myId, currentGameId, column, row);
		}
	}

	async function getGameTypes() {
		webApiWrapper.getGameTypes();
	}

	async function resetGames() {
		webApiWrapper.resetGames();
	}

	async function runningGames() {
		webApiWrapper.getRunningTypes();
	}

	async function toggleMark(event) {
		let column = -1;
		let row = -1;
		let currentGameId = -1;
		if (event.type === 'toggleMark') {
			currentGameId = event.detail.gameId;
			column = event.detail.column;
			row = event.detail.row;
		}
		webApiWrapper.toggleCell(myId, currentGameId, column, row);
	}

</script>

<main>
	<Heading/>
	<div class="dummyButtons">
		<button on:click={subscribeGame}>Subscribe</button>
		<button on:click={revealCell}>reveal</button>
		<button on:click={updateGame}>update</button>
		<button on:click={runningGames}>running Games List</button>
		<button on:click={getGameTypes}>gameTypes</button>
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