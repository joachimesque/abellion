import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const defaultValue = 'preview';
const initialValue = browser
	? localStorage.getItem('mode')
		? JSON.parse(localStorage.getItem('mode'))
		: defaultValue
	: null;

export const mode = writable(initialValue);

mode.subscribe((value) => {
	if (browser) {
		localStorage.setItem('mode', JSON.stringify(value));
	}
});

export { mode as default };
