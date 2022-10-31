import { browser } from '$app/environment';
import { writable } from 'svelte/store';
import { getEmptyMealObject } from '$lib/shared/utils';

const defaultValue = getEmptyMealObject();
const initialValue = browser
	? localStorage.getItem('mealRules')
		? JSON.parse(localStorage.getItem('mealRules'))
		: defaultValue
	: defaultValue;

export const mealRules = writable(initialValue);

mealRules.subscribe((value) => {
	if (browser) {
		localStorage.setItem('mealRules', JSON.stringify(value));
	}
});

export { mealRules as default };
