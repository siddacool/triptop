<script lang="ts">
  import { createDate } from '$lib/helpers/date-time/createDate';

  type Props = {
    date: string;
  };

  function getFormattedDate(value: string) {
    const moment = createDate(value);
    const now = createDate();

    if (now.year() !== moment.year()) {
      return moment.format('ddd, MMM D, YYYY');
    }

    return moment.format('ddd, MMM D');
  }

  let { date }: Props = $props();
  let formattedDate = $derived(getFormattedDate(date));
</script>

<div class="Date">{formattedDate}</div>

<style lang="scss">
  .Date {
    color: var(--dodo-color-neutral-700);
    margin-bottom: var(--dodo-ui-space);
  }
</style>
