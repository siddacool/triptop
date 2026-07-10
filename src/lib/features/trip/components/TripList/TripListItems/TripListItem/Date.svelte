<script lang="ts">
  import { createDate } from '$lib/utils/date-time/createDate';

  type Props = {
    date: number;
  };

  function formatDate(input: number) {
    const now = createDate();
    const moment = createDate(input);

    if (now.year() === moment.year()) {
      return moment.format('MMM D');
    }

    return moment.format('MMM D, YYYY');
  }

  let { date }: Props = $props();
  const formattedDate = $derived(formatDate(date));
</script>

<div class="Date">
  {formattedDate}
</div>

<style lang="scss">
  .Date {
    display: flex;
    justify-content: flex-end;
    font-size: 0.88rem;
    color: var(--dodo-color-neutral-500);
  }

  :global(.dodo-theme--dark .TripListItem .Date) {
    color: var(--dodo-color-neutral-600);
  }
</style>
