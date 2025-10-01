<script lang="ts">
  import validateJson from '$lib/helpers/validators/vaidate-json';
  import type { Expense } from '$lib/stores/expense/individual.svelte';
  import Chip from '$lib/ui-lib/Chip';
  import { Column } from '@flightlesslabs/grid';

  interface TagsProps {
    data: Expense;
  }

  const { data }: TagsProps = $props();
  const tags = $derived(
    data.tags && validateJson(data.tags) ? JSON.parse(data.tags) : [],
  ) as string[];
</script>

{#if tags.length}
  <Column>
    <div class="Tags">
      {#each tags as tag (tag)}
        <Chip>{tag}</Chip>
      {/each}
    </div>
  </Column>
{/if}

<style lang="scss">
  .Tags {
    display: flex;
  }
</style>
