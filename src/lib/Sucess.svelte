<script>
  import { contextView, drawerState, products } from "../store";

  import { onMount } from "svelte";

  export let showReceipt = (s) => null;
  onMount(() => {
    setTimeout(() => {
      showReceipt(false);
      $drawerState = "close";
      $contextView = "none";
      setTimeout(() => {
        showReceipt(true);
      }, 200);
      products.reset();
    }, 1950);
  });
</script>

<div style="margin-block: auto; display: flex; justify-content: center;">
  <svg
    width="75%"
    height="100%"
    viewBox="0 0 262 262"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style="overflow: visible;"
  >
    <style>
      @keyframes fade-in {
        from {
          opacity: 0;
          transform: scale(1);
        }

        to {
          opacity: 1;
          transform: scale(1.15);
        }
      }

      @keyframes stroke-grow {
        from {
          stroke-width: 20;
          stroke-opacity: 1;
        }

        to {
          stroke-width: 40;
          stroke-opacity: 0.9;
          r: 120;
        }
      }

      @keyframes fade-out {
        from {
          opacity: 1;
          transform: scale(1.15);
        }
        80% {
          opacity: 0.75;
          transform: scale(1);
        }
        100% {
          opacity: 0;
          transform: scale(0.5);
        }
      }

      g {
        --color0: hsl(var(--good-hue) var(--saturated) var(--light));
        --color1: hsl(var(--good-hue) var(--saturated) var(--white));
        transform-origin: center;
        animation: fade-in 300ms 200ms forwards, fade-out 300ms 1600ms forwards;
      }
      .outer {
        animation: stroke-grow 600ms 500ms forwards;
      }
    </style>
    <g opacity="0">
      <circle cx="131" cy="131" r="100" fill="var(--color0,#61CC3D)" />
      <path
        d="M122.348 166.723C124.689 166.723 126.515 165.81 127.785 163.905L164.935 106.434C165.887 105.006 166.244 103.735 166.244 102.505C166.244 99.3696 163.942 97.1073 160.727 97.1073C158.505 97.1073 157.155 97.9011 155.806 100.044L122.189 153.308L104.964 131.478C103.654 129.851 102.304 129.137 100.36 129.137C97.1051 129.137 94.7634 131.439 94.7634 134.614C94.7634 136.003 95.2397 137.313 96.3907 138.702L116.95 164.024C118.458 165.889 120.125 166.723 122.348 166.723Z"
        fill="white"
      />
      <circle
        class="outer"
        cx="131"
        cy="131"
        r="110"
        fill="none"
        stroke-width="20"
        stroke="var(--color1,#DAF2DC)"
      />
    </g>
  </svg>
</div>
