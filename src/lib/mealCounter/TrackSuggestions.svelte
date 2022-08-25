<script>
	import { mealTypes, impactLocaleOptions, vegOptions } from '$lib/shared/config';
	import { cyclesHistory, selectedMeals, cycleStartDate, cyclesTally } from '$lib/shared/stores';
	import { getFormattedDay } from '$lib/shared/utils';

	export let getRulesImpactYear;

	let talliedList = [];
	let totalGains = 0;

	const vegOptionsSelect = mealTypes
		.filter((item) => vegOptions.includes(item.name))
		.map((item) => {
			return { ...item, pretty_name: `tout ${item.pretty_name}` };
		});

	vegOptionsSelect.push({
		name: 'mix',
		pretty_name: '50/50 Végé/Végan',
		impact: vegOptionsSelect.reduce((a, b) => a + b.impact, 0) / vegOptionsSelect.length,
	});

	let selectedVegOption = vegOptionsSelect[0];

	const onSelectChange = (event) =>
		(selectedVegOption = vegOptionsSelect.find((item) => item.name === event.target.value));

	$: {
		// Handle cyclesHistory store update
		cyclesHistory.update((current) => {
			let newHistory = { ...current };
			newHistory[getFormattedDay($cycleStartDate)] = $selectedMeals;

			return newHistory;
		});

		// Handle cyclesTally transformation to a transformable object
		// If <improvementThreshold> out of <sampleSize> cycles have less non veg* options than rules,
		// such meals are "improved" over the rules for these cycles.
		talliedList = Object.entries($cyclesTally)
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
			.filter((x) => !!x);

		totalGains = talliedList.reduce((acc, item) => {
			return (
				acc +
				item[1] * (mealTypes.find((i) => i.name === item[0])?.impact - selectedVegOption.impact)
			);
		}, 0);
	}
</script>

{#if talliedList.length > 0}
	<section>
		<h2>Suggestions</h2>
		<p class="big">
			En inspectant vos 4 dernier cycles, vous avez consommé moins de repas non-vegé/vegan que vos
			objectifs <span role="img" title="Emoji Félicitations">🤗</span><br />
			N’hésitez pas à mettre à jour ceux-ci pour refléter ce progrès&nbsp;!
		</p>
		<div>
			En remplaçant les repas suivants&nbsp;:

			<ul>
				{#each talliedList as meal}
					<li>
						<strong>{mealTypes.find((i) => i.name === meal[0])?.pretty_name}</strong>
						(-{meal[1]} repas)
					</li>
				{/each}
			</ul>
			par des repas
			<select on:change={onSelectChange}>
				{#each vegOptionsSelect as vegOpt}
					<option value={vegOpt.name}>{vegOpt.pretty_name}</option>
				{/each}
			</select>, vous pouvez économiser
			<strong>{totalGains.toLocaleString('fr-FR', impactLocaleOptions)}</strong>&nbsp;kCO<sub>2</sub
			>e par cycle, soit
			<strong>{getRulesImpactYear(totalGains).toLocaleString('fr-FR', impactLocaleOptions)}</strong
			>&nbsp;tCO<sub>2</sub>e par an.
		</div>
	</section>
{/if}
