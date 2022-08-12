<script>
	import { mealTypes, cycleDuration, mealsPerDay } from '../shared/config'
	import { mealRules } from '../shared/stores'

	const numberOfMeals = cycleDuration * mealsPerDay.length

	$: rulesLeftToSelect = numberOfMeals - Object.values($mealRules).reduce((p, a) => p + a, 0)

	function onRuleInputChange(event) {
		let value = parseInt(event.target.value)

		const allInputs = [...document.querySelectorAll('input.rule_input')]
		let allValues = allInputs.reduce((p, input) => p + parseInt(input.value), 0)

		if (allValues > numberOfMeals) {
			let diff = allValues - numberOfMeals
			value = value - diff
		}

		mealRules.update((current) => {
			return {
				...current,
				[event.target.name]: value,
			}
		})
	}
</script>

<section>
	<h2>Réglages</h2>
	<p>Renseignez vos repas pour un cycle de {cycleDuration} jours</p>

	<p />

	<div class="gaufrier">
		{#each mealTypes as mealType}
			<div class="control">
				<span role="img" alt={mealType.description}>{mealType.icon}</span>
				<label for={mealType.name}>{mealType.pretty_name}</label>
				<input
					id={mealType.name}
					class="rule_input"
					name={mealType.name}
					type="number"
					max={$mealRules[mealType.name] + rulesLeftToSelect}
					min="0"
					pattern="[0-9]*"
					inputmode="numeric"
					bind:value={$mealRules[mealType.name]}
					on:change={onRuleInputChange}
				/>
			</div>
		{/each}
	</div>
	<p aria-live="polite">
		{#if rulesLeftToSelect > 0}
			Sélectionnez encore {rulesLeftToSelect} repas
		{:else}
			Il ne reste pas de repas à sélectionner
		{/if}
	</p>
</section>

<style>
	.control {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
	}

	input.rule_input {
		font-size: 2rem;
		text-align: center;
		width: 4rem;
	}

	span[role='img'] {
		font-size: 1.6rem;
	}
</style>
