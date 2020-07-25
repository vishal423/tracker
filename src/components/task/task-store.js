import { writable } from 'svelte/store'

let uid = 1

const taskStore = writable([], (set) => {
	const dummy = [
		{ id: uid++, done: false, description: 'write some docs' },
		{
			id: uid++,
			done: false,
			description: 'start writing blog post',
		},
		{ id: uid++, done: true, description: 'buy some milk' },
		{ id: uid++, done: false, description: 'mow the lawn' },
		{ id: uid++, done: false, description: 'feed the turtle' },
		{ id: uid++, done: false, description: 'fix some bugs' },
	]
	const tasks = localStorage.getItem('tasks')
		? localStorage.getItem('tasks')
		: dummy

	set(tasks)
	return () => console.log('no more subscribers')
})

export default {
	subscribe: taskStore.subscribe,
	add: (task) => {
		taskStore.update((tasks) => [task, ...tasks])
	},
	remove: (task) => {
		taskStore.update((tasks) => tasks.filter((t) => t.id !== task.id))
	},
	toggle: (task) => {
		taskStore.update((tasks) => {
			const filteredTasks = tasks.filter((t) => t.id !== task.id)
			return [...filteredTasks, task]
		})
	},
}
