<style>
	.form-control {
		margin: 0.75rem;
	}

	input[type='text'],
	input[type='number'],
	textarea {
		border-left: 0;
		border-right: 0;
		border-top: 0;
		padding: 0.25rem 0.75rem;
		width: 100%;
		outline: none;
	}

	input[type='radio'] {
		margin-right: 0.5rem;
	}

	input[type='radio']:first-child {
		margin-left: 0.75rem;
	}

	.status {
		display: inline-block;
		padding-right: 1.5rem;
	}

	.status:last-child {
		padding-right: 0;
	}
</style>

<script>
	import Modal from '../ui/Modal.svelte'
	import { createEventDispatcher } from 'svelte'
	import tasks from './task-store.js'

	const dispatch = createEventDispatcher()

	export let task = { title: '', description: '', status: 'R', risk: 'G' }

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
		task = { title: '', description: '', status: 'R', risk: 'G' }
	}
</script>

<Modal on:close>
	<span slot="header">Create a new task</span>
	<form>
		<div class="form-control">
			<label>
				Category
				<input
					type="text"
					name="category"
					bind:value="{task.category}"
					placeholder="Task category"
				/>
			</label>
		</div>
		<div class="form-control">
			<label>
				Title
				<input
					type="text"
					name="title"
					bind:value="{task.title}"
					placeholder="Task title"
				/>
			</label>
		</div>
		<div class="form-control">
			<label>
				Efforts
				<input
					type="number"
					name="title"
					bind:value="{task.efforts}"
					placeholder="Efforts in hours"
				/>
			</label>
		</div>
		<div class="form-control">
			<label>
				Description
				<textarea
					name="description"
					bind:value="{task.description}"
					rows="1"
					placeholder="Task description"
				></textarea>
			</label>
		</div>
		<div class="form-control">
			<label>Status</label>
			<label class="status">
				<input type="radio" value="R" bind:group="{task.status}" />
				Ready
			</label>
			<label class="status">
				<input type="radio" value="P" bind:group="{task.status}" />
				In Progress
			</label>
			<label class="status">
				<input type="radio" value="W" bind:group="{task.status}" />
				Waiting
			</label>
		</div>
		<div class="form-control">
			<label>Risk</label>
			<label class="status">
				<input type="radio" value="G" bind:group="{task.risk}" />
				Green
			</label>
			<label class="status">
				<input type="radio" value="O" bind:group="{task.risk}" />
				Orange
			</label>
			<label class="status">
				<input type="radio" value="R" bind:group="{task.risk}" />
				Red
			</label>
		</div>
	</form>
	<div slot="footer">
		<button type="button" on:click="{saveTask}">Save</button>
		<button on:click="{() => dispatch('close')}">Close</button>
	</div>
</Modal>
