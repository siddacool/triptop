<script lang="ts">
  import type { MoneyValue } from '$lib/features/trip/types/currency';
  import type { Trip } from '$lib/features/trip/types';
  import { resolve } from '$app/paths';
  import type { Snippet } from 'svelte';

  type Props = {
    trip: Trip;
    value: MoneyValue;
    children?: Snippet;
  };

  let { children, value, trip }: Props = $props();
</script>

{#if value.expenseId}
  <a href={resolve(`/trips/${trip._id}/expenses/${value.expenseId}`)} class="DetailsLink">
    {@render children?.()}
  </a>
{:else}
  {@render children?.()}
{/if}

<style lang="scss">
  .DetailsLink {
    color: var(--dodo-color-secondary-600);
    transition: color 100ms;
    text-decoration: none;

    &:hover {
      color: var(--dodo-color-secondary-700);
    }

    &:active {
      color: var(--dodo-color-secondary-800);
    }
  }
</style>
