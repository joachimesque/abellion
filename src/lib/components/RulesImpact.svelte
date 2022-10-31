<script>
	import { mealTypes, cycleDuration } from '$lib/shared/config';
	import { mealRules } from '$lib/shared/stores';
	import { getLocalizedNumber } from '$lib/shared/utils';

	$: rulesImpact = getRulesImpact($mealRules);
	$: rulesImpactYear = (rulesImpact / cycleDuration) * 0.365;

	const getRulesImpact = (meals) => {
		return mealTypes?.map((type) => type.impact * meals[type.name]).reduce((p, a) => p + a, 0);
	};
</script>

<p>
	Impact de votre choix de menus&nbsp;:
	<strong>
		{getLocalizedNumber(rulesImpact)}&nbsp;<abbr
			title="kilos de gaz à effet de serre en équivalent dioxyde de carbone"
		>
			kCO<sub>2</sub>e
		</abbr>
	</strong>
	{' '} pour {cycleDuration} jours, ou
	<strong>
		{getLocalizedNumber(rulesImpactYear)}&nbsp;<abbr
			title="tonnes de gaz à effet de serre en équivalent dioxyde de carbone"
		>
			tCO<sub>2</sub>e
		</abbr>
	</strong>
	par an. La moyenne annuelle française est de
	<strong>
		1,9&nbsp;tCO<sub>2</sub>e
	</strong>.
</p>
