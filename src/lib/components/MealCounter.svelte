<script>
	export let mealType;
	export let count;
	export let alert = false;
</script>

<p class="block">
	<span class="icon" aria-hidden="true">{mealType.icon}</span>
	<br />
	<span class="name">{mealType.pretty_name}</span>
	<br />
	<strong class="number" class:alert>{@html count}</strong>
	<details>
		<summary> Détails </summary>
		<div>{mealType.description}</div>
	</details>
</p>

<style>
	.block {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 0;
	}

	.icon {
		font-size: 2rem;
	}
	.name {
	}
	.number {
		font-size: 3rem;
	}
	.number.alert {
		color: orangered;
	}
	.number :global(span:first-of-type) {
		font-size: 2.6rem;
		vertical-align: top;
	}
	.number :global(span:last-of-type) {
		font-size: 2rem;
		vertical-align: bottom;
	}
	summary {
		text-align: center;
	}
</style>
