<script lang="ts">
  import type { DateFormatMode } from '$lib/features/settings/types';
  import { createDate } from '$lib/utils/date-time/createDate';

  type Props = {
    class?: string;
    exchangeDate: string;
    dateFormat: DateFormatMode;
  };

  let { class: className = '', exchangeDate, dateFormat }: Props = $props();
  const formattedDate = $derived(createDate(exchangeDate).format(dateFormat));

  const classes = $derived(['ExchageDate', className].filter(Boolean));
</script>

<div class={classes.join(' ')}>Rates as of <b>{formattedDate}</b></div>

<style lang="scss">
  .ExchageDate {
    font-size: 0.9rem;
    color: var(--dodo-color-neutral-600);

    b {
      font-weight: 500;
    }
  }
</style>
