<script>
  import { fix_and_destroy_block } from "svelte/internal";
  import {
    categories,
    contextView,
    dateRange,
    drawerState,
    filter,
    filteredProducts,
    products,
    selectedProducts,
  } from "../store";
  import Product from "./Product.svelte";
</script>

<section class:open={$drawerState == "open" || $drawerState == "full"}>
  <div class="inner">
    <ul class="products">
      {#if $contextView === "book" || $contextView === "bookProduct"}
        {#each $products as { product, n } (product.id)}
          {#if n > 0}
            <Product {product} {n} />
          {/if}
        {/each}
      {:else}
        {#each $filteredProducts as { product, n, include, outsideRange } (product.id)}
          {#if !outsideRange}
            <Product {product} {n} />
          {:else if include}
            <Product {product} outsideRange={true} />
          {/if}
        {/each}
      {/if}
    </ul>
  </div>
</section>

<style>
  section {
    position: relative;

    flex-grow: 1;
    flex-basis: 0;

    overflow-y: hidden;

    touch-action: pan-y;
    user-select: none;

    background-color: hsl(0 0% var(--white));
  }
  section::after,
  section::before {
    position: absolute;
    content: "";
    width: 100%;
    height: 2rem;
    pointer-events: none;
  }
  section::after {
    left: 0;
    top: 0;
    background: linear-gradient(white, transparent);
  }
  section::before {
    z-index: 10;
    left: 0;
    bottom: 0;

    background: linear-gradient(to top, white, transparent);
  }
  .inner {
    height: 100%;
    overflow: scroll;
  }

  .products {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;

    padding-top: 1.5rem;
    padding-bottom: 1rem;
  }
</style>
