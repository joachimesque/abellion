<script>
	import { mealTypes, impactThreshold, cycleDuration } from '$lib/shared/config';
	import { getLocalizedNumber } from '$lib/shared/utils';
	import { mealRules, selectedMeals } from '$lib/shared/stores';
	import MealCounter from '$lib/components/MealCounter.svelte';

	export let mealsImpact;

	let mealsAlerts = {};

	$: {
		mealTypes.forEach((mealType) => {
			let alert = true;

			// Veg* options are never on alert
			if (mealType.impact < impactThreshold) {
				alert = false;
			}

			// Meal rule is not broken
			if ($mealRules[mealType.name] > $selectedMeals[mealType.name]) {
				alert = false;
			}

			// Meal rule is 0 AND no meal has been selected
			if ($mealRules[mealType.name] === 0 && $selectedMeals[mealType.name] === 0) {
				alert = false;
			}

			mealsAlerts[mealType.name] = alert;
		});
	}

	$: selectedMealNumber = Object.values($selectedMeals).reduce((p, a) => p + a, 0);
</script>

<section>
	<h2>Repas enregistrés pour ce cycle</h2>
	<div class="gaufrier">
		{#each mealTypes as mealType}
			<MealCounter
				{mealType}
				count={`<span>${$selectedMeals[mealType.name]}</span>/<span>${
					$mealRules[mealType.name]
				}</span>`}
				alert={mealsAlerts[mealType.name]}
			/>
		{/each}
	</div>
	{#if selectedMealNumber > 0}
		<p>
			<strong class="big">
				Impact de ce cycle de {cycleDuration} jours&nbsp;:
				{getLocalizedNumber(mealsImpact)}&nbsp;kCO<sub>2</sub>e
			</strong>
			{#if selectedMealNumber > 1}
				(soit {getLocalizedNumber(mealsImpact / selectedMealNumber)}&nbsp;kCO<sub>2</sub>e par
				repas)
			{/if}
		</p>
	{/if}
</section>
