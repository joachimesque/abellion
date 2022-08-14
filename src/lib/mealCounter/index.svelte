<script>
	import { mealTypes, cycleDuration, impactLocaleOptions, mealsPerDay } from '$lib/shared/config';
	import { mealRules, startDate, selectedMeals } from '$lib/shared/stores';
	import Calendar from './Calendar.svelte';
	import Results from './Results.svelte';
	import Settings from './Settings.svelte';

	let showSettings = false;

	$: rulesImpact = getRulesImpact($mealRules).toLocaleString('fr-FR', impactLocaleOptions);
	$: rulesImpactYear = getRulesImpactYear(getRulesImpact($mealRules)).toLocaleString(
		'fr-FR',
		impactLocaleOptions
	);
	$: mealsImpact = getRulesImpact($selectedMeals).toLocaleString('fr-FR', impactLocaleOptions);
	$: allowStart =
		Object.values($mealRules).reduce((p, a) => p + a, 0) === cycleDuration * mealsPerDay.length;

	const getRulesImpact = (meals) => {
		return mealTypes.map((type) => type.impact * meals[type.name]).reduce((p, a) => p + a, 0);
	};

	const getRulesImpactYear = (impact) => {
		return (impact / cycleDuration) * 0.365;
	};

	const handleStart = () => {
		startDate.set(new Date());
		showSettings = false;
	};
</script>

{#if !$startDate || showSettings}
	<Settings />
{/if}

<p>
	Impact de votre choix de menus&nbsp;:
	<strong>
		{rulesImpact}&nbsp;<abbr title="kilos de gaz à effet de serre en équivalent dioxyde de carbone">
			kCO<sub>2</sub>e
		</abbr>
	</strong>
	{' '} pour {cycleDuration} jours, ou
	<strong>
		{rulesImpactYear}&nbsp;<abbr
			title="tonnes de gaz à effet de serre en équivalent dioxyde de carbone"
		>
			tCO<sub>2</sub>e
		</abbr>
	</strong>
	par an. La moyenne annuelle française est de
	<strong>
		1,9&nbsp;tCO<sub>2</sub>e
	</strong>
</p>

{#if !$startDate}
	<button type="button" on:click={handleStart} disabled={!allowStart}>
		📆 Commencez à remplir votre calendrier
	</button>
	{#if !allowStart}
		<span>Veuillez remplir tous les repas avant d’accéder au calendrier.</span>
	{/if}
{/if}

{#if $startDate && showSettings}
	<button type="button" on:click={() => (showSettings = false)}> 📆 Revenir au calendrier </button>
{/if}

{#if $startDate && !showSettings}
	<button type="button" on:click={() => (showSettings = true)}> ⚙️ Réglages </button>

	<Calendar />

	<Results {rulesImpact} {mealsImpact} />
{/if}
