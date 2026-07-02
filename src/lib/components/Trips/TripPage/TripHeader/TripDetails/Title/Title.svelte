<script>
  import ArchivedTag from '$lib/components/ui/ArchivedTag/ArchivedTag.svelte';
  import { useTripStore } from '$lib/stores/trip/individual.svelte';
  import Name from './Name.svelte';
</script>

<div class="Title">
  <Name />

  {#if useTripStore.trip?.archived}
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
