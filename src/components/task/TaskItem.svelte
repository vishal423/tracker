<style>
	p {
		font-size: 1.2rem;
	}

	.task {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.5em 1em;
		margin: 0 0 1em;
		border-radius: 5px;
		user-select: none;
		color: #333;
		border: 1px solid hsl(240, 8%, 70%);
		background-color: hsl(240, 8%, 93%);
	}

	.done {
		border: 1px solid hsl(240, 8%, 90%);
		background-color: hsl(240, 8%, 98%);
	}

	.done p {
		text-decoration: line-through;
	}

	.actions {
		opacity: 0;
	}

	.btn {
		border: 2px solid;
		border-radius: 3px;
		transition: opacity 0.2s;
		cursor: pointer;
		margin: 0;
	}

	.btn-green {
		border-color: green;
		color: green;
	}

	.btn-red {
		border-color: red;
		color: red;
	}

	.btn-orange {
		border-color: orange;
		color: orange;
	}

	.task:hover .actions {
		opacity: 1;
		vertical-align: middle;
	}
</style>

<script>
	import taskStore from './task-store'

	export let task

	function remove() {
		taskStore.remove(task)
	}

	function close() {
		task.done = true
		taskStore.toggle(task)
	}

	function reopen() {
		task.done = false
		taskStore.toggle(task)
	}
</script>

<div class="task" class:done="{task.done}">
	<p>{task.description}</p>
	<div class="actions">
		{#if !task.done}
			<button class="btn btn-green" on:click="{close}">Close</button>
			<button class="btn btn-red" on:click="{remove}">Remove</button>
		{:else}
			<button class="btn btn-orange" on:click="{reopen}">Reopen</button>
		{/if}
	</div>
</div>
