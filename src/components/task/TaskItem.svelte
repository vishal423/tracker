<style>
	p {
		font-size: 1rem;
	}

	.task {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: start;
		padding: 0.5em 1em;
		margin: 0 0.5em 0.5em;
		border-radius: 5px;
		user-select: none;
		color: #333;
		border: 1px solid hsl(240, 8%, 70%);
		background-color: #fff;
	}

	.header {
		display: flex;
		justify-content: space-between;
		width: 100%;
	}

	.risk {
		width: 3rem;
		height: 2.25rem;
		border-radius: 5px;
	}

	.risk-green {
		background-color: green;
		border-color: green;
	}

	.risk-orange {
		background-color: orange;
		border-color: orange;
		animation: orangeStatus 3s infinite;
	}

	@keyframes orangeStatus {
		0% {
			background-color: orange;
		}
		30% {
			background-color: transparent;
		}
		100% {
			background-color: orange;
		}
	}

	.risk-red {
		background-color: red;
		border-color: red;
		animation: redStatus 1s infinite;
	}

	@keyframes redStatus {
		0% {
			background-color: red;
		}
		30% {
			background-color: transparent;
		}
		100% {
			background-color: red;
		}
	}

	.title {
		margin-left: 0.5rem;
		width: 100%;
	}

	.description {
		white-space: pre-wrap;
		word-break: break-all;
		font-weight: 300;
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
		display: flex;
	}

	.btn {
		border: 2px solid;
		border-radius: 3px;
		transition: opacity 0.2s;
		cursor: pointer;
		margin: 0 0.5rem 0 0;
	}

	.btn:last-child {
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
	import { slide } from 'svelte/transition'
	import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher()

	export let task

	let collapsed = true

	function remove() {
		taskStore.remove(task)
	}

	function close() {
		task.status = 'C'
		taskStore.update(task)
	}

	function reopen() {
		task.status = 'R'
		taskStore.update(task)
	}

	function modify() {
		dispatch('edit', { ...task })
	}

	function toggle() {
		collapsed = !collapsed
	}
</script>

<div
	class="task"
	class:task-expanded="{!collapsed}"
	class:done="{task.status === 'C'}"
>
	<div class="header">
		<button class="btn" on:click="{toggle}">
			{collapsed ? 'Expand' : 'Collapse'}
		</button>
		<span
			class="risk"
			class:risk-green="{task.risk === 'G'}"
			class:risk-orange="{task.risk === 'O'}"
			class:risk-red="{task.risk === 'R'}"
		></span>
		<div class="actions">
			{#if task.status !== 'C'}
				<button class="btn btn-green" on:click="{modify}">
					Modify
				</button>
				<button class="btn btn-green" on:click="{close}">Close</button>
				<button class="btn btn-red" on:click="{remove}">Remove</button>
			{:else}
				<button class="btn btn-orange" on:click="{reopen}">
					Reopen
				</button>
			{/if}
		</div>
	</div>
	<div>
		<div class="title">
			<p>{task.title}</p>
			{#if !collapsed}
				<div transition:slide>
					<p class="description">{task.description}</p>
				</div>
			{/if}
		</div>
	</div>
</div>
