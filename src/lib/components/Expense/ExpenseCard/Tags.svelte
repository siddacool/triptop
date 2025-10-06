<script lang="ts">
  import validateJson from '$lib/helpers/validators/vaidate-json';
  import type { Expense } from '$lib/stores/expense/individual.svelte';
  import Chip from '$lib/ui-lib/Chip';
  import { getContext } from 'svelte';

  const data = getContext<Expense>('ExpenseData');
  const details = getContext<boolean | undefined>('details') || false;

  const tags = $derived(
    data.tags && validateJson(data.tags) ? JSON.parse(data.tags) : [],
  ) as string[];
</script>

{#if details && tags.length}
  <div class="Tags">
    {#each tags as tag (tag)}
      <Chip>{tag}</Chip>
    {/each}
  </div>
{/if}

<style lang="scss">
  .Tags {
    display: flex;
    margin-top: 16px;
  }
</style>
