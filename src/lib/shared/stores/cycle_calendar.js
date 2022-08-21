import { derived } from 'svelte/store';
import { dayInMs } from '$lib/shared/constants';
import rollingCalendar from './rolling_calendar';
import cycleStartDate from './cycle_start_date';
import startDate from './start_date';
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
