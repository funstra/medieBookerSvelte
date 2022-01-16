<script>
  import { userSettings } from "../store";

  import Pill from "./Pill.svelte";
</script>

<div class="user">
  <Pill
    label="Enable vibration"
    state={$userSettings.enableVibration}
    stateHandler={() =>
      ($userSettings.enableVibration = !$userSettings.enableVibration)}
  />
</div>

<style>
  .user {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .user > :global(*) {
    padding: 0.25rem;
    box-shadow: 0 0 12px 0 hsl(0 0% 0% / 0.0625);
    border-radius: 4px;
  }
</style>
