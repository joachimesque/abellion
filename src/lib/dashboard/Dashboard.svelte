<script>
	import { base } from '$app/paths';
	import { rollingCalendar, cycleCalendar, mode } from '$lib/shared/stores';
	import { getIntlDate, getFormattedDay } from '$lib/shared/utils';
	import DayMeals from '$lib/components/DayMeals.svelte';

	let calendarEnds = [];
	let displayedDates = {};

	$: calendar = $mode === 'preview' ? $rollingCalendar : $cycleCalendar;

	const getDateObjFromCalendar = (index) => {
		return {
			date: Object.keys(calendar)[index],
			obj: calendar[Object.keys(calendar)[index]],
		};
	};

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

		const todayIndex = Object.keys(calendar).indexOf(getFormattedDay(new Date()));
		if (todayIndex > 1) {
			const { date, obj } = getDateObjFromCalendar(todayIndex - 2);
			displayedDates[date] = obj;
		}
		if (todayIndex > 0) {
			const { date, obj } = getDateObjFromCalendar(todayIndex - 1);
			displayedDates[date] = obj;
		}
		const { date, obj } = getDateObjFromCalendar(todayIndex);
		displayedDates[date] = obj;
	}
</script>

<section>
	<h2>Renseigner vos repas</h2>
	<div class="dashboard-grid">
		<div class="block-first">
			{#if $mode === 'preview'}
				Sur le mois courant
			{:else}
				Cycle du {calendarEnds[0]} au {calendarEnds[1]}
			{/if}
		</div>
		{#each Object.entries(displayedDates) as day}
			<div class="block-day" class:block-today={day[1].is_today}>
				<DayMeals
					{day}
					title={getIntlDate(day[0], 'human')}
					height={day[1].is_today ? 'tall' : 'short'}
				/>
			</div>
		{/each}
		<div class="block-last">
			<span>Voir toutes les dates sur le <a href={`${base}/calendrier`}>calendrier</a></span>
		</div>
	</div>
</section>

<style>
	.dashboard-grid {
		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(2, auto);
		justify-content: center;
	}

	.block-today {
		grid-row: 2;
		grid-column: 1 / span 2;
	}

	.block-first {
		grid-column: 1 / span 2;
		grid-row: 1;
	}

	.block-last {
		grid-column: 1 / span 2;
	}

	.block-first,
	.block-last {
		border: 2px solid hsl(0deg, 0%, 80%);
		color: hsl(0deg, 0%, 30%);
		border-radius: var(--border-radius);
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		padding: 0.5rem;
	}

	@media (min-width: 40rem) {
		.dashboard-grid {
			grid-template-columns: repeat(2, 1fr) repeat(2, 2fr);
			grid-template-rows: repeat(2, auto);
		}

		.block-today {
			grid-column: 3;
			grid-row: 1 / span 2;
		}

		.block-first {
			grid-row: initial;
			grid-column: 1 / span 2;
		}

		.block-last {
			grid-column: 4;
			grid-row: 1 / span 2;
		}
	}

</style>
