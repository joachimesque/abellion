import { mealTypes } from './config'

export const getEmptyMealObject = () => {
	const emptyMealObject = {}
	mealTypes.forEach((item) => (emptyMealObject[item.name] = 0))
	return emptyMealObject
}

export const getFormattedDay = (date) => {
	if (!(date instanceof Date)) return date

	return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}
