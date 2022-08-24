<script>
	import { onMount } from 'svelte';

	import { rollingCalendar, cycleCalendar, mode } from '$lib/shared/stores';
	import { getIntlDate } from '$lib/shared/utils';
	import MealsSelector from '$lib/components/MealsSelector.svelte';

	let shadowIntensity = 0;
	let calendarEnds = [];

	onMount(() => {
		let scrollableContainerEl = document.querySelector('.scrollable-container');
		let contentEl = document.querySelector('.scrollable-container-content');
		let contentScrollWidth = contentEl?.scrollWidth - scrollableContainerEl?.offsetWidth;

		contentEl?.addEventListener('scroll', (event) => {
			shadowIntensity = event.target.scrollLeft / contentScrollWidth;
		});
	});

	$: calendar = $mode === 'preview' ? $rollingCalendar : $cycleCalendar;

	$: {
		const first = Object.keys(calendar).sort()[0];
		const last = Object.keys(calendar).sort().reverse()[0];
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
			{#each Object.entries(calendar) as day}
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
		scroll-snap-type: inline proximity;
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
