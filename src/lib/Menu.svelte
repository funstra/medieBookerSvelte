<script>
  import {
    contextView,
    drawerState,
    lockDrawer,
    productsSelected,
  } from "../store";
  import Datepicker from "./Datepicker.svelte";

  const handleUp = (pe) => {
    // console.log(lockMenu);
    if (!$lockDrawer) {
      console.log('drawer aint locked');
      const { view } = pe.target.dataset;
      if ($drawerState == "close") {
        $drawerState = "open";
        $contextView = view;
      } else {
        if ($contextView == view) {
          $drawerState = "close";
        } else {
          $contextView = view;
        }
      }
    }
  };
  const handleDown = (pe) => {
    // lockMenu = false;
    // setTimeout(() => {
    //   lockMenu = true;
    // }, 175);
  };
  // let lock = false;
  export let lockMenu = false;
  $: selected = $productsSelected ? true : false;
</script>

<div class="menu" class:selected>
  <Datepicker />
  <nav>
    <ul on:pointerdown={handleDown} on:pointerup|stopPropagation={handleUp}>
      <li data-view="user">&#xe001</li>
      <li data-view="filter">&#xe002</li>
      <div class="book">
        <li data-view="book">&#xe003</li>
      </div>
    </ul>
  </nav>
</div>

<style>
  :global([data-state="full"]) .menu {
    font-size: 0.85em;
    opacity: 0.5;
    display: none;
  }
  :global([data-context="user"]) [data-view="user"] {
    color: hsl(var(--main-hue) var(--saturated) var(--light));
  }
  :global([data-context="filter"]) [data-view="filter"] {
    color: hsl(var(--main-hue) var(--saturated) var(--light));
  }
  :global([data-context="book"]) [data-view="book"],
  :global([data-context="bookProduct"]) [data-view="book"] {
    color: hsl(var(--main-hue) var(--saturated) var(--light));
  }
  .menu {
    display: flex;
    justify-content: space-between;
  }

  nav {
    height: 100%;
    font-family: icons;
    font-size: 0.9em;
  }
  ul {
    height: 100%;

    display: flex;
    gap: 1rem;
    align-items: center;
  }
  nav li {
    height: 1em;
    pointer-events: all;
  }
  nav .book {
    position: relative;
  }
  .selected .book::after {
    opacity: 1;
  }
  nav .book::after {
    opacity: 0;
    position: absolute;
    width: 0.35em;
    aspect-ratio: 1/1;
    /* left: 10%; */
    right: -2.5%;
    /* top: 10%; */
    bottom: -2.5%;
    content: "";
    border-radius: 50%;
    background-color: hsl(var(--good-hue), var(--saturated), var(--light));
  }
</style>
