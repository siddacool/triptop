<script lang="ts">
  import type { CreateExpenseFormData } from '$lib/stores/expense/create.svelte';
  import { getExpenseTags, useExpensesStore } from '$lib/stores/expense/list.svelte';
  import FormControl from '$lib/ui-lib/FormControl';
  import TagsInput from '$lib/ui-lib/TagsInput';
  import type { TagsInputChangeData } from '$lib/ui-lib/TagsInput/TagsInput.svelte';
  import { Column } from '@flightlesslabs/grid';

  interface TagsProps {
    formData?: CreateExpenseFormData;
    onchange: (name: string, value: string[]) => void;
  }

  const { formData, onchange }: TagsProps = $props();

  const tagsOptions = $derived(getExpenseTags(useExpensesStore.data || []));

  function onchnageMod(data: TagsInputChangeData) {
    let tagsCached = formData?.tags || [];

    if (data.type === 'add' && data.option) {
      tagsCached.push(data.option);
    } else if (data.type === 'remove' && data.option) {
      tagsCached = tagsCached.filter((item) => item !== data.option);
    } else if (data.type === 'removeAll') {
      tagsCached = [];
    }

    onchange('tags', tagsCached);
  }
</script>

<Column>
  <FormControl label="Tags:" for="tags">
    <TagsInput
      options={tagsOptions}
      name="tags"
      value={formData?.tags || []}
      onchange={onchnageMod}
      placeholder="Enter tags"
    />
  </FormControl>
</Column>
