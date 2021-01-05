<script lang="ts">
	import { onMount } from 'svelte';

	import Heading from './components/header.svelte';

	import { myWebsocketId, chatMessageQueue, myCurrentGameId } from './store';
	import { WebSocketHandler } from './classes/webSocketHandler';
	import { WebServiceWrapper } from './classes/webServiceWrapper';

	/*
	const apiUrl = 'http://localhost:3000';
	const websocketServerUrl = 'ws:localhost:8181';
	//*/
	///*
	const apiUrl = 'http://192.168.178.47:3000';
	const websocketServerUrl = 'ws:192.168.178.47:8181';
	//*/
	/*
	const apiUrl = 'http://15521a8c09d1.ngrok.io';
	const websocketServerUrl = 'ws://e5711e9d3448.ngrok.io';
	//*/

	let socket: WebSocketHandler;
	let webApiWrapper: WebServiceWrapper;
	let myId = '';
	let latestAnswer = 'Initial';
	let currentGameId = 3;

	onMount(() => {
		socket = new WebSocketHandler(websocketServerUrl);
		webApiWrapper = new WebServiceWrapper(apiUrl);
		const myIdSubscription = myWebsocketId.subscribe((value) => {
			myId = value;
		});

		const myCurrentGameIdSubscription = myCurrentGameId.subscribe((value) => {
			currentGameId = parseInt(value);
		});

		const messageSubscription = chatMessageQueue.subscribe(value => {
			if (value) {
				console.log(value);
			}
		});
	});

	async function startGame(){
		//const layouts = Array('fullMatrixBeginner', 'fullMatrixAdvanced', 'fullMatrixExpert', 'dummiesTest');
		const layouts = Array('fullMatrixBeginner', 'dummiesTest');
		const randomLayout: string = layouts[Math.floor(Math.random() * layouts.length)];
		webApiWrapper.startGame(myId, randomLayout);
	}

	async function subscribeGame() {
		webApiWrapper.subscribeGame(myId, 2);
	}

	async function updateGame() {
		webApiWrapper.updateGame(currentGameId);
	}

	async function revealCell() {
		webApiWrapper.revealCell(myId, currentGameId, 5, 3);
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

	export let name: string;
</script>

<main>
	<Heading/>
	<h1>Hello {name}!</h1>
	<div>connected as {myId}</div>

	<button on:click={startGame}>startGame</button>
	<button on:click={subscribeGame}>Subscribe</button>
	<button on:click={revealCell}>reveal</button>
	<button on:click={updateGame}>update</button>
	<button on:click={runningGames}>running Games List</button>
	<button on:click={getGameTypes}>gameTypes</button>
	<button on:click={resetGames}>reset Games</button>

	<div>
		<textarea id="updates" rows="10" cols="60">
			{latestAnswer}
		</textarea>
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

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>