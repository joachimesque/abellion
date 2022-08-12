<script>
	import { mealTypes, impactThreshold } from '../shared/config';
	import { mealRules, selectedMeals } from '../shared/stores';

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
			<p class="block">
				<span class="icon" aria-hidden="true">{mealType.icon}</span>
				<br />
				<span class="name">{mealType.pretty_name}</span>
				<br />
				<strong class="number" class:alert={mealsAlerts[mealType.name]}>
					{mealsLeft[mealType.name] || 0}
				</strong>
			</p>
		{/each}
	</div>
	<p>
		{mealsImpact} sur {rulesImpact}&nbsp;kCO
		<sub>2</sub>
		e
	</p>
</section>

<style>
	.block {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 0;
	}

	.icon {
		font-size: 2rem;
	}
	.name {
	}
	.number {
		font-size: 3rem;
	}
	.number.alert {
		color: orangered;
	}
</style>
