<script>
	import { createEventDispatcher } from 'svelte';
	import { mealTypes } from '$lib/shared/config';
	import Button from './Button.svelte';

	const dispatch = createEventDispatcher();

	export let namespace;
	export let meal;
	export let selected;

	let isDropdownOpen = false;
	let value = selected;
	$: currentMeal = mealTypes.find((item) => item.name == selected);

	const handleSelect = (event) => {
		handleDropdown('close');
		value = event.detail.value;
	};

	const handleTriggerKeyUp = (event) => {
		switch (event.key) {
			case 'ArrowDown':
			case 'ArrowUp':
				event.preventDefault();
				handleDropdown('open');
				break;
			default:
				break;
		}
	};

	const handleDropdownKeyUp = (event) => {
		switch (event.key) {
			case 'Escape':
				handleDropdown('close');
				break;
			case 'ArrowDown':
				event.preventDefault();
				if (document.activeElement.parentNode.getAttribute('role') == 'option') {
					document.activeElement.parentNode.nextElementSibling?.querySelector('button').focus();
				}
				break;
			case 'ArrowUp':
				event.preventDefault();
				if (event.shiftKey) {
					handleDropdown('close');
				}
				if (!event.shiftKey) {
					if (document.activeElement.parentNode.getAttribute('role') == 'option') {
						document.activeElement.parentNode.previousElementSibling
							?.querySelector('button')
							.focus();
					}
				}
				break;
			default:
				break;
		}
	};

	const handleDropdown = (action = 'switch') => {
		if (action == 'switch') {
			isDropdownOpen = !isDropdownOpen;
		}

		if (action == 'open') {
			isDropdownOpen = true;
		}

		if (action == 'close') {
			isDropdownOpen = false;
		}

		// Post action behaviour

		if (isDropdownOpen) {
			const selected = document.querySelector(
				`#${namespace}_element_${value}[aria-selected="true"] button`
			);
			if (selected) {
				selected.focus();
			} else {
				document.querySelector(`#${namespace}_dropdown > :first-child button`).focus();
			}
		}

		if (!isDropdownOpen) {
			document.getElementById(`${namespace}_trigger`).focus();
		}
	};

	$: {
		dispatch('change', { value });
	}
</script>

<div>
	<button
		id={`${namespace}_trigger`}
		title={isDropdownOpen ? 'Fermer' : `${meal}, choix : ${currentMeal?.pretty_name || 'aucun'}`}
		aria-haspopup="listbox"
		aria-controls={`${namespace}_dropdown`}
		aria-label={`Sélectionnez pour le ${meal}, choix : ${currentMeal?.pretty_name || 'aucun'}`}
		aria-expanded={isDropdownOpen}
		on:click={() => handleDropdown('switch')}
		on:keyup={handleTriggerKeyUp}
	>
		<span class="aria-hidden">
			{#if currentMeal}
				{currentMeal?.icon}
			{:else}
				🍽
			{/if}
		</span>
		<span class="hide-mobile">
			{currentMeal?.pretty_name || 'Sélectionner'}
		</span>
	</button>
	<ul
		id={`${namespace}_dropdown`}
		role="listbox"
		tabIndex={-1}
		aria-multiselectable={false}
		on:keyup={handleDropdownKeyUp}
	>
		<Button
			{namespace}
			value="null"
			selected={false}
			label="Annuler la sélection"
			icon="🚫🍽"
			focusable={isDropdownOpen}
			on:select={handleSelect}
		/>
		{#each mealTypes as mealType}
			<Button
				{namespace}
				value={mealType.name}
				selected={selected === mealType.name}
				label={mealType.pretty_name}
				icon={mealType.icon}
				focusable={isDropdownOpen}
				on:select={handleSelect}
			/>
		{/each}
	</ul>
</div>

<style>
	button[aria-haspopup='listbox'] {
		width: 100%;
		padding: 0.33rem 0.15rem;
		white-space: nowrap;
	}

	button[aria-haspopup='listbox']:focus-visible {
		outline: auto;
	}

    @supports not selector(:focus-visible) {
      button[aria-haspopup='listbox']:focus {
        outline: auto;
      }
    }

	[aria-haspopup='listbox']:not([aria-expanded='true']) + ul[role='listbox'] {
		margin: 0;
		width: 0;
		height: 0;
		overflow: hidden;
	}

	[aria-haspopup='listbox'][aria-expanded='true']::after {
		content: '';
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: hsla(0deg, 0%, 100%, 0.6);
	}

	[aria-haspopup='listbox'][aria-expanded='true'] + ul[role='listbox'] {
		position: fixed;
		top: 50vh;
		left: 50vw;
		background: var(--color-background, white);
		list-style: none;
		margin: 0;
		padding: 2rem;
		border-radius: var(--border-radius);
		transform: translate(-50%, -50%);
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	[aria-haspopup='listbox'][aria-expanded='true'] + ul[role='listbox']::after {
		content: 'Fermer';
		pointer-events: none;
		position: absolute;
		bottom: 100%;
		right: 0;
		font-weight: bold;
		font-size: 0.8rem;
	}
</style>
