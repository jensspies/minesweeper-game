<script lang="ts">
	import { onMount } from 'svelte';

	import Heading from './components/header.svelte';

	import { myWebsocketId, chatMessageQueue } from './store';
	import { WebSocketHandler } from './classes/webSocketHandler';
	import { MessageParser } from './classes/messageParser';
	import { WebServiceWrapper } from './classes/webServiceWrapper';

	const apiUrl = 'http://localhost:3000';
	let socket: WebSocketHandler;
	let webApiWrapper: WebServiceWrapper;
	let messageParser = new MessageParser();
	let myId = '';
	let latestAnswer = 'Initial';
	let currentGameId = -1;

	onMount(() => {
		socket = new WebSocketHandler('ws:localhost:8181');
		webApiWrapper = new WebServiceWrapper(apiUrl);
		const myIdSubscription = myWebsocketId.subscribe((value) => {
			myId = value;
		});

		const messageSubscription = chatMessageQueue.subscribe(value => {
			if (value) {
				console.log(value);
			}
		});
	});

	async function startGame(){
		webApiWrapper.startGame(myId, 'fullMatrixAdvanced');
	}

	async function subscribeGame() {
		webApiWrapper.subscribeGame(myId, 4);
	}

	async function updateGame() {
		webApiWrapper.updateGame(currentGameId);
	}

	async function getGameTypes() {
		webApiWrapper.getGameTypes();
	}

	export let name: string;
</script>

<main>
	<Heading/>
	<h1>Hello {name}!</h1>
	<div>connected as {myId}</div>

	<button on:click={startGame}>startGame</button>
	<button on:click={subscribeGame}>Subscribe</button>
	<button on:click={updateGame}>update</button>
	<button on:click={getGameTypes}>gameTypes</button>

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