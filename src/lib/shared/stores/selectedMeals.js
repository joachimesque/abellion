import { derived } from 'svelte/store';
import { getEmptyMealObject } from '$lib/shared/utils';
import cycleCalendar from './cycleCalendar';
import mode from './mode';
import rollingCalendar from './rollingCalendar';

export const selectedMeals = derived(
	[mode, cycleCalendar, rollingCalendar],
	([$mode, $cycleCalendar, $rollingCalendar]) => {
		const newSelectedMeals = getEmptyMealObject();
		const calendar = $mode === 'preview' ? $rollingCalendar : $cycleCalendar;

		Object.values(calendar).forEach((day) => {
			day.selection.forEach((meal) => {
				if (!(meal in newSelectedMeals)) return;
				newSelectedMeals[meal]++;
			});
		});

		return newSelectedMeals;
	},
);

export { selectedMeals as default };
