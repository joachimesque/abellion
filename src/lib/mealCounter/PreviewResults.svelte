<script>
	import { mealTypes, impactLocaleOptions } from '$lib/shared/config';
	import { selectedMeals } from '$lib/shared/stores';
	import MealCounter from '$lib/components/MealCounter.svelte';

	export let mealsImpact;

	$: selectedMealNumber = Object.values($selectedMeals).reduce((p, a) => p + a, 0)
</script>

<section>
	<h2>Repas sélectionnés</h2>
	<div class="gaufrier">
		{#each mealTypes as mealType}
			<MealCounter {mealType} count={$selectedMeals[mealType.name] || 0} />
		{/each}
	</div>
	<p>
		<strong class="big">
			Impact de {selectedMealNumber} repas&nbsp;:
			{mealsImpact.toLocaleString('fr-FR', impactLocaleOptions)}&nbsp;kCO<sub>2</sub>e
		</strong>
		soit {(mealsImpact / selectedMealNumber).toLocaleString('fr-FR', impactLocaleOptions)}&nbsp;kCO<sub>2</sub>e par repas
	</p>
</section>
