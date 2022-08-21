<script>
	import { mealTypes, impactLocaleOptions } from '$lib/shared/config';
	import { cyclesHistory, selectedMeals, cycleStartDate, cyclesTally } from '$lib/shared/stores';
	import { getFormattedDay } from '$lib/shared/utils';

	export let getRulesImpactYear;

	let talliedList = {};
	let displaySuggestions = false;
	let formattedTalliedList = '';
	let totalGains = 0;

	$: {
		// Handle cyclesHistory store update
		cyclesHistory.update((current) => {
			let newHistory = { ...current };
			newHistory[getFormattedDay($cycleStartDate)] = $selectedMeals;

			return newHistory;
		});
	}

	$: {
		// Handle cyclesTally transformation to a transformable object
		// If <improvementThreshold> out of <sampleSize> cycles have less non veg* options than rules,
		// such meals are "improved" over the rules for these cycles.
		talliedList = Object.fromEntries(
			Object.entries($cyclesTally)
				.map((item) => {
					switch (item[1].status) {
						case 'fail':
						case 'success':
							return null;
						case 'improved':
						default:
							return [item[0], item[1].minimumImprovement];
					}
				})
				.filter((x) => !!x)
		);

		const prettyNameArray = Object.entries(talliedList).map((item) => {
			const prettyName = mealTypes.find((i) => i.name === item[0])?.pretty_name;
			return `<strong>${prettyName}</strong> (-${item[1]} repas)`;
		});

		// If there are "improved" meals:
		//   - display section
		//   - calculate total CO2e gain and display as cycle/annual gains
		//   - display button to change rules (TODO)
		if (talliedList.length === 0) {
			displaySuggestions = false;
			formattedTalliedList = '';
		} else if (talliedList.length === 1) {
			displaySuggestions = true;
			formattedTalliedList = prettyNameArray[0];
		} else {
			displaySuggestions = true;
			formattedTalliedList = `${prettyNameArray.slice(0, -1).join(', ')} et ${
				prettyNameArray[prettyNameArray.length - 1]
			}`;
		}

		totalGains = Object.entries(talliedList).reduce((acc, item) => {
			return (
				acc +
				item[1] *
					(mealTypes.find((i) => i.name === item[0])?.impact -
						mealTypes.find((i) => i.name === 'vegetarian')?.impact)
			);
		}, 0);
	}
</script>

{#if displaySuggestions}
	<section>
		<h3>Suggestions basées sur vos cycles précédents</h3>
		<p>
			En remplaçant les repas suivants&nbsp;:
			{@html formattedTalliedList} par des alternatives végétariennes, vous pourriez économiser
			<strong>{totalGains.toLocaleString('fr-FR', impactLocaleOptions)}</strong>&nbsp;kCO<sub>2</sub
			>e par cycle, soit
			<strong>{getRulesImpactYear(totalGains).toLocaleString('fr-FR', impactLocaleOptions)}</strong
			>&nbsp;tCO<sub>2</sub>e par an.
		</p>
	</section>
{/if}
