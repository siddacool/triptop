<script lang="ts">
  import { resolve } from '$app/paths';
  import Icon from '@iconify/svelte';
  import { tripListStore } from '../store/list.svelte';
</script>

{#if tripListStore.tripsArchived.length}
  <a class="TripAchivedLink" href={resolve('/trips/archived')}>
    <span class="Icon">
      <Icon icon="material-symbols:archive-outline" />
    </span>
    Archived ({tripListStore.tripsArchived.length})
  </a>
{/if}

<style lang="scss">
  .TripAchivedLink {
    color: var(--dodo-color-neutral-700);
    display: inline-flex;
    align-items: center;
    border-radius: var(--dodo-ui-element-roundness-1);
    font-size: 1rem;
    cursor: pointer;
    text-decoration: none;
    transition:
      background-color 70ms,
      color 70ms,
      border-color 70ms;
    margin-bottom: calc(var(--dodo-ui-space) * 1);

    @media (min-width: 600px) {
      font-size: 1.1rem;
    }

    .Icon {
      font-size: 1.4rem;
      color: var(--dodo-color-neutral-600);
      display: inline-flex;
      margin-right: 4px;
      transition:
        background-color 70ms,
        color 70ms,
        border-color 70ms;

      @media (min-width: 600px) {
        font-size: 1.5rem;
      }
    }

    &:hover {
      color: var(--dodo-color-primary-600);

      .Icon {
        color: inherit;
      }
    }
  }
</style>
