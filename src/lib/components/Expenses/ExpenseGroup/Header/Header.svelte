<script lang="ts">
  import type { ExpenseGroupHeader } from '$lib/stores/expense/getters/group-expenses';
  import Date from './Date.svelte';

  type Props = {
    data: ExpenseGroupHeader;
  };

  let { data }: Props = $props();
</script>

<div class="Header">
  <Date date={data.date} />
</div>

<style lang="scss">
  .Header {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    margin-bottom: var(--dodo-ui-space);
    margin-top: calc(var(--dodo-ui-space) * 2);

    &:first-child {
      margin-top: 0;
    }
  }
</style>
