<script lang="ts">
  import type { CreateExpenseFormData } from '$lib/stores/expense/create.svelte';
  import { Category } from '$lib/stores/expense/individual.svelte';
  import FormControl from '$lib/ui-lib/FormControl';
  import Select from '$lib/ui-lib/Select';
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
    <Select
      name="category"
      placeholder="Select Category"
      {options}
      value={formData?.category}
      onchange={(val) => onchange('category', val)}
    />
  </FormControl>
</Column>

<style lang="scss">
</style>
