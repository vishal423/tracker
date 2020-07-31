<style>
	.container {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		max-width: 90%;
		gap: 5em;
		margin: 0.5em auto;
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

	$: openTasks = tasks.filter((task) => !task.done)
	$: closedTasks = tasks.filter((task) => task.done)

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
	<div class="open">
		<div class="title">Open</div>
		{#each openTasks as task (task.id)}
			<div in:receive="{{ key: task.id }}" out:send="{{ key: task.id }}">
				<TaskItem {task} on:edit />
			</div>
		{:else}
			<p>Hooray! No work today!</p>
		{/each}
	</div>

	<div class="closed">
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
