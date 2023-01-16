import { mealTypes, impactLocaleOptions, locale } from './config';

export const getEmptyMealObject = () => {
	const emptyMealObject = {};
	mealTypes.forEach((item) => (emptyMealObject[item.name] = 0));
	return emptyMealObject;
};

export const getFormattedDay = (date) => {
	if (!(date instanceof Date)) return date;

	return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, 0)}-${date
		.getDate()
		.toString()
		.padStart(2, 0)}`;
};

const isSameDay = (day_one, day_two) => {
	return (
		day_one.getDate() === day_two.getDate() &&
		day_one.getMonth() === day_two.getMonth() &&
		day_one.getFullYear() === day_two.getFullYear()
	);
};

export const getIntlDate = (date, style = 'long') => {
	const options = {
		short: { day: 'numeric' },
		medium: { day: 'numeric', month: 'long' },
		long: { dateStyle: 'long' },
		month: { month: 'numeric' },
	};

	let dateInstance = date instanceof Date ? date : getDateFromString(date);

	if (style == 'human') {
		if (isSameDay(dateInstance, new Date())) {
			return 'Aujourd’hui';
		}

		const yesterday = new Date();
		yesterday.setDate(yesterday.getDate() - 1);

		if (isSameDay(dateInstance, yesterday)) {
			return 'Hier';
		}

		return new Intl.DateTimeFormat(locale, { day: 'numeric', weekday: 'long' }).format(
			dateInstance
		);
	}

	return new Intl.DateTimeFormat(locale, options[style]).format(dateInstance);
};

export const getDateFromString = (date) => {
	const dateArray = date.split('-');
	return new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
};

export const getPreviousDayOfWeek = (date, target) => {
	return new Date(date.setDate(date.getDate() - ((date.getDay() - target + 7) % 7)));
};

export const getNextDayOfWeek = (date, target) => {
	return new Date(date.setDate(date.getDate() + ((14 - target - date.getDay()) % 7)));
};

export const getLocalizedNumber = (number) => number.toLocaleString(locale, impactLocaleOptions);
