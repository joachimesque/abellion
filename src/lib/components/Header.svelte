<script>
	import { base } from '$app/paths';
	import { page } from '$app/stores';

	const site_pages = [
		['/', 'Accueil'],
		['/pourquoi', 'Pourquoi ?'],
		['/comment', 'Comment ?'],
		['/a-propos', 'À propos'],
	];

	let displayMenu = false;
</script>

<a href="#main" class="skip-to-content-link">Sauter au contenu</a>

<header>
	<span class="corner" role="img" title="logo">🧑‍🌾</span>

	<nav>
		<button
			class="mobile-menu"
			id="toggle"
			aria-expanded={displayMenu}
			on:click={() => (displayMenu = !displayMenu)}
		>
			Menu
		</button>

		<ul id="menu" class:active={displayMenu}>
			{#each site_pages as site_page}
				<li>
					<a
						class="menu_item"
						class:active={$page.url.pathname === `${base}${site_page[0]}`}
						on:click={() => (displayMenu = false)}
						sveltekit:prefetch
						href={`${base}${site_page[0]}`}
					>
						{site_page[1]}
					</a>
				</li>
			{/each}
		</ul>
	</nav>
	<div />
</header>

<style>
	.skip-to-content-link {
		position: absolute;
		z-index: 3;
		left: 0;
		top: 0;
		background: RoyalBlue;
		color: white;
		font-size: 1.2rem;
		padding: 1rem 1.4rem;
		transform: translateY(-100%);
		transition: transform 0.3s;
	}

	.skip-to-content-link:focus {
		transform: translateY(0%);
	}

	header {
		display: flex;
		justify-content: space-between;
		position: relative;
	}

	nav {
		flex: 1 0 auto;
	}

	ul {
		display: flex;
		justify-content: center;
		gap: 0.75rem 2rem;
		list-style: none;
		margin: 0;
	}
	ul.active {
		display: flex;
	}

	button.mobile-menu {
		display: none;
		position: absolute;
		right: 0;
		top: -0.25rem;
		padding: 0.25rem 0.5rem;
		border: 1px solid #222;
		border-radius: 0.25rem;
		font-size: 1rem;
		background: transparent;
		color: #222;
	}

	button.mobile-menu:focus,
	button.mobile-menu:hover {
		background: #fff;
		color: #000;
	}

	a.menu_item {
		font-size: 1.2em;
		text-decoration: none;
		color: RoyalBlue;
		white-space: nowrap;

		/* Better affordance */
		padding: 0.375rem 1rem;
		margin: -0.375rem -1rem;
	}

	a.menu_item:hover,
	a.menu_item:focus,
	a.menu_item:active {
		text-decoration: underline;
	}

	a.menu_item.active {
		font-weight: bold;
	}

	@media (max-width: 40rem) {
		button.mobile-menu {
			display: block;
		}
		ul {
			display: none;
			flex-direction: column;
		}
	}
</style>
