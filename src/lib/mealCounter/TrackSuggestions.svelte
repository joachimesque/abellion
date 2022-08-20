<script>
	import { mealTypes, cycleDuration, nonVegOptions } from '$lib/shared/config';
	import { cyclesHistory, selectedMeals, startDate, mealRules } from '$lib/shared/stores';
	import { getFormattedDay } from '$lib/shared/utils';

	// Number of past cycles to check
	const sampleSize = 4;
	const improvementThreshold = 3;
	let improvedMeals = {};
	let displaySuggestions = false;

	const today = new Date();
	const dayInMs = 1000 * 60 * 60 * 24;

	$: {
		const timeDifference = Math.round((today.getTime() - $startDate.getTime()) / dayInMs);
		const dayOfCycle = Math.round(timeDifference % cycleDuration);
		const cycleStart = new Date(today.getTime() - dayOfCycle * dayInMs);

		cyclesHistory.update((current) => {
			let newHistory = { ...current };
			newHistory[getFormattedDay(cycleStart)] = $selectedMeals;

			return newHistory;
		});
	}

	$: {
		const historyKeys = Object.keys($cyclesHistory);
		let comparisonObject = {};

		if (historyKeys.length >= sampleSize) {
			// Get 4 last cycles from history
			const sampledCyclesKeys = historyKeys.sort().slice(-sampleSize);

			// Compare each cycle to mealRules
			// Returns object:
			// 	{
			// 		meat_1: {
			//			status: 'fail',
			//			improvedCyclesCount: 2,
			//			minimumImprovement: 1,
			//			comparison: [0, 1, -2, 2],
			//		},
			// 		…
			// 	}
			// If <improvementThreshold> or <sampleSize> cycles have less non veg* options than rules:
			//   - display section
			//   - calculate weekly/annual CO2e gain
			//   - display button to change rules (TODO)
			comparisonObject = Object.fromEntries(
				nonVegOptions.map((item) => {
					const rule = $mealRules[item];
					const comparison = sampledCyclesKeys.map(
						(cycleKey) => rule - $cyclesHistory[cycleKey][item]
					);

					const improved = comparison.filter((i) => i > 0);
					const failed = comparison.filter((i) => i < 0);

					const improvedCyclesCount = improved.length;
					const minimumImprovement = improved.sort()[0] || 0;

					let status = 'fail';

					if (failed.length === 0) {
						status = 'success';

						if (improved.length >= improvementThreshold) {
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
				})
			);
		}

		improvedMeals = Object.fromEntries(Object.entries(comparisonObject).map(item => {
			switch(item[1].status) {
				case "fail":
				case "success":
					return null;
				case "improved":
				default:
					return [item[0], item[1].minimumImprovement]
			}
		}).filter(x => !!x));
	}

	const displayList = (object) => {
		if (Object.keys(object).length === 0) return '';  
		const prettyNameArray = Object.entries(object).map((item) => {
			const prettyName = mealTypes.find((i) => i.name === item[0])?.pretty_name;
			const gain = Math.round(item[1] * mealTypes.find((i) => i.name === item[0])?.impact);
			return `<strong>${prettyName}</strong> (${item[1]} repas = ${gain})`;
		});

		if (prettyNameArray.length === 0) return '';
		if (prettyNameArray.length === 1) return prettyNameArray[0];

		return `${prettyNameArray.slice(0, -1).join(', ')} et ${
			prettyNameArray[prettyNameArray.length - 1]
		}`;
	};
</script>

{#if displaySuggestions || Object.keys(improvedMeals).length > 0}
	<section>
		<h3>Suggestions basées sur vos cycles précédents</h3>
		{@html displayList(improvedMeals)}
	</section>
{/if}
