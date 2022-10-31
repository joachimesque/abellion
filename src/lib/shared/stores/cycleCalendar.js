import { derived } from 'svelte/store';
import { dayInMs } from '$lib/shared/constants';
import rollingCalendar from './rollingCalendar';
import cycleStartDate from './cycleStartDate';
import startDate from './startDate';
import { cycleDuration } from '$lib/shared/config';
import { getFormattedDay } from '$lib/shared/utils';

export const cycleCalendar = derived(
	[rollingCalendar, cycleStartDate, startDate],
	([$rollingCalendar, $cycleStartDate, $startDate]) => {
		let newCycleCalendar = {};
		if (!$startDate) return newCycleCalendar;

		[...Array(cycleDuration).keys()].map((_, index) => {
			const day = new Date($cycleStartDate.getTime() + index * dayInMs);
			const formattedDay = getFormattedDay(day);

			if (formattedDay in $rollingCalendar) {
				newCycleCalendar[formattedDay] = $rollingCalendar[formattedDay];
			}
		});

		return newCycleCalendar;
	}
);

export { cycleCalendar as default };
