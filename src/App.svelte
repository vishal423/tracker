<style>
	button {
		border: 2px solid;
		border-radius: 3px;
		transition: opacity 0.2s;
		cursor: pointer;
		margin: 0 auto;
		text-transform: uppercase;
		width: 90%;
		height: 3rem;
	}

	main {
		height: 100%;
	}

	div {
		text-align: center;
	}
</style>

<script>
	import tasks from './components/task/task-store.js'
	import TaskGrid from './components/task/TaskGrid.svelte'
	import TaskDetail from './components/task/TaskDetail.svelte'

	let edit = false
	let task

	function close() {
		task = undefined
		toggle()
	}
	function toggle() {
		edit = !edit
	}

	function editTask(event) {
		task = event.detail
		toggle()
	}
</script>

<svelte:head>
	<title>Tracker</title>
</svelte:head>
<main>
	{#if edit}
		<TaskDetail {task} on:close="{close}" />
	{/if}
	<div>
		<button on:click="{toggle}">Create task</button>
	</div>
	<TaskGrid tasks="{$tasks}" on:edit="{editTask}" />
</main>
