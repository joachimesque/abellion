<script>
	import { base } from '$app/paths';
	import { impactLocaleOptions, mealTypes } from '$lib/shared/config';
	import { getLocalizedNumber } from '$lib/shared/utils';
</script>

<svelte:head>
	<title>À propos — Abellion 🧑‍🌾</title>
</svelte:head>

<div class="content">
	<h1>À propos</h1>

	<h2 id="l-outil">L’outil</h2>

	<p class="big">
		Abellion a pour but de vous aider à garder trace de vos repas, pour arriver à réduire leur
		impact carbone—et donc votre empreinte environnementale.
	</p>

	<p>
		On ne va pas se mentir&nbsp;: les régimes alimentaires venant de produits animaux ont un impact
		bien supérieur aux régimes alimentaires limités aux seuls produits végétaux. Pour réduire
		l’impact climatique de nos assiettes, il faut réduire autant que possible notre consommation de
		produits venant des animaux. Mais le climat n’est pas la seule raison, comme le montre la page <a
			href={`${base}/pourquoi`}>Pourquoi c’est important de manger moins de viande&nbsp;?</a
		>
	</p>

	<p>
		Une fois qu’on perçoit l’urgence de réduire sa consommation de viande, par quel bout est-ce
		qu’il vaut mieux s’y prendre&nbsp;? Les produits animaux font tellement partie de notre culture
		que ça peut paraître impossible à éliminer de nos menus. Pour ça, il y a plein de pistes à
		explorer—et cet outil Abellion n’en est qu’une. Pour tout savoir, visitez la page <a
			href={`${base}/comment`}>Comment manger moins de viande</a
		>
	</p>

	<h2 id="aide">Aide</h2>

	<p class="big">
		L’application Abellion fonctionne dans deux modes différents.<br />
		Le mode <strong>Aperçu</strong> sert à estimer votre consommation actuelle, tandis que le mode
		<strong>Suivi</strong>
		vous permet de définir des règles, et de voir si vous vous y tenez.<br />Sous le calendrier, les
		six repas apparaissent avec le score, qui varie selon le mode actif.
	</p>

	<h3 id="le-mode-apercu">Le mode "Aperçu de vos repas"</h3>

	<p>
		C’est le mode par défaut lorsque vous découvrez l’application. Il vous permet de faire le point
		sur votre alimentation, et son impact climatique.
	</p>

	<p>
		Au chargement de la page, vous découvrez le calendrier&nbsp;: celui-ci déroule deux semaines
		passées et deux semaines à venir, pour vous permettre de renseigner vos repas.<br />
		Pourquoi l’avenir&nbsp;? C’est pour se projeter, et mieux prévoir&nbsp;; au cas où il y a une soirée
		sushi dans la semaine ou un week-end chez l’oncle boucher, ou alors pour planifier les courses ou
		les repas cuisinés en avance…
	</p>

	<p>
		Le bloc de résultats présente le total de repas renseignés pendant la période affichée, ces
		repas sont classés par types. Sous ces résultats, vous pourrez découvrir l’impact total des
		repas renseignés.
	</p>

	<h3 id="le-mode-suivi">Le mode "Suivi de vos objectifs"</h3>

	<p>
		Une fois que vous avez une petite idée de votre alimentation, vous voudrez peut-être réduire son
		impact. C’est à ça que sert le mode de suivi des objectifs.<br />Le principe repose sur des
		objectifs que vous vous fixez pour une durée de deux semaines. En renseignant votre alimentation
		tous les jours, vous pourrez voir les types de repas qui sont possibles pour le reste du cycle.
	</p>

	<p>
		Pour démarrer ce mode, cliquez sur le bouton "Réglages" au dessus du calendrier, puis renseignez
		les règles que vous désirez suivre. Une fois qu’il ne reste pas de repas à sélectionner, le
		bouton "Commencez à remplir votre calendrier" s’active. Au clic de ce bouton, un nouveau cycle
		commence au jour même, vous êtes dans le mode de suivi de vos objectifs. Un bouton est présent
		dans les réglages pour revenir au mode d’aperçu de vos repas.
	</p>

	<p>
		Le bloc de résultats présente les repas à consommer pendant le reste du cycle pour respecter vos
		objectifs. Sous ces résultats, vous verrez l’impact de ces repas à l’échelle du cycle, comparé
		au total prévu par vos objectifs.
	</p>

	<h3 id="les-repas">Les repas en détail</h3>

	<p>
		Chaque jour du calendrier présente deux repas, et chaque repas offre le choix de six menus. Deux
		des menus sont végétariens, deux sont à base de viande et deux à base de poisson. Les menus à
		base de viande ou de poisson sont doublés à cause des émissions différentes selon le type
		d’animal. Ces repas ont été <a
			href="https://bilans-ges.ademe.fr/documentation/UPLOAD_DOC_FR/index.htm?repas.htm"
			>modélisés par l’ADEME</a
		>
		et
		<a href="https://nosgestesclimat.fr/documentation/alimentation/plats"
			>adaptés pour l’outil Nos Gestes Climat</a
		>.
	</p>

	<p>La liste des repas&nbsp;:</p>

	<ul>
		{#each mealTypes as meal}
			<li>
				<span role="img" title="">{meal.icon}</span>
				<strong>{meal.pretty_name}</strong>
				({getLocalizedNumber(meal.impact)}&nbsp;<abbr
					title="kilos de gaz à effet de serre en équivalent dioxyde de carbone"
				>kCO<sub>2</sub>e</abbr>)&nbsp;:
				{meal.description}
			</li>
		{/each}
	</ul>

	<h2>
		La technologie ne nous sauvera pas
		<br />
		<small>(mais elle peut rendre certaines choses plus faciles)</small>
	</h2>

	<p class="big">
		Méfiez-vous des solutions technologiques. Les problèmes environnementaux actuels proviennent des
		systèmes économiques et sociaux qui sous-tendent nos vies (même le
		<abbr title="Groupe International d’Experts sur le Climat">GIEC</abbr> le dit)&nbsp;; ces
		problèmes ne pourront pas être résolus avec une énième app ou un énième concept tech qui ne
		remet pas radicalement en cause le <em>status quo</em>.
	</p>

	<p>
		Ce n’est pas ce site qui va changer la donne. Mais qui sait, peut-être qu’il pourra vous
		accompagner vers un régime moins carné, voire végétarien ou vegan. Et à partir de là, quelles
		sont les questions que vous vous poserez sur les autres facteurs d’émissions dont vous êtes (au
		moins un petit peu) responsables&nbsp;?
	</p>

	<p>
		Ce site est hébergé chez Infomaniak,
		<a href="https://www.infomaniak.com/fr/ecologie"
			>un hébergeur engagé sur les questions écologiques</a
		>.<br />
		Les fichiers sont statiques, les ressources côté serveur sont gardées au minimum. L’application ne
		transmet pas de données. Aucun traçage des visites, aucun mouchard ni aucune requête auprès d’un
		quelconque service en ligne.
	</p>
</div>

<style>
</style>
