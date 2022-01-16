<script>
  import Drawer from "./lib/Drawer.svelte";
  import Listing from "./lib/Listing.svelte";
  import { contextView, drawerState } from "./store";

  $: $drawerState === "close" ? ($contextView = "none") : null;
</script>

<main data-state={$drawerState} data-context={$contextView}>
  <Listing />
  <Drawer />
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
  }
  :global(main > *) {
    padding-left: 1rem;
    padding-right: 1rem;
  }
</style>
