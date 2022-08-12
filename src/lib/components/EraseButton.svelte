<script>
	import { onMount } from 'svelte';
	import { startDate } from '../shared/stores';

	let erased;

	onMount(() => {
		erased = new URL(document.location).searchParams.get('reset') === '';
	});

	$: {
		erased = $startDate == null;
	}

	const handleErase = () => {
		if (
			window.confirm(
				'Voulez-vous vraiment supprimer toutes vos données ?\nVous allez perdre vos règles de repas et votre progression jusque là.'
			)
		) {
			localStorage.clear();
			const urlParams = new URLSearchParams(window.location.search);
			urlParams.set('reset', '');
			window.location.search = urlParams;
		}
	};
</script>

<span aria-live="polite">
	{#if !erased}
		<button type="button" on:click={handleErase}>Effacer toutes mes données</button>
	{:else}
		<mark>Vos données ont bien été effacées.</mark>
	{/if}
</span>
