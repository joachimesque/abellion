<script>
	import { base } from '$app/paths';
	import { mealTypes, tallySampleSize, tallyImprovementThreshold } from '$lib/shared/config';
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

	<p>
		Au fur et à mesure de votre utilisation de l’outil, vous allez peut-être faire évoluer votre
		alimentation. Dans le cas où vous réduisez votre consommation de viande pendant au moins {tallySampleSize}
		sur les {tallyImprovementThreshold} derniers cycles, une section apparaît pour vous montrer les types
		de repas que vous n’avez pas consommés. Cette section présente en outre les gains en matière d’impact
		carbone sur votre alimentation si vous changez vos objectifs.
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
					>kCO<sub>2</sub>e</abbr
				>)&nbsp;:
				{meal.description}
			</li>
		{/each}
	</ul>

	<h2 id="limites">Les limites</h2>

	<h3 id="petits-gestes">
		Les petits gestes ne sont pas une fin en soi
		<br />
		<small>(mais ils sont absolument nécessaires)</small>
	</h3>

	<p>
		Le débat autour de l’utilité des “petits gestes” individuels revient souvent quand on discute
		d’environnement. Évidemment, adopter un régime végétal est bien une action individuelle, les
		végan·es ou végétarien·nes ne s’y trompent pas&nbsp;: la première action, c’est d’arrêter de
		consommer des produits animaux. Un·e activiste pour le bien-être animal qui ne changerait pas
		son alimentation pour être raccord avec ses idées et paroles serait la risée de la société. Ce
		“petit geste” est primordial, sans quoi il serait hypocrite de dénoncer quoi que ce soit sur le
		sujet. C’est aussi une action qui montre l’exemple&nbsp;: j’y arrive, donc c’est possible et je
		peux te montrer comment y arriver.
	</p>

	<p>
		En revanche, la portée des actions individuelles est limitée. Le rapport <a
			href="https://www.carbone4.com/publication-faire-sa-part"
			>Faire sa part&nbsp;? du cabinet Carbone 4</a
		> le montre bien, 75&nbsp;% de la réduction nécessaire de l’impact de nos modes de vie ne peuvent
		être entrepris que par l’action collective de la société. Si on s’en tient à nos “petits gestes”
		on ne fera pas grand chose—mais si on ne fait même pas cet effort, nos revendications ne pourront
		pas être prises au sérieux, nos alternatives continueront à être ignorées. Les actions individuelles
		ou de grande envergure ne sont pas incompatibles, bien au contraire.
	</p>

	<p>
		Une fois qu’on a dépassé cette opposition, il faut construire là-dessus. Pour ça, deux actions
		sont plus grandes que les petits gestes mais accessibles à tout le monde. D’une part il faut
		parler des crises environnementales provoquées par nos sociétés, et convaincre d’autres
		personnes d’adopter eux aussi des actions en faveur de l’environnement&nbsp;; c’est pour ça que
		donner l’exemple est si important. D’autre part il faut s’engager dans les collectifs, les
		actions, le monde politique, etc. C’est dans ces contextes-là, quand beaucoup de monde se
		rassemble, que les rapports de force se font. Et c’est seulement des rapports de force en notre
		faveur qui pourront faire avancer les choses.
	</p>

	<h3 id="technologie">
		La technologie ne nous sauvera pas
		<br />
		<small>(mais elle peut faciliter certaines choses)</small>
	</h3>

	<p class="big">
		Il faut se méfier des solutions technologiques. Les problèmes environnementaux actuels
		proviennent des systèmes économiques et sociaux qui sous-tendent nos vies (même le
		<abbr title="Groupe International d’Experts sur le Climat">GIEC</abbr> le dit)&nbsp;; ces
		problèmes ne pourront pas être résolus avec une énième app ou un énième concept tech qui ne
		remet pas radicalement en cause le <em>status quo</em>.
	</p>

	<p>
		Ce n’est pas ce site qui va changer la donne. Mais qui sait, peut-être qu’il pourra vous
		accompagner vers un régime moins carné, voire végétarien ou végan. Et à partir de là, quelles
		sont les questions que vous vous poserez sur les autres facteurs d’émissions dont vous êtes (au
		moins un petit peu) responsables&nbsp;?
	</p>

	<h2>Mention sur l’hébergement du site et vos données</h2>

	<p>
		Ce site est hébergé chez Infomaniak,
		<a href="https://www.infomaniak.com/fr/ecologie"
			>un hébergeur engagé sur les questions écologiques</a
		>.<br />
		Les fichiers sont statiques, les ressources côté serveur sont gardées au minimum. L’application ne
		transmet pas de données. Le service n’utilise aucun traçage des visites, aucun mouchard ni aucune
		requête auprès d’un quelconque service en ligne. L’industrie de la surveillance sur Internet est
		une cause du poids extrême des sites web, d’une quantité énorme de transmission et de traîtement
		d’informations personnelles destinées à être revendues aux enchères aux annonceurs de publicité les
		plus offrants. C’est avec fierté que ce site ne participe pas à ces systèmes parasites trop gourmands
		en énergie et en matériel.
	</p>
</div>

<style>
</style>
