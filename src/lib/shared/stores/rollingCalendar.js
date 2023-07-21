import { browser } from '$app/environment';
import { writable } from 'svelte/store';
import { cycleDuration, mealsPerDay } from '$lib/shared/config';
import { getFormattedDay } from '$lib/shared/utils';

const dayInMs = 1000 * 60 * 60 * 24;

const getCalendar = (data = null) => {
	const newCalendar = {};
	const today = new Date();
	const calendarStart = new Date(today.getTime() - (cycleDuration - 1) * dayInMs);

	[...Array(cycleDuration * 2 - 1).keys()].map((_, index) => {
		const day = new Date(calendarStart.getTime() + index * dayInMs);
		const formattedDay = getFormattedDay(day);

		newCalendar[formattedDay] = {};
		newCalendar[formattedDay].is_today = formattedDay === getFormattedDay(today);

		if (!data) {
			newCalendar[formattedDay].selection = [null, null];
		}

		if (data) {
			newCalendar[formattedDay].selection = [...Array(mealsPerDay.length).keys()].map(
				(_, index) => {
					if (formattedDay in data) {
						return data[formattedDay].selection[index];
					}
					return null;
				},
			);
		}
	});

	return newCalendar;
};

const defaultValue = getCalendar();
const initialValue = browser
	? localStorage.getItem('rollingCalendar')
		? getCalendar(JSON.parse(localStorage.getItem('rollingCalendar')))
		: defaultValue
	: defaultValue;

export const rollingCalendar = writable(initialValue);

rollingCalendar.subscribe((value) => {
	if (browser) {
		localStorage.setItem('rollingCalendar', JSON.stringify(value));
	}
});

export { rollingCalendar as default };
