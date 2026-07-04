<script lang="ts">
  import { createDate } from '$lib/helpers/date-time/createDate';

  type Props = {
    date: string;
  };

  let { date }: Props = $props();
  const now = $derived(createDate());
  const dateMoment = $derived(createDate(date));
  const formattedDate = $derived(
    dateMoment.year !== now.year
      ? createDate(date).format('MMM DD, YYYY')
      : createDate(date).format('MMM DD'),
  );
</script>

<div class="DateFormatted">
  {formattedDate}
</div>

<style lang="scss">
  .DateFormatted {
    min-width: 110px;
  }
</style>
