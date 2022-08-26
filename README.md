# 🧑‍🌾 Abellion

Une toute petite web app pour avoir un aperçu de vos habitudes alimentaires et vous aider à suivre des objectifs de réduction de produits animaux.

## À propos

L’alimentation est un des leviers les plus pertinents de réduction de ses émissions personnelles de gaz à effet de serre. L’application web Abellion propose un calendrier qui permet de renseigner ses repas au fur et à mesure. Dans un premier temps ça permet d’avoir un aperçu de ses habitudes de consommation de produits animaux (viande, poisson, fromage, œufs, etc.), puis dans un second temps vous pouvez définir un budget “repas végétaux” avec des objectifs à fixer et à respecter dans chaque type de repas, par cycles de deux semaines.

Les concepts et ressources techniques sont référencés sur le [Wiki du projet](https://github.com/joachimesque/abellion/wiki).

Les prochains développements sont renseignés dans le fichier [TODO.md](TODO.md).

## Technologie

Cette app a été bâtie avec [SvelteKit](https://kit.svelte.dev/), qui utilise [Vite](https://vitejs.dev/) pour la compilation.

### Développement

Une fois le projet cloné en local et les dépendances installées avec `npm i`, démarrez le serveur de développement :

```bash
npm run dev
```

Puis pointez votre navigateur à l’adresse `http://127.0.0.1:5173/`

### Compilation

Pour créer la version de production de l’application :

```bash
npm run build
```

Vous pouvez prévisualiser le build de production avec la commande `npm run preview`.

## Contributions

L’app est créée pour un public français, étant donné qu’elle est basée sur des chiffres d’évaluation d’émissions pour la France (via l’ADEME). La documentation est rédigée en français, pour permettre au plus grand nombre de francophones de découvrir l’outil et de se sentir invité·es à y participer en émettant des remarques (Issues) ou en contribuant du code (PR). Les échanges peuvent se faire en français, mais l’anglais sera bien sûr accepté.

Le code lui-même, les commentaires et les messages de commits resteront en anglais.

All internationalization/translation initiatives are welcome.

## License

Ce programme est partagé sous la licence [GNU General Public License v3.0](https://choosealicense.com/licenses/gpl-3.0/).
