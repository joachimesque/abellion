<script>
	import { mealTypes, cycleDuration, mealsPerDay } from '$lib/shared/config';
	import { mealRules, startDate, mode } from '$lib/shared/stores';
	import RulesImpact from '$lib/components/RulesImpact.svelte';
	import EraseButton from './EraseButton.svelte';

	const numberOfMeals = cycleDuration * mealsPerDay.length;

	$: rulesLeftToSelect = numberOfMeals - Object.values($mealRules).reduce((p, a) => p + a, 0);

	function onRuleInputChange(event) {
		let value = parseInt(event.target.value);

		const allInputs = [...document.querySelectorAll('input.rule_input')];
		let allValues = allInputs.reduce((p, input) => p + parseInt(input.value), 0);

		if (allValues > numberOfMeals) {
			let diff = allValues - numberOfMeals;
			value = value - diff;
		}

		mealRules.update((current) => {
			return {
				...current,
				[event.target.name]: value,
			};
		});
	}

	const changeModeToTrack = () => {
		startDate.set(new Date());
		mode.set('track');
	};

	const changeModeToPreview = () => {
		startDate.set(null);
		mode.set('preview');
	};
</script>

<section>
	<h2>Réglages</h2>
	<h3 id="menu">Menus</h3>
	<p>Renseignez vos repas pour un cycle de {cycleDuration} jours</p>

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

	<RulesImpact />

	{#if $mode === 'preview'}
		<!-- Change mode and start tracking -->
		<button type="button" on:click={changeModeToTrack} disabled={rulesLeftToSelect > 0}>
			Passer en mode <strong>suivi de vos repas</strong>
		</button>
	{/if}

	{#if $mode === 'track'}
		<button type="button" on:click={changeModeToPreview}
			>Revenir en mode <strong>aperçu de vos repas</strong></button
		>
	{/if}

	<hr />

	<h3 id="effacer-mes-données">Effacer mes données</h3>

	<p>
		<EraseButton />
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
