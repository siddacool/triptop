<script lang="ts">
  import Select from '$lib/components/ui-framework/Form/Select.svelte';
  import FormLabel from '$lib/components/ui-framework/Form/shared/FormLabel.svelte';
  import StackItem from '$lib/components/ui-framework/Layout/Stack/StackItem.svelte';
  import { categoryOptions } from '$lib/stores/expense/expense.svelte';
  import type { Category } from '$lib/stores/expense/types';
  import CategoryFormattedOption from '../../CategoryFormattedOption.svelte';

  interface Props {
    onchange: (e: Event) => void;
    value: Category | undefined;
  }

  const { onchange, value = undefined }: Props = $props();
</script>

<StackItem>
  <div class="CategorySelect">
    <FormLabel label="Select category" />

    <div class="selectBox">
      <span class="logo">
        <CategoryFormattedOption
          category={categoryOptions.find((item) => item.value === value)?.value}
          hideLabel
        />
      </span>
      <Select {onchange} name="category">
        {#each categoryOptions as categoryOption (categoryOption.value)}
          <option value={categoryOption.value} selected={value === categoryOption.value}>
            <CategoryFormattedOption category={categoryOption.value} />
          </option>
        {/each}
      </Select>
    </div>
  </div>
</StackItem>

<style lang="scss">
  .CategorySelect {
    .selectBox {
      display: flex;
      align-items: end;
    }

    .logo {
      display: inline-flex;
      margin-bottom: 3px;
    }

    :global(.Select) {
      flex: 1;
    }
  }
</style>
