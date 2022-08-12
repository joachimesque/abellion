export const mealTypes = [
	{
		name: 'vegan',
		pretty_name: 'Végétalien',
		icon: '🌾🥜🥗',
		description: 'Repas sans produits animaux.',
		impact: 0.39,
	},
	{
		name: 'vegetarian',
		pretty_name: 'Végétarien',
		icon: '🥗🍳🧀',
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
		icon: '🍗🥓🧀',
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
		icon: '🐟🍚',
		description: 'Repas avec un filet de poisson blanc.',
		impact: 1.98,
	},
];

export const cycleDuration = 14;
export const mealsPerDay = ['déjeuner', 'dîner'];

export const impactThreshold = 1;

export const impactLocaleOptions = {
	minimumFractionDigits: 2,
	maximumFractionDigits: 2,
};
