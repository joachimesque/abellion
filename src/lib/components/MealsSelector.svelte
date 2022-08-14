<script>
	import { onMount } from 'svelte';
	import { browser } from '$app/env';
	import { mealTypes, mealsPerDay } from '$lib/shared/config';
	import { cycleCalendar } from '$lib/shared/stores';
	import { getIntlDate } from '$lib/shared/utils';

	export let day;

	let hasScrolled = false;

	onMount(() => {
		if (!day[1].is_today) return;
		if (!browser) return;
		if (hasScrolled) return;

		const todayEl = document?.querySelector('.day.today');
		if (!todayEl) return;

		const wrapperWidth = todayEl.closest('.scrollable-container').scrollWidth;

		const leftScroll = Math.round(todayEl.offsetLeft - (wrapperWidth - todayEl.scrollWidth) / 2);

		todayEl.parentNode.scroll({ left: leftScroll });
		hasScrolled = true;
	});

	const onSelectMeal = (event, { day, meal }) => {
		cycleCalendar.update((current) => {
			current[day].selection[meal] = event.target.value;
			return current;
		});
	};
</script>

<fieldset class="day" class:today={day[1].is_today}>
	<legend>
		{getIntlDate(day[0], 'medium')}
	</legend>
	{#each day[1].selection as _, index}
		<div class="control">
			<label for={`${day[0]}_${index}`}>{mealsPerDay[index]}</label>
			<select
				id={`${day[0]}_${index}`}
				on:change={(e) => onSelectMeal(e, { day: day[0], meal: index })}
				name={`input_${day[0]}_${index}`}
			>
				<option value="null">Non sélectionné</option>
				{#each mealTypes as mealType}
					<option value={mealType.name} selected={day[1].selection[index] === mealType.name}>
						{mealType.pretty_name}&nbsp;
						<span aria-hidden="true">{mealType.icon}</span>
					</option>
				{/each}
			</select>
		</div>
	{/each}
</fieldset>

<style>
	.day {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		border: 0;
		border-radius: 0.3em;
	}

	.day legend {
		padding: 0.3em 0.5em 0;
		border-radius: 0.3em;
		font-weight: bold;
	}

	.day.today,
	.day.today legend {
		background-color: LightSalmon;
	}

	select {
		height: 2rem;
	}
</style>
