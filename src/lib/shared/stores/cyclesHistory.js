import { browser } from '$app/env';
import { writable } from 'svelte/store';

const defaultValue = {};
const initialValue = browser
	? localStorage.getItem('cyclesHistory')
		? JSON.parse(localStorage.getItem('cyclesHistory'))
		: defaultValue
	: defaultValue;

export const cyclesHistory = writable(initialValue);

cyclesHistory.subscribe((value) => {
	if (browser) {
		localStorage.setItem('cyclesHistory', JSON.stringify(value));
	}
});

export { cyclesHistory as default };
