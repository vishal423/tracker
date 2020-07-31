<style>
	.form-control {
		margin: 0.75rem;
	}

	input,
	textarea {
		border-left: 0;
		border-right: 0;
		border-top: 0;
		padding: 0.25rem 0.75rem;
		width: 100%;
		outline: none;
	}
</style>

<script>
	import Modal from '../ui/Modal.svelte'
	import { createEventDispatcher } from 'svelte'
	import tasks from './task-store.js'

	const dispatch = createEventDispatcher()

	export let task = { title: '', description: '' }

	function saveTask(event) {
		if (task.id) {
			tasks.update({ ...task })
		} else {
			tasks.add({ ...task })
		}
		resetState()
		dispatch('close')
	}

	function resetState() {
		task = { title: '', description: '' }
	}
</script>

<Modal on:close>
	<span slot="header">Create a new task</span>
	<form>
		<div class="form-control">
			<label for="title">
				Title
				<input
					type="text"
					name="title"
					bind:value="{task.title}"
					placeholder="Add new task"
				/>
			</label>
		</div>
		<div class="form-control">
			<label for="description">
				Description
				<textarea
					name="description"
					bind:value="{task.description}"
					rows="2"
					placeholder="Add task description"
				></textarea>
			</label>
		</div>
	</form>
	<div slot="footer">
		<button type="button" on:click="{saveTask}">Save</button>
		<button on:click="{() => dispatch('close')}">Close</button>
	</div>
</Modal>
