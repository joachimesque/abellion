<script>
	import { base } from '$app/paths';
	import { mealTypes, cycleDuration, impactLocaleOptions, mealsPerDay } from '$lib/shared/config';
	import { mealRules, startDate, selectedMeals, mode } from '$lib/shared/stores';
	import Calendar from './Calendar.svelte';
	import PreviewResults from './PreviewResults.svelte';
	import TrackResults from './TrackResults.svelte';
	import TrackSuggestions from './TrackSuggestions.svelte';
	import Settings from './Settings.svelte';

	let showSettings = false;

	$: rulesImpact = getRulesImpact($mealRules);
	$: rulesImpactYear = getRulesImpactYear(getRulesImpact($mealRules));
	$: mealsImpact = getRulesImpact($selectedMeals);
	$: allowStart =
		Object.values($mealRules).reduce((p, a) => p + a, 0) === cycleDuration * mealsPerDay.length;

	const getRulesImpact = (meals) => {
		return mealTypes?.map((type) => type.impact * meals[type.name]).reduce((p, a) => p + a, 0);
	};

	const getRulesImpactYear = (impact) => {
		return (impact / cycleDuration) * 0.365;
	};

	const changeModeToTrack = () => {
		startDate.set(new Date());
		mode.set('track');
		showSettings = false;
	};

	const changeModeToPreview = () => {
		startDate.set(null);
		mode.set('preview');
		showSettings = false;
	};
</script>

{#if $mode === 'preview'}
	<p>
		Mode&nbsp;: <strong>Aperçu de vos repas</strong>
		<a href={`${base}/a-propos#le-mode-apercu`} title="Aide du mode Aperçu">?</a>
	</p>
{/if}

{#if $mode === 'track'}
	<p>
		Mode&nbsp;: <strong>Suivi de vos objectifs</strong>
		<a href={`${base}/a-propos#le-mode-suivi`} title="Aide du mode Suivi">?</a>
	</p>

	<p>
		Impact de votre choix de menus&nbsp;:
		<strong>
			{rulesImpact.toLocaleString('fr-FR', impactLocaleOptions)}&nbsp;<abbr
				title="kilos de gaz à effet de serre en équivalent dioxyde de carbone"
			>
				kCO<sub>2</sub>e
			</abbr>
		</strong>
		{' '} pour {cycleDuration} jours, ou
		<strong>
			{rulesImpactYear.toLocaleString('fr-FR', impactLocaleOptions)}&nbsp;<abbr
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
{/if}

{#if showSettings}
	<Settings />

	<p>
		Impact de votre choix de menus&nbsp;:
		<strong>
			{rulesImpact.toLocaleString('fr-FR', impactLocaleOptions)}&nbsp;<abbr
				title="kilos de gaz à effet de serre en équivalent dioxyde de carbone"
			>
				kCO<sub>2</sub>e
			</abbr>
		</strong>
		{' '} pour {cycleDuration} jours, ou
		<strong>
			{rulesImpactYear.toLocaleString('fr-FR', impactLocaleOptions)}&nbsp;<abbr
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

	{#if $mode === 'preview'}
		<!-- Cancel -->
		<button type="button" on:click={() => (showSettings = false)}>
			Rester en mode <strong>aperçu de vos repas</strong>
		</button>

		<!-- Change mode and start tracking -->
		<button type="button" on:click={changeModeToTrack} disabled={!allowStart}>
			📆 Commencez à remplir votre calendrier
		</button>
	{/if}

	{#if $mode === 'track'}
		<button type="button" on:click={changeModeToPreview}
			>Revenir en mode <strong>aperçu de vos repas</strong></button
		>

		<button type="button" on:click={() => (showSettings = false)}>
			📆 Revenir au calendrier
		</button>
	{/if}
{/if}

{#if $mode && !showSettings}
	<button type="button" on:click={() => (showSettings = true)}>⚙️ Réglages</button>

	<Calendar />

	{#if $mode === 'preview'}
		<PreviewResults {mealsImpact} />
	{/if}

	{#if $mode === 'track'}
		<TrackResults {rulesImpact} {mealsImpact} />
		<TrackSuggestions />
	{/if}
{/if}

{#if !$mode}
	Chargement des données…
{/if}
