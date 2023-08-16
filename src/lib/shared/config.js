export const mealTypes = [
	{
		name: 'vegan',
		pretty_name: 'Végan',
		icon: '🥑🥗',
		description: 'Repas sans produits animaux.',
		impact: 0.39,
	},
	{
		name: 'vegetarian',
		pretty_name: 'Végétarien',
		icon: '🍳🧀',
		description: 'Repas sans chair animale, avec des oeufs ou un peu de fromage.',
		impact: 0.51,
	},
	// {
	// 	name: 'no_vg',
	// 	pretty_name: 'Viandes',
	// 	icon: '🍗🥩🐟',
	// 	description: 'Repas contenant une pièce de viande ou de poisson.',
	// 	impact: 2.68 // moyenne des 4 choix viande
	// },
	{
		name: 'meat_1',
		pretty_name: 'Viande 1',
		icon: '🍗🥓',
		description: 'Repas contenant une pièce de poulet, porc, ou fromage.',
		impact: 1.35,
	},
	{
		name: 'meat_2',
		pretty_name: 'Viande 2',
		icon: '🥩🍖',
		description: 'Repas contenant une pièce de boeuf, veau, ou agneau.',
		impact: 6.29,
	},
	{
		name: 'fish_1',
		pretty_name: 'Poisson 1',
		icon: '🍣🥧',
		description: 'Repas contenant thon, saumon, sardine ou maquereau.',
		impact: 1.11,
	},
	{
		name: 'fish_2',
		pretty_name: 'Poisson 2',
		icon: '🐟🐙',
		description: 'Repas avec un filet de poisson blanc.',
		impact: 1.98,
	},
];

export const mealPresets = {
	vegan: {
		pretty_name: 'Tout végan',
		description: 'Le menu au plus faible impact climatique 💪',
		rules: {
			vegan: 28,
			vegetarian: 0,
			meat_1: 0,
			meat_2: 0,
			fish_1: 0,
			fish_2: 0,
		},
	},
	veg_50_50: {
		pretty_name: '50/50 végé',
		description: 'On réduit la quantité de produits animaux',
		rules: {
			vegan: 14,
			vegetarian: 14,
			meat_1: 0,
			meat_2: 0,
			fish_1: 0,
			fish_2: 0,
		},
	},
	vegetarian: {
		pretty_name: 'Tout végétarien',
		description: 'Un menu sans chair animale !',
		rules: {
			vegan: 0,
			vegetarian: 28,
			meat_1: 0,
			meat_2: 0,
			fish_1: 0,
			fish_2: 0,
		},
	},
	weekender: {
		pretty_name: 'Triche le week-end',
		description: 'Poisson et viande, une fois par semaine',
		rules: {
			vegan: 12,
			vegetarian: 12,
			meat_1: 2,
			meat_2: 0,
			fish_1: 2,
			fish_2: 0,
		},
	},
	flexitarian: {
		pretty_name: 'Flexitarien',
		description: 'Un peu de tout, du moment que l’impact est réduit',
		rules: {
			vegan: 10,
			vegetarian: 10,
			meat_1: 6,
			meat_2: 0,
			fish_1: 2,
			fish_2: 0,
		},
	},
	meatarian: {
		pretty_name: 'Viandard',
		description: 'La moyenne française, aux émissions très élevées',
		rules: {
			vegan: 0,
			vegetarian: 6,
			meat_1: 8,
			meat_2: 8,
			fish_1: 4,
			fish_2: 2,
		},
	},
};

export const vegOptions = ['vegan', 'vegetarian'];
export const nonVegOptions = ['meat_1', 'meat_2', 'fish_1', 'fish_2'];

export const cycleDuration = 14;
export const mealsPerDay = ['déjeuner', 'dîner'];

// Nombre de cycles passés à analyser
export const tallySampleSize = 4;
// Nombre de cycles valides à atteindre pour proposer une amélioration
export const tallyImprovementThreshold = 3;

export const locale = 'fr-FR';
export const impactLocaleOptions = {
	minimumFractionDigits: 2,
	maximumFractionDigits: 2,
};
