import { browser } from '$app/env'
import { writable } from 'svelte/store'

const defaultValue = null
const initialValue = (() => {
	if (!browser) return defaultValue

	const valueFromLocalStorage = localStorage.getItem('startDate')

	if (!valueFromLocalStorage) return defaultValue
	if (['null', 'undefined'].includes(valueFromLocalStorage)) return defaultValue

	return new Date(parseInt(valueFromLocalStorage))
})()

export const startDate = writable(initialValue)

startDate.subscribe((value) => {
	if (browser && value) {
		let sanitizedValue = value

		if (value instanceof Date) {
			sanitizedValue = value.getTime()
		} else {
			sanitizedValue = JSON.stringify(value)
		}

		localStorage.setItem('startDate', sanitizedValue)
	}
})

export { startDate as default }
