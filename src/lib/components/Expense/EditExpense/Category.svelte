<script lang="ts">
  import CategoryIcon from '$lib/components/CategoryIcon.svelte';
  import type { CreateExpenseFormData } from '$lib/stores/expense/create.svelte';
  import { Category, categoryOptions } from '$lib/stores/expense/individual.svelte';
  import FormControl from '$lib/ui-lib/FormControl';
  import OptionsPicker from '$lib/ui-lib/OptionsPicker';
  import { Column } from '@flightlesslabs/grid';

  interface CurrencyProps {
    formData?: CreateExpenseFormData;
    onchange: (name: string, value: string) => void;
  }

  const { formData, onchange }: CurrencyProps = $props();
</script>

<Column>
  <FormControl label="Category:" for="category">
    <OptionsPicker
      type="single"
      name="category"
      options={categoryOptions}
      onchange={(val) => onchange('category', val)}
      value={formData?.category}
    >
      {#snippet label(option)}
        <span class="option">
          <CategoryIcon category={option.value as Category} />
          {option.label}
        </span>
      {/snippet}
    </OptionsPicker>
  </FormControl>
</Column>

<style lang="scss">
  .option {
    display: inline-flex;
    align-items: center;

    :global(.CategoryIcon) {
      margin-right: 4px;
    }
  }
</style>
