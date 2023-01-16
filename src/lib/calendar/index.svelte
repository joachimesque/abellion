<script>
	import { base } from '$app/paths';
	import { mode } from '$lib/shared/stores';
	import TrackCalendar from './TrackCalendar.svelte';
</script>

<h1 class="sr-only">Calendrier</h1>

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
{/if}

{#if $mode}
	<TrackCalendar />
{/if}

{#if !$mode}
	Chargement des données…
{/if}
