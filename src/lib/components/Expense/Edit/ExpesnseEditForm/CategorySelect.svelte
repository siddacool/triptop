<script lang="ts">
  import Select from '$lib/components/ui-framework/Form/Select.svelte';
  import StackItem from '$lib/components/ui-framework/Layout/Stack/StackItem.svelte';
  import { categoryOptions } from '$lib/stores/expense/expense.svelte';
  import type { Category } from '$lib/stores/expense/types';

  interface Props {
    onchange: (e: Event) => void;
    value: Category | undefined;
  }

  const { onchange, value = undefined }: Props = $props();
</script>

<StackItem>
  <Select {onchange} name="category" label="Select category">
    {#each categoryOptions as categoryOption (categoryOption.value)}
      <option value={categoryOption.value} selected={value === categoryOption.value}>
        {categoryOption.logo}
        {categoryOption.label}
      </option>
    {/each}
  </Select>
</StackItem>
