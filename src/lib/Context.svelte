<script>
  import { contextView, currentProduct, drawerState } from "../store";
  import Book from "./Book.svelte";
  import Filter from "./Filter.svelte";
  import Sucess from "./Sucess.svelte";
  import User from "./User.svelte";
  const handleBack = (pe) => {
    $drawerState = "open";
    if ($contextView === "bookProduct") {
      $contextView = "book";
    }
  };
  let showReceipt = true;
</script>

<div class="context">
  <div class="inner">
    {#if $contextView == "product" || $contextView == "bookProduct"}
      <ul class="product">
        <li class="name">
          <h3>{$currentProduct.name}</h3>
        </li>
        <li class="category glow">
          {$currentProduct.category}
        </li>
        <li class="description">{$currentProduct.description}</li>
        <!-- <div class="back" on:pointerdown|stopPropagation={handleBack}>
          &ShortDownArrow;
        </div> -->
      </ul>
    {:else if $contextView == "user"}
      <User />
    {:else if $contextView == "filter"}
      <Filter />
    {:else if $contextView == "book"}
      <Book />
    {:else if $contextView == "bookReceipt"}
      {#if showReceipt}
        <Sucess showReceipt={(s) => (showReceipt = s)} />
      {/if}
    {:else}
      <div
        style="display: flex;height: 100%; align-items: center; justify-content: center;"
      >
        <p style="text-align: center; max-width: 35ch;">
          Tap a product to view information
        </p>
      </div>
    {/if}
    {#if $contextView != "bookReceipt"}
      <div class="back" on:pointerdown|stopPropagation={handleBack}>
        &ShortDownArrow;
      </div>
    {/if}
  </div>
</div>

<style>
  :global([data-state="open"]) .context {
    opacity: calc(100% + var(--h, 0%) * 4);
  }
  :global([data-state="full"]) .context {
    opacity: calc(100% + (var(--h, 0%) + 50%) * 4);
  }
  :global([data-state="full"]) .back {
    /* display: block; */
    opacity: 1;
  }
  .context {
    /* display: flex;
    flex-direction: column;
    justify-content: space-between; */
    opacity: var(--h, 0%);
    font-size: 0.5em;
    height: 100%;
    /* padding: 1rem; */
  }
  .context .inner {
    background-color: hsl(0 0% 100% / 0.45);
    height: 100%;
    padding: 0.5em;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .product {
    height: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, max-content) 1fr;
  }
  .product .name {
    white-space: nowrap;
    grid-column: 1/2;
    align-self: center;
  }
  .product .category {
    grid-column: 3/4;
    align-self: center;
    justify-self: end;
  }
  .product .category {
    width: max-content;
    padding: 0.25em 0.35em;

    border-radius: 0.25em;
  }
  .back {
    pointer-events: all;
    transition: opacity 175ms ease-out;
    opacity: 0;
    font-size: 2em;
    align-self: end;
    justify-self: end;
    grid-column: 1/-1;
    padding-bottom: 0.25em;
  }
  :global(.glow) {
    /* --color: hsl(var(--main-hue) var(--saturated) var(--light) / 0.9);
    --shadow: hsl(var(--main-hue) var(--saturated) var(--light) / 0.3);
    --color1: hsl(var(--main-hue) var(--saturated) var(--light) / 0.5);
    --color2: hsl(var(--secondary-hue) var(--saturated) var(--light) / 0.9);
    --shadow2: hsl(var(--secondary-hue) var(--saturated) var(--light) / 0.3); */

    /* background: linear-gradient(
      to bottom right,
      var(--color),
      var(--color1),
      var(--color2)
    ); */
    /* background-image: linear-gradient(
      145deg,
      hsl(215deg 90% 70%) 0%,
      hsl(282deg 66% 76%) 25%,
      hsl(338deg 100% 79%) 50%,
      hsl(16deg 100% 77%) 75%,
      hsl(40deg 90% 70%) 100%
    );
    box-shadow: -4px -2px 16px 4px hsl(215deg 80% 85% / 0.9),
      4px 2px 16px 4px hsl(40deg 80% 85% / 0.9); */
  }
  .product .description {
    margin-top: 2em;
    grid-column: 1/-1;
  }
</style>
