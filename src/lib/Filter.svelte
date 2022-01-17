<script>
  import { filter } from "../store";
  import Pill from "./Pill.svelte";

  const handleUp = (pe) => {
    const li = pe.target.parentElement;
    const _c = li.dataset.category;

    if (_c !== "all") {
      console.log("not all!");
      console.log($filter.categories);
      $filter.categories = $filter.categories.map((c) => {
        if (c.name === "all") {
          console.log("turn all NOT active");
          return { ...c, active: false };
        } else if (c.name === _c) {
          return { ...c, active: !c.active };
        } else {
          return c;
        }
      });
      console.log($filter.categories);
    } else {
      $filter.categories = $filter.categories.map((c) => {
        if (c.name === "all") {
          return { ...c, active: true };
        } else {
          return { ...c, active: false };
        }
      });
    }
  };
</script>

<div class="filter">
  <ul on:pointerup={handleUp}>
    {#each $filter.categories as category}
      <li data-category={category.name} class:selected={category.active}>
        <button>{category.name}</button>
      </li>
    {/each}
  </ul>

  <Pill
    label="show products outside date range"
    state={$filter.showOutsideRange}
    stateHandler={() => ($filter.showOutsideRange = !$filter.showOutsideRange)}
  />
</div>

<style>
  .filter {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .filter > :global(*) {
    padding: 0.25rem;
    box-shadow: 0 0 12px 0 hsl(0 0% 0% / 0.0625);
    border-radius: 4px;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    gap: 1ch;
  }
  li button {
    padding: 1ch;
    background-color: hsl(0 0% var(--white));
    border: 1px currentColor solid;
    border-radius: 3px;
  }
  li.selected button {
    color: hsl(var(--main-hue) var(--saturated) var(--light));
  }
</style>
