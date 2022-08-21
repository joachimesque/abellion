import { derived } from 'svelte/store';
import rollingCalendar from './rolling_calendar';
import startDate from './start_date';
import { cycleDuration } from '$lib/shared/config';
import { getFormattedDay } from '$lib/shared/utils';

export const cycleCalendar = derived(
	[rollingCalendar, startDate],
	([$rollingCalendar, $startDate]) => {
		let newCycleCalendar = {};
		if (!$startDate) return newCycleCalendar;

		const today = new Date();
		const dayInMs = 1000 * 60 * 60 * 24;
		const timeDifference = Math.round((today.getTime() - $startDate.getTime()) / dayInMs);
		const dayOfCycle = Math.round(timeDifference % cycleDuration);
		const cycleStart = new Date(today.getTime() - dayOfCycle * dayInMs);

		[...Array(cycleDuration).keys()].map((_, index) => {
			const day = new Date(cycleStart.getTime() + index * dayInMs);
			const formattedDay = getFormattedDay(day);

			if (formattedDay in $rollingCalendar) {
				newCycleCalendar[formattedDay] = $rollingCalendar[formattedDay];
			}
		});

		return newCycleCalendar;
	}
);

export { cycleCalendar as default };
