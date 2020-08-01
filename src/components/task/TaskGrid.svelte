<style>
	.container {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		max-width: 90%;
		gap: 1rem;
		margin: 0.5em auto;
		height: calc(100% - 3.5rem);
	}

	.container div {
		background-color: hsl(240, 8%, 93%);
	}

	.title {
		font-size: 2em;
		font-weight: 300;
		user-select: none;
		margin: 0 0 0.5em 0;
	}
</style>

<script>
	import TaskItem from './TaskItem.svelte'
	import { quintOut } from 'svelte/easing'
	import { crossfade } from 'svelte/transition'

	export let tasks

	$: openTasks = tasks.filter((task) => task.status === 'R')
	$: progressTasks = tasks.filter((task) => task.status === 'P')
	$: waitingTasks = tasks.filter((task) => task.status === 'W')
	$: closedTasks = tasks.filter((task) => task.status === 'C')

	const [send, receive] = crossfade({
		duration: 300,
		fallback(node) {
			const style = getComputedStyle(node)
			const transform = style.transform === 'none' ? '' : style.transform

			return {
				duration: 300,
				easing: quintOut,
				css: (t) => `
					transform: ${transform} scale(${t});
					opacity: ${t}`,
			}
		},
	})
</script>

<div class="container">
	<div>
		<div class="title">Open</div>
		{#each openTasks as task (task.id)}
			<div in:receive="{{ key: task.id }}" out:send="{{ key: task.id }}">
				<TaskItem {task} on:edit />
			</div>
		{:else}
			<p>Hooray! No work today!</p>
		{/each}
	</div>

	<div>
		<div class="title">In Progress</div>
		{#each progressTasks as task (task.id)}
			<div in:receive="{{ key: task.id }}" out:send="{{ key: task.id }}">
				<TaskItem {task} on:edit />
			</div>
		{:else}
			<p>Hooray! No work today!</p>
		{/each}
	</div>

	<div>
		<div class="title">Waiting</div>
		{#each waitingTasks as task (task.id)}
			<div in:receive="{{ key: task.id }}" out:send="{{ key: task.id }}">
				<TaskItem {task} on:edit />
			</div>
		{:else}
			<p>Hooray! No work today!</p>
		{/each}
	</div>

	<div>
		<div class="title">Closed</div>
		{#each closedTasks as task (task.id)}
			<div in:receive="{{ key: task.id }}" out:send="{{ key: task.id }}">
				<TaskItem {task} on:edit />
			</div>
		{:else}
			<p>It's time to do some work!</p>
		{/each}
	</div>
</div>
