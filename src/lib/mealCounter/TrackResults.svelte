<script>
	import { mealTypes, impactThreshold, impactLocaleOptions, cycleDuration } from '$lib/shared/config';
	import { mealRules, selectedMeals } from '$lib/shared/stores';
	import MealCounter from '$lib/components/MealCounter.svelte';

	export let rulesImpact;
	export let mealsImpact;

	let mealsLeft = {};
	let mealsAlerts = {};

	$: {
		Object.keys($selectedMeals).forEach((key) => {
			mealsLeft[key] = Math.max(0, $mealRules[key] - $selectedMeals[key]);
		});
	}

	$: {
		mealTypes.forEach((mealType) => {
			let alert = true;

			// Veg* options are never on alert
			if (mealType.impact < impactThreshold) {
				alert = false;
			}

			// Meal rule is not broken
			if (mealsLeft[mealType.name] > 0) {
				alert = false;
			}

			// Meal rule is 0 AND no meal has been selected
			if (
				$mealRules[mealType.name] === mealsLeft[mealType.name] &&
				$selectedMeals[mealType.name] === 0
			) {
				alert = false;
			}

			mealsAlerts[mealType.name] = alert;
		});
	}
</script>

<section>
	<h2>Repas restants pour ce cycle</h2>
	<div class="gaufrier">
		{#each mealTypes as mealType}
			<MealCounter
				{mealType}
				count={mealsLeft[mealType.name] || 0}
				alert={mealsAlerts[mealType.name]}
			/>
		{/each}
	</div>

	<p>
		<strong class="big">
			Impact de ce cycle de {cycleDuration} jours&nbsp;:
			{mealsImpact.toLocaleString('fr-FR', impactLocaleOptions)}
			sur {rulesImpact.toLocaleString('fr-FR', impactLocaleOptions)}&nbsp;kCO<sub>2</sub>e
		</strong>
		(soit {(mealsImpact / (cycleDuration * 2)).toLocaleString('fr-FR', impactLocaleOptions)}&nbsp;kCO<sub>2</sub>e par repas)
	</p>
</section>
