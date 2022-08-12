import { browser } from '$app/env'
import { writable } from 'svelte/store'

const defaultValue = {}
const initialValue = browser
	? localStorage.getItem('cycleCalendar')
		? JSON.parse(localStorage.getItem('cycleCalendar'))
		: defaultValue
	: defaultValue

export const cycleCalendar = writable(initialValue)

cycleCalendar.subscribe((value) => {
	if (browser) {
		localStorage.setItem('cycleCalendar', JSON.stringify(value))
	}
})

export { cycleCalendar as default }
