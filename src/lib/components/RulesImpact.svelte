<script>
	import { mealTypes, cycleDuration, impactLocaleOptions } from '$lib/shared/config';
	import { mealRules } from '$lib/shared/stores';

	$: rulesImpact = getRulesImpact($mealRules);
	$: rulesImpactYear = (rulesImpact / cycleDuration) * 0.365;

	const getRulesImpact = (meals) => {
		return mealTypes?.map((type) => type.impact * meals[type.name]).reduce((p, a) => p + a, 0);
	};
</script>

<p>
	Impact de votre choix de menus&nbsp;:
	<strong>
		{rulesImpact.toLocaleString('fr-FR', impactLocaleOptions)}&nbsp;<abbr
			title="kilos de gaz à effet de serre en équivalent dioxyde de carbone"
		>
			kCO<sub>2</sub>e
		</abbr>
	</strong>
	{' '} pour {cycleDuration} jours, ou
	<strong>
		{rulesImpactYear.toLocaleString('fr-FR', impactLocaleOptions)}&nbsp;<abbr
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
