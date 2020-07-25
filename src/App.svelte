<style>

</style>

<script>
	import tasks from './components/task/task-store.js'
	import TaskGrid from './components/task/TaskGrid.svelte'
</script>

<svelte:head>
	<title>Tracker</title>
</svelte:head>
<main>
	<TaskGrid tasks="{$tasks}" />
</main>
