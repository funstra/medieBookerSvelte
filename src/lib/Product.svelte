<script>
  import {
    contextView,
    currentProduct,
    drawerState,
    products,
    userSettings,
  } from "../store";

  export let product;
  export let n = 0;
  export let outsideRange = false;

  let cancel = false;
  const gracePeriod = 125;
  const pressDuration = 175;
  let x = 0;
  let selecting = false;
  const handleDown =
    /**@param {PointerEvent} pe */
    (pe) => {
      if (!outsideRange) {
        x = 0;
        /**@type {HTMLElement}*/ // @ts-ignore
        const target = pe.target;
        target.setPointerCapture(pe.pointerId);
        selecting = false;
        cancel = false;
        setTimeout(() => {
          selecting = true;
        }, 125);

        const { innerWidth } = window;
        const startX = pe.clientX;
        target.onpointermove = (pe) => {
          x = (startX - pe.clientX) / innerWidth;
          if (x > 0.05) {
            selecting = true;
            products.increment(product.id);
            target.onpointermove = null;
            if ($userSettings.enableVibration) {
              if (n === product.available - 1) {
                navigator.vibrate([5, 100, 50]);
              } else if (n !== product.available) {
                navigator.vibrate([5, 50, 5, 10, 10]);
              }
            }
          } else if (x < -0.05) {
            selecting = true;
            products.decrement(product.id);
            if ($userSettings.enableVibration) {
              if (n === 1) {
                navigator.vibrate([50, 100, 5]);
              } else if (n !== 0) {
                navigator.vibrate([10, 10, 5, 50, 5]);
              }
            }
            target.onpointermove = null;
          }
        };
      }
    };

  const handleCancel =
    /**@param {PointerEvent} pe*/
    (pe) => {};
  const handleUp =
    /**@param {PointerEvent} pe*/
    (pe) => {
      if (!outsideRange) {
        cancel = true;
        x = 0;
        if (!selecting) {
          if ($contextView === "book") {
            $contextView = "bookProduct";
          } else if ($contextView === "bookProduct") {
            if ($currentProduct.id === product.id) {
              $contextView = "book";
            } else {
              $contextView = "bookProduct";
            }
          } else {
            $contextView = "product";
          }
          $currentProduct = product;
          $drawerState = "open";
        }
      }
    };
  let gracing = false;
</script>

<li
  class="product"
  class:selected={n > 0}
  class:gracing
  class:outsideRange
  class:saturated={n === product.available}
  style={`--dur:${pressDuration - gracePeriod}ms`}
  on:pointerdown|stopPropagation={handleDown}
  on:pointercancel|stopPropagation={handleCancel}
  on:pointerup|stopPropagation={handleUp}
>
  <div class="img">
    <img src={product.imgPath} alt="" />
  </div>
  <ul class="info">
    <li>
      <h3>{product.name}</h3>
      <div>{product.category}</div>
    </li>
    <div class="available" style="align-self: end;">
      {product.available}/<span class="n">{n}</span>
    </div>
  </ul>
  {#if outsideRange}
    <p>
      <span>{product.reserved.start.getDate()}</span>/<span
        >{product.reserved.start.getMonth() + 1}</span
      >
    </p>
    <p>
      <span>{product.reserved.end.getDate()}</span>/<span
        >{product.reserved.end.getMonth() + 1}</span
      >
    </p>
  {/if}
  <!-- <div class="available" style="margin-left: auto;align-self: center;">
    {product.available}/{n}
  </div> -->
</li>

<style>
  :global(.open) .product {
    height: 50px;
    font-size: 0.85em;
  }

  .outsideRange {
    position: relative;
    height: 4em !important;
    font-size: 0.75em !important;
    opacity: 0.65;
    margin-left: 5%;
  }
  /* .outsideRange::before {
    content: "x";
    text-align: center;
    vertical-align: middle;
    display: inline;
    line-height: 300%;
    font-family: monospace;
    height: 100%;
    width: 10%;
    order: 0;
    background-color: red;
  } */
  .outsideRange .available {
    display: none;
  }

  .gracing {
    opacity: 0.75;
    filter: brightness(1.125);
  }
  .selected .img {
    --img-col: hsl(var(--good-hue) var(--mid) var(--white));
    padding: 0.25em;
  }
  .saturated .img {
    --img-col: hsl(var(--good-hue) var(--mid) var(--light));
    padding: 0;
  }
  .product.selected {
    --col: hsl(var(--good-hue) var(--saturated) var(--light));
  }

  .product {
    touch-action: pan-y;
    will-change: opacity;
    --img-col: white;
    /* --col: transparent; */
    --col: hsl(var(--secondary-hue) var(--desaturated) var(--light) / 0.25);

    height: 70px;

    display: flex;
    gap: 0.5em;

    overflow: hidden;

    border-radius: 0.25em;

    box-shadow: 0 0 12px 0 hsl(0 0% 0% / 0.0625);

    transition: filter var(--dur), opacity var(--dur);
    border: 0.0625em var(--col) solid;
  }
  .product * {
    pointer-events: none;
  }
  .img {
    height: 100%;
    aspect-ratio: 1/1;

    padding: 0.5em;

    background-color: var(--img-col);
    transition: background-color var(--dur), padding 175ms;
  }
  img {
    mix-blend-mode: multiply;
    object-fit: contain;
  }
  .info {
    height: 100%;

    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    padding: 0.25em;
  }
  .available {
    font-size: 1.5em;
    letter-spacing: -0.1em;
    margin-right: 0.5em;
    margin-bottom: 0.25em;
    color: hsl(0 0% var(--dark));
  }
  .available .n {
    color: hsl(0 0% var(--light));
    font-size: 0.75em;
  }
  .selected .available .n {
    color: hsl(var(--main-hue) var(--mid) var(--light));
  }
  .saturated .available .n {
    font-size: 1em;
  }
  .info > :first-child {
    display: flex;
    justify-content: space-between;
    gap: 1em;
  }
</style>
