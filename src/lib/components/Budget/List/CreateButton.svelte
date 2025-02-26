<script lang="ts">
  import { page } from '$app/state';
  import AnchorButton from '$lib/components/ui-framework/Form/AnchorButton.svelte';
  import StackItem from '$lib/components/ui-framework/Layout/Stack/StackItem.svelte';
  import Icon from '@iconify/svelte';

  const tripId = page.params.tripId;
</script>

<StackItem>
  <div>
    <AnchorButton variant="primary" compact href={`/${tripId}/budget/add`}>
      <Icon icon="material-symbols:add" />
    </AnchorButton>
  </div>
</StackItem>

<style lang="scss">
  div {
    text-align: center;
  }
</style>
