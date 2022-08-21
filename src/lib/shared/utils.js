import { mealTypes } from './config';

export const getEmptyMealObject = () => {
	const emptyMealObject = {};
	mealTypes.forEach((item) => (emptyMealObject[item.name] = 0));
	return emptyMealObject;
};

export const getFormattedDay = (date) => {
	if (!(date instanceof Date)) return date;

	return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

export const getIntlDate = (date, style = 'long') => {
	const options = {
		short: { day: 'numeric' },
		medium: { day: 'numeric', month: 'long' },
		long: { dateStyle: 'long' },
	};

	let dateInstance = date;

	if (!(date instanceof Date)) {
		const dateArray = date.split('-');
		dateInstance = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
	}

	return new Intl.DateTimeFormat('fr-FR', options[style]).format(dateInstance);
};
