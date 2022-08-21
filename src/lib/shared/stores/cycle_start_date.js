import { derived } from 'svelte/store';
import { dayInMs } from '$lib/shared/constants';
import startDate from './start_date';
import { cycleDuration } from '$lib/shared/config';

const today = new Date();

export const cycleStartDate = derived(startDate, ($startDate) => {
	if (!$startDate) return new Date();

	const timeDifference = Math.round((today.getTime() - $startDate.getTime()) / dayInMs);
	const dayOfCycle = Math.round(timeDifference % cycleDuration);
	const cycleStart = new Date(today.getTime() - dayOfCycle * dayInMs);

	return cycleStart;
});

export { cycleStartDate as default };
