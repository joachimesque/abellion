import { derived } from 'svelte/store';
import { getEmptyMealObject } from '../utils';
import cycleCalendar from './cycle_calendar';

export const selectedMeals = derived(cycleCalendar, ($cycleCalendar) => {
	const newSelectedMeals = getEmptyMealObject();

	Object.values($cycleCalendar).forEach((day) => {
		day.selection.forEach((meal) => {
			if (!(meal in newSelectedMeals)) return;
			newSelectedMeals[meal]++;
		});
	});

	return newSelectedMeals;
});

export { selectedMeals as default };
