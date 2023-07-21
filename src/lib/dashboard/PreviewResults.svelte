<script>
	import { mealTypes } from '$lib/shared/config';
	import { getLocalizedNumber } from '$lib/shared/utils';
	import { selectedMeals } from '$lib/shared/stores';
	import MealCounter from '$lib/components/MealCounter.svelte';

	export let mealsImpact;

	$: selectedMealNumber = Object.values($selectedMeals).reduce((p, a) => p + a, 0);
</script>

<section>
	<h2>Repas sélectionnés <small>sur le mois courant</small></h2>
	<div class="gaufrier">
		{#each mealTypes as mealType}
			<MealCounter {mealType} count={$selectedMeals[mealType.name] || 0} />
		{/each}
	</div>
	{#if selectedMealNumber > 0}
		<p>
			<strong class="big">
				Impact de {selectedMealNumber} repas :
				{getLocalizedNumber(mealsImpact)} kCO<sub>2</sub>e
			</strong>
			{#if selectedMealNumber > 1}
				soit {getLocalizedNumber(mealsImpact / selectedMealNumber)} kCO<sub>2</sub>e par repas
			{/if}
		</p>
	{/if}
</section>
