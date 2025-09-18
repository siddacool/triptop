<script lang="ts">
  import type { CreateExpenseFormData } from '$lib/stores/expense/create.svelte';
  import { Category } from '$lib/stores/expense/individual.svelte';
  import ChipPicker from '$lib/ui-lib/ChipPicker';
  import FormControl from '$lib/ui-lib/FormControl';
  import { Column } from '@flightlesslabs/grid';

  interface CurrencyProps {
    formData?: CreateExpenseFormData;
    onchange: (name: string, value: string) => void;
  }

  const { formData, onchange }: CurrencyProps = $props();

  export const options = Object.values(Category).map((value) => ({
    value,
    label: value.charAt(0) + value.slice(1).toLowerCase(),
  }));
</script>

<Column>
  <FormControl label="Category:" for="category">
    <ChipPicker
      name="category"
      {options}
      onchange={(val) => onchange('category', val)}
      value={formData?.category}
    />
  </FormControl>
</Column>

<style lang="scss">
</style>
