<script>
  import { dateRange } from "../store";

  const monthName = (i) =>
    [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ][i];

  const today = new Date();
  let startDate = new Date();
  let endDate = new Date();
  endDate.setDate(endDate.getDate() + 1);

  const handleStart = (e) => {
    startDate = new Date(e.target.value);
    if (endDate < startDate) {
      const d = new Date(startDate);
      d.setDate(d.getDate() + 1);
      endDate = d;
    }
    $dateRange.start = startDate;
  };
  const handleEnd = (e) => {
    endDate = new Date(e.target.value);
    $dateRange.end = endDate;
  };
</script>

<div class="date">
  <label>
    <div
      data-date={`${startDate.getDate()}/${monthName(startDate.getMonth())}`}
    />
    <input
      type="date"
      min={today.toLocaleDateString("en-ca")}
      on:input={handleStart}
    />
  </label>
  &rightarrow;
  <label>
    <div data-date={`${endDate.getDate()}/${monthName(endDate.getMonth())}`} />
    <input
      type="date"
      min={today.toLocaleDateString("en-ca")}
      on:input={handleEnd}
    />
  </label>
</div>

<style>
  .date {
    display: flex;
    align-items: center;

    font-weight: 1000;
    font-size: 0.45em;
    gap: 0.5em;
  }
  .date label [data-date]::after {
    content: attr(data-date);
  }
  .date input {
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
  }
</style>
