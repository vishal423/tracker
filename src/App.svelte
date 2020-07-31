<style>
	button {
		border: 2px solid;
		border-radius: 3px;
		transition: opacity 0.2s;
		cursor: pointer;
		margin: 0;
		text-transform: uppercase;
		width: 100%;
		height: 3rem;
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
	<button on:click="{toggle}">Create task</button>
	<TaskGrid tasks="{$tasks}" on:edit="{editTask}" />
</main>
