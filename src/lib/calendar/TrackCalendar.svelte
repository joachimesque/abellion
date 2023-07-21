<script>
	import { rollingCalendar, cycleCalendar, mode } from '$lib/shared/stores';
	import {
		getIntlDate,
		getDateFromString,
		getPreviousDayOfWeek,
		getNextDayOfWeek,
		getFormattedDay,
	} from '$lib/shared/utils';
	import DayMeals from '$lib/components/DayMeals.svelte';

	let fullCalendar;

	$: calendar = $mode === 'preview' ? $rollingCalendar : $cycleCalendar;

	$: {
		const firstRegDay = getDateFromString(Object.keys(calendar)[0]);
		const lastRegDay = getDateFromString(Object.keys(calendar)[Object.keys(calendar).length - 1]);

		const firstMonday = getPreviousDayOfWeek(firstRegDay, 1);
		const lastSunday = getNextDayOfWeek(lastRegDay, 0);

		fullCalendar = [];
		for (let d = firstMonday; d <= lastSunday; d.setDate(d.getDate() + 1)) {
			fullCalendar.push(getFormattedDay(new Date(d)));
		}
		console.log(calendar);
	}
</script>

<section>
	<h2>Calendrier</h2>
	<div class="calendar-grid">
		<div class="head">
			<span class="hide-desktop" title="Lundi">L</span>
			<span class="hide-mobile">Lundi</span>
		</div>
		<div class="head">
			<span class="hide-desktop" title="Mardi">M</span>
			<span class="hide-mobile">Mardi</span>
		</div>
		<div class="head">
			<span class="hide-desktop" title="Mercredi">M</span>
			<span class="hide-mobile">Mercredi</span>
		</div>
		<div class="head">
			<span class="hide-desktop" title="Jeudi">J</span>
			<span class="hide-mobile">Jeudi</span>
		</div>
		<div class="head">
			<span class="hide-desktop" title="Vendredi">V</span>
			<span class="hide-mobile">Vendredi</span>
		</div>
		<div class="head">
			<span class="hide-desktop" title="Samedi">S</span>
			<span class="hide-mobile">Samedi</span>
		</div>
		<div class="head">
			<span class="hide-desktop" title="Dimanche">D</span>
			<span class="hide-mobile">Dimanche</span>
		</div>
		{#each fullCalendar as day}
			{#if day in calendar}
				<div class={`inside ${calendar[day]['is_today'] ? 'today' : ''}`}>
					<DayMeals day={[day, calendar[day]]} title={getIntlDate(day, 'short')} />
				</div>
			{:else}
				<div class="outside">{getIntlDate(day, 'short')}</div>
			{/if}
		{/each}
	</div>
</section>

<style>
	.calendar-grid {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		gap: 0.5rem;
	}

	.head {
		font-size: 0.8em;
		font-weight: bold;
		text-align: center;
	}

	.outside {
		justify-self: center;
		opacity: 0.5;
	}
</style>
