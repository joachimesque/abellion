<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let namespace;
	export let value;
	export let selected;
	export let label;
	export let icon;
	export let focusable;

	const buttonClick = () => {
		dispatch('select', { value });
	};
</script>

<li id={`${namespace}_element_${value}`} role="option" aria-selected={selected}>
	<button on:click={buttonClick} tabindex={focusable ? '0' : '-1'} title={label} class="btn-reset">
		<span aria-hidden="true" class="icon">{icon}</span>
		<span>{label}</span>
	</button>
</li>

<style>
	button {
		white-space: nowrap;
		padding: 0.4rem 0.8rem;
		min-width: 6rem;
		text-align: center;
		border-radius: var(--border-radius);
		transition: background-color var(--transition);
		display: flex;
		gap: 0.4rem;
		align-items: center;
		width: 100%;
	}

	button:hover,
	button:focus {
		background-color: hsl(0deg, 0%, 94%);
	}

	[aria-selected='true'] button {
		background-color: hsl(0deg, 0%, 86%);
	}

	button:focus {
		outline-style: auto;
	}
	button:focus:not(:focus-visible) {
		outline: transparent;
	}
	button:focus-visible {
		outline-style: auto;
	}

	.icon {
		font-size: 1.3rem;
	}
</style>
