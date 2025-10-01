<script lang="ts">
  import type { Expense } from '$lib/stores/expense/individual.svelte';
  import Chip from '$lib/ui-lib/Chip';

  interface TagsProps {
    data: Expense;
  }

  const { data }: TagsProps = $props();
  const tags = $derived(JSON.parse(data.tags || '[]') as string[]);
</script>

<div class="Tags">
  {#each tags as tag (tag)}
    <Chip>{tag}</Chip>
  {/each}
</div>

<style lang="scss">
  .Tags {
    display: flex;
  }
</style>
