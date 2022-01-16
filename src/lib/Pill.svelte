<script>
  import { filter } from "../store";
  export let state = true;
  export let label = null;
  export let stateHandler = () => null;
</script>

<div class="outer" class:checked={state} on:pointerdown={stateHandler}>
  {#if label}
    <p>{label}</p>
  {/if}
  <div class="pill">
    <div class="on">on</div>
    <div class="circle" />
    <div class="off">off</div>
  </div>
</div>

<style>
  .outer {
    display: flex;
    /* width: max-content; */
    justify-content: space-between;
    align-items: center;
    gap: 0.5em;
  }
  p {
    max-width: 20ch;
  }

  .pill {
    --h: 2.5em;
    --padding: 0.1;
    --hue: var(--good-hue);

    position: relative;

    height: var(--h);
    width: calc(var(--h) * 2);

    /* font-size: 32px; */
    text-transform: uppercase;

    border-radius: 50%/100%;
    background-color: hsl(var(--hue) 0% 92.5%);
    color: hsl(var(--hue) 0% 40%);

    cursor: pointer;
    user-select: none;
    transition: all 50ms;

    -webkit-tap-highlight-color: transparent;
  }
  :global(.checked) .pill {
    background-color: hsl(var(--hue) 50% 70%);
    color: hsl(var(--hue) 80% 95%);
  }

  .pill > * {
    position: absolute;
  }

  .pill .off,
  .pill .on {
    top: calc(50% - 0.5em);
    transform: scaleY(0.9);
  }
  .pill .on {
    letter-spacing: 0.1ch;
  }
  .pill .off {
    letter-spacing: -0.1ch;
  }
  :global(.checked) .pill .off {
    display: none;
  }
  .pill .off {
    right: 1ch;
  }
  :global(.checked) .pill .on {
    display: block;
  }
  .pill .on {
    display: none;
    left: 1.25ch;
  }

  :global(.checked) .pill .circle {
    left: calc((100% - var(--padding) * 50%) - (var(--h) * var(--c-h)));
    background-color: hsl(var(--hue) 50% 90%);
  }

  .pill .circle {
    --c-h: calc(0.9 - var(--padding));

    height: calc(var(--c-h) * 100%);
    left: calc(100% * var(--padding) / 2);
    top: 50%;
    transform: translate(0%, -50%);

    aspect-ratio: 1/1;

    border-radius: 50%;
    background-color: hsl(var(--hue) 0% 80%);

    transition: all 125ms;
  }
</style>
