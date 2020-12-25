<script lang="ts">

	import Heading from './components/header.svelte';
	import {onMount} from 'svelte';
	
	const apiUrl = 'http://localhost:3000';
	let socket;
	let myId = '';
	let latestAnswer = 'Initial';

	onMount(() => {
		socket = new WebSocket('ws:localhost:8181');
		socket.addEventListener('open', function (event){
			if (event.data) {
				myId = event.data.welcome;
			}
		});

		socket.addEventListener('message', function (event){
			console.log(event);
			let data;
			try {
				data = JSON.parse(event.data);
			} catch (exc) {
				console.log('no JSON data given!!')
				
			}
			if (data.welcome) {
				myId = data.welcome;
			} else {
				latestAnswer = data.message;
			}
		});
	});
	async function startGame(){
		const url = apiUrl + '/start/' + myId + '/4';
		await fetch(url, {mode: 'no-cors'})
			.then((response) => {
				;
			});

	}

	async function subscribeGame() {
		const url = apiUrl + '/subscribeGame/' + myId + '/4';
		await fetch(url, {mode: 'no-cors'})
			.then((response) => {
				;
			});
	}

	async function updateGame() {
		const url = apiUrl + '/gameUpdate/4';
		await fetch(url, {mode: 'no-cors'})
			.then((response) => {
				;
			});
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