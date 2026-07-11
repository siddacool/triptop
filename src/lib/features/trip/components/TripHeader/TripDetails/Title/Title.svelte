<script>
  import ArchivedTag from '$lib/components/ArchivedTag/ArchivedTag.svelte';
  import { tripDetailStore } from '$lib/features/trip/store/detail.svelte';
  import Name from './Name.svelte';
</script>

<div class="Title">
  <Name />

  {#if tripDetailStore.trip?.archived}
    <ArchivedTag />
  {/if}
</div>

<style lang="scss">
  .Title {
    display: flex;
    align-items: center;
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-right: 4px;

    :global(.ArchivedTag) {
      margin-left: var(--dodo-ui-space);
    }
  }
</style>
