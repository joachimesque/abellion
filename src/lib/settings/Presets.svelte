<script>
  import { mealPresets } from '$lib/shared/config';
  import { mealRules } from '$lib/shared/stores';

  const handlePreset = (rule) => () => mealRules.set(rule)
</script>


<details>
  <summary>
    Ou adoptez un pré-réglage
  </summary>
  <ul class="presets gaufrier">
    {#each Object.values(mealPresets) as mealPreset}
      <li>
        <button on:click={handlePreset(mealPreset.rules)}>
          {mealPreset.pretty_name}
        </button>
        <br />
        {mealPreset.description}
      </li>
    {/each}
  </ul>
</details>


<style>
  details {
    padding: 0.6rem 1rem;
    margin-block: 1rem;
  }

  details[open] {
    background-color: cornsilk;
  }

  summary {
    cursor: pointer;
  }

  .presets {
    list-style: none;
    padding: 0;
  }

  .presets li {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
</style>
