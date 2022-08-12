<script>
	import { onMount } from 'svelte';

	import { cycleDuration, mealsPerDay } from '../shared/config';
	import { startDate, cycleCalendar } from '../shared/stores';
	import { getFormattedDay, getIntlDate } from '../shared/utils';
	import MealsSelector from '../components/MealsSelector.svelte';

	let newCycleCalendar = {};
	let newStartDate = $startDate ?? new Date();
	let shadowIntensity = 0;
	let calendarEnds = [];

	const today = new Date();
	const dayInMs = 1000 * 60 * 60 * 24;
	const timeDifference = Math.round((today.getTime() - newStartDate.getTime()) / dayInMs);
	const dayOfCycle = Math.round(timeDifference % cycleDuration);
	const cycleStart = new Date(today.getTime() - dayOfCycle * dayInMs);

	[...Array(cycleDuration).keys()].map((_, index) => {
		const day = new Date(cycleStart.getTime() + index * dayInMs);
		const formattedDay = getFormattedDay(day);

		newCycleCalendar[formattedDay] = {};
		newCycleCalendar[formattedDay].is_today = formattedDay === getFormattedDay(today);
		newCycleCalendar[formattedDay].selection = [...Array(mealsPerDay.length).keys()].map(
			(_, index) => {
				if (formattedDay in $cycleCalendar) {
					return $cycleCalendar[formattedDay].selection[index];
				}
				return null;
			}
		);
	});

	cycleCalendar.set(newCycleCalendar);

	onMount(() => {
		let scrollableContainerEl = document.querySelector('.scrollable-container');
		let contentEl = document.querySelector('.scrollable-container-content');
		let contentScrollWidth = contentEl?.scrollWidth - scrollableContainerEl?.offsetWidth;

		contentEl?.addEventListener('scroll', (event) => {
			shadowIntensity = event.target.scrollLeft / contentScrollWidth;
		});
	});

	$: {
		const first = Object.keys($cycleCalendar)[0];
		const last = Object.keys($cycleCalendar)[Object.keys($cycleCalendar).length - 1];
		let style = 'short';

		// if different months
		if (first.split('-')[1] !== last.split('-')[1]) {
			style = 'medium';

			if (first.split('-')[0] !== last.split('-')[0]) {
				style = 'long';
			}
		}

		calendarEnds = [getIntlDate(first, style), getIntlDate(last, 'medium')];
	}
</script>

<section>
	<h2>
		Calendrier
		<small>du {calendarEnds[0]} au {calendarEnds[1]}</small>
	</h2>
	<div class="scrollable-container" style="--shadow-intensity: {shadowIntensity}">
		<div class="scrollable-container-content">
			{#each Object.entries($cycleCalendar) as day}
				<MealsSelector {day} />
			{/each}
		</div>
	</div>
</section>

<style>
	:root {
		--color-background-calendar: white;
	}

	.scrollable-container {
		overflow: hidden;
		position: relative;
		background-color: var(--color-background-calendar);
	}

	.scrollable-container-content {
		overflow-y: scroll;
		display: flex;
		gap: 1rem;
		padding-bottom: 1rem;
		background-color: var(--color-background-calendar);
	}

	.scrollable-container::before,
	.scrollable-container::after {
		content: '';
		display: block;
		position: absolute;
		top: 0;
		bottom: 0;
		width: 1rem;
	}

	.scrollable-container::before {
		left: 0;
		opacity: min(1, calc(1000 * var(--shadow-intensity, 0)));
		background: linear-gradient(to right, var(--color-background-calendar), transparent);
	}
	.scrollable-container::after {
		right: 0;
		opacity: min(1, calc(1000 * calc(1 - var(--shadow-intensity, 1))));
		background: linear-gradient(to left, var(--color-background-calendar), transparent);
	}
</style>
