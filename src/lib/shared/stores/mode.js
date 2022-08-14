import { browser } from '$app/env';
import { writable } from 'svelte/store';
import { getEmptyMealObject } from '$lib/shared/utils';

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
