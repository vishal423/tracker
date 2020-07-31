<style>
	.modal-backdrop {
		background-color: hsl(240, 8%, 90%);
		position: fixed;
		left: 0;
		width: 100%;
		height: 100%;
		top: 0;
		opacity: 0.7;
		z-index: 100;
	}

	.modal {
		position: fixed;
		top: 10rem;
		left: 10rem;
		height: calc(100% - 20rem);
		z-index: 200;
		background-color: #fff;
		right: 10rem;
		bottom: 10rem;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.modal-content {
		flex-grow: 1;
		margin: 1rem 0;
	}

	header {
		margin: 0.5rem;
		font-size: 1.5em;
	}

	footer {
		text-align: right;
		margin: 0 1rem;
	}
</style>

<script>
	import { createEventDispatcher } from 'svelte'
	import { fade, fly } from 'svelte/transition'

	const dispatch = createEventDispatcher()
</script>

<div
	transition:fade
	class="modal-backdrop"
	on:click="{() => dispatch('close')}"
></div>
<div transition:fly="{{ y: 300 }}" class="modal">
	<header>
		<slot name="header">
			<p>Modal Window</p>
		</slot>
	</header>
	<div class="modal-content">
		<slot>
			<p>Enter some modal content</p>
		</slot>
	</div>
	<footer>
		<slot name="footer">
			<button on:click="{() => dispatch('close')}">Close</button>
		</slot>
	</footer>
</div>
