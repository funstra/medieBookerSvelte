<script>
  import {
    contextView,
    drawerState,
    lockDrawer,
    productsSelected,
  } from "../store";

  const handleBook = (pe) => {
    // Dont know what to do about svelte store race condition, timeout 1ms to let $lockDrawer set
    setTimeout(() => {
      if (!$lockDrawer) {
        $drawerState = "full";
        $contextView = 'bookReceipt'
      }
    }, 1);
  };
</script>

<div class="book">
  {#if $productsSelected}
    <div>
      <p style="text-align: center; max-width: 25ch; line-height: 1em;">
        Tap a product to view booking information <br /> <br /> <br />
        or tap<span
          on:pointerup|stopPropagation={handleBook}
          style=" letter-spacing: -0.3ch; margin-right: 0.1ch; font-family: icons; font-size: 5em; vertical-align: middle; color: hsl(var(--good-hue) var(--saturated) var(--light));"
          >&#xe004</span
        > to book
      </p>
    </div>
  {:else}
    <p>No products selected</p>
    <p>
      Swipe a product
      <span style="font-size: 1.5em; vertical-align: middle; ">&larr;</span>
      in the
      <span
        on:pointerup={() => {
          if (!$lockDrawer) {
            $drawerState = "close";
            $contextView = "none";
          }
        }}
        style="font-size: 1.125em; text-decoration: underline; color: hsl(var(--main-hue) var(--saturated) var(--light)); text-transform: uppercase; font-weight: 1000;"
        >list</span
      >
    </p>
  {/if}
</div>

<style>
  .book {
    display: flex;
    flex-direction: column;
    gap: 0.25em;
    height: 100%;

    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
  }
</style>
