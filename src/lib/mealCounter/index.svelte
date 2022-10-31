<script>
	import { base } from '$app/paths';
	import { mealTypes } from '$lib/shared/config';
	import { selectedMeals, mode } from '$lib/shared/stores';
	import RulesImpact from '../components/RulesImpact.svelte';
	import Calendar from './Calendar.svelte';
	import PreviewResults from './PreviewResults.svelte';
	import TrackResults from './TrackResults.svelte';
	import TrackSuggestions from './TrackSuggestions.svelte';

	$: mealsImpact = mealTypes
		?.map((type) => type.impact * $selectedMeals[type.name])
		.reduce((p, a) => p + a, 0);
</script>

<h1 class="sr-only">Décarbonnez votre alimentation</h1>

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

	<RulesImpact />
{/if}

{#if $mode}
	<Calendar />

	{#if $mode === 'preview'}
		<PreviewResults {mealsImpact} />
	{/if}

	{#if $mode === 'track'}
		<TrackResults {mealsImpact} />

		<TrackSuggestions />
	{/if}
{/if}

{#if !$mode}
	Chargement des données…
{/if}
