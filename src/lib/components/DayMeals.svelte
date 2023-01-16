<script>
	import { mealsPerDay } from '$lib/shared/config';
	import { rollingCalendar } from '$lib/shared/stores';
	import MealSelect from './mealSelect/Select.svelte';

	export let day;
	export let title;
	export let height = 'medium';

	const onSelectMeal = ({ day, meal, value }) => {
		rollingCalendar.update((current) => {
			current[day].selection[meal] = value;
			return current;
		});
	};
</script>

<div class={`day is-${height}`} class:is-today={day[1].is_today}>
	<h3>
		{title}
	</h3>

	<div class="selectors">
		{#each day[1].selection as _, index}
			<MealSelect
				meal={mealsPerDay[index]}
				on:change={(event) => onSelectMeal({ day: day[0], meal: index, value: event.detail.value })}
				selected={day[1].selection[index]}
				namespace={`meal_${day[0]}_${index}`}
			/>
		{/each}
	</div>
</div>

<style>
	.day {
		border-radius: var(--border-radius);
		padding: 0.2rem 0.1rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.day.is-today {
		background-color: LightSalmon;
	}

	h3 {
		margin: 0;
		text-align: center;
	}

	.selectors {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		justify-content: center;
	}

	.day.is-short .selectors {
		/* flex-direction: row; */
	}

	.day.is-tall {
		height: 100%;
	}

	.day.is-tall .selectors {
		flex-grow: 1;
	}
	.day.is-tall :global(button[aria-haspopup='listbox']) {
		font-size: 1.3rem;
	}
</style>
