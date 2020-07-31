import { writable } from 'svelte/store'

let uid = 1

const taskStore = writable([], (set) => {
	const tasks = localStorage.getItem('tasks')
		? JSON.parse(localStorage.getItem('tasks'))
		: []
	const ids = tasks.map((task) => task.id).sort()
	uid = ids && ids.length ? ids[0] : 1
	set(tasks)
	return () => console.log('no more subscribers')
})

export default {
	subscribe: taskStore.subscribe,
	add: (task) => {
		taskStore.update((tasks) => {
			const updated = [
				{ ...task, id: ++uid, done: false, status: 'G' },
				...tasks,
			]
			localStorage.setItem('tasks', JSON.stringify(updated))
			return updated
		})
	},
	remove: (task) => {
		taskStore.update((tasks) => {
			const updated = tasks.filter((t) => t.id !== task.id)
			localStorage.setItem('tasks', JSON.stringify(updated))
			return updated
		})
	},
	update: (task) => {
		taskStore.update((tasks) => {
			const filteredTasks = tasks.filter((t) => t.id !== task.id)
			const updated = [...filteredTasks, task]
			localStorage.setItem('tasks', JSON.stringify(updated))
			return updated
		})
	},
}
