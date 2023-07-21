import { derived } from 'svelte/store';
import cyclesHistory from './cyclesHistory';
import mealRules from './mealRules';
import { nonVegOptions, tallySampleSize, tallyImprovementThreshold } from '$lib/shared/config';

const defaultValue = {};

export const cyclesTally = derived([cyclesHistory, mealRules], ([$cyclesHistory, $mealRules]) => {
	const historyKeys = Object.keys($cyclesHistory);

	if (historyKeys.length < tallySampleSize) return defaultValue;

	// Get 4 last cycles from history
	const sampledCyclesKeys = historyKeys.sort().slice(-tallySampleSize);

	// Compare each cycle to mealRules
	// Returns object:
	//  {
	//    meat_1: {
	//      status: 'fail',
	//      improvedCyclesCount: 2,
	//      minimumImprovement: 1,
	//      comparison: [0, 1, -2, 2],
	//    },
	//    …
	//  }
	return Object.fromEntries(
		nonVegOptions.map((item) => {
			const rule = $mealRules[item];
			const comparison = sampledCyclesKeys.map((cycleKey) => rule - $cyclesHistory[cycleKey][item]);

			const improved = comparison.filter((i) => i > 0);
			const failed = comparison.filter((i) => i < 0);

			const improvedCyclesCount = improved.length;
			const minimumImprovement = improved.sort()[0] || 0;

			let status = 'fail';

			if (failed.length === 0) {
				status = 'success';

				if (improved.length >= tallyImprovementThreshold) {
					status = 'improved';
				}
			}

			return [
				item,
				{
					status,
					improvedCyclesCount,
					minimumImprovement,
					comparison,
				},
			];
		}),
	);
});

export { cyclesTally as default };
