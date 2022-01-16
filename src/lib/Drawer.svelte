<script>
  import Menu from "./Menu.svelte";
  import Context from "./Context.svelte";
  import { contextView, drawerState, lockDrawer } from "../store";

  // on pointer down - - - -
  const handleDown =
    /**@param {PointerEvent} pe*/
    (pe) => {
      /**@type {HTMLElement}*/ // @ts-ignore
      const { target } = pe;
      const { pointerId } = pe;

      target.setPointerCapture(pointerId);

      const { innerHeight } = window;
      const { clientY: startY } = pe;

      let y = 0;

      // on pointer move - - - -
      target.onpointermove =
        /** @param {PointerEvent} pe */
        (pe) => {
          // fraction of movment across screen
          y = (startY - pe.clientY) / innerHeight;
          h = y * 100;
        };

      // on pointer up - - - -
      target.onpointerup = (pe) => {
        if (Math.abs(y) > 0.025) {
          lockMenu = true;
          $lockDrawer = true;
          console.log("LOCKING : in drawer", $lockDrawer);
          setTimeout(() => {
            $lockDrawer = false;
          }, 50);
        } else {
          lockMenu = false;
          console.log("UNLOCKING : in drawer", $lockDrawer);
          $lockDrawer = false;
        }

        switch ($drawerState) {
          case "close":
            if (y > 0.2) {
              $drawerState = "full";
            } else if (y > 0.05) {
              $drawerState = "open";
            }
            break;
          case "open":
            if (y > 0.05) {
              $drawerState = "full";
            } else if (y < -0.05) {
              $drawerState = "close";
            }
            break;
          case "full":
            if (y < -0.2) {
              $drawerState = "close";
            } else if (y < -0.05) {
              $drawerState = "open";
              if ($contextView === "bookProduct") {
                $contextView = "book";
              }
            }
            break;
        }

        h = 0;
        target.releasePointerCapture(pointerId);
        target.onpointerup = null;
        target.onpointermove = null;
      };
    };

  // component vars - - - -
  const easeDuration = 95;
  let ease = false;
  let h = 0;
  let lockMenu = false;

  // react to drawer state - - - -
  $: {
    $drawerState;
    // toggle ease css class - -
    ease = true;
    setTimeout(() => {
      ease = false;
    }, easeDuration);
  }
</script>

<section
  on:pointerdown|stopPropagation={handleDown}
  class:ease
  style={`--h:${h}%; --dur:${easeDuration}ms`}
>
  <Menu {lockMenu} />
  <Context />
</section>

<style>
  :global([data-state="open"]) section {
    height: calc(50% + var(--h, 0%));
  }
  :global([data-state="full"]) section {
    height: calc(100% + var(--h, 0%));
  }
  .ease {
    transition: height var(--dur) cubic-bezier(0.75, 0.25, 0.5, 1.25);
  }
  section {
    will-change: height;

    box-sizing: content-box;
    height: calc(1em + var(--h, 0%));

    display: flex;
    flex-direction: column;
    gap: 0.25em;

    font-size: 2.5rem;
    vertical-align: middle;

    padding-top: 0.25em;
    padding-bottom: 0.25em;

    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;

    --color: hsl(var(--main-hue) var(--saturated) var(--light) / 0.8);
    border: var(--color) 2px solid;
    border-left-width: 1px;
    border-right-width: 1px;
    border-bottom: none;
    background-color: hsl(0, 0%, var(--white));

    touch-action: none;
    user-select: none;
  }
  section :global(*) {
    /* pointer-events: none; */
  }
</style>
