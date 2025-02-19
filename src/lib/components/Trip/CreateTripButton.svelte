<script lang="ts">
  import AnchorButton from '$lib/components/ui-framework/Form/AnchorButton.svelte';
  import StackItem from '$lib/components/ui-framework/Layout/Stack/StackItem.svelte';
  import Icon from '@iconify/svelte';
</script>

<StackItem>
  <div class="CreateButtonSection">
    <AnchorButton href="/trips/create" variant="primary" compact>
      <Icon icon="mdi:plus" />
    </AnchorButton>
  </div>
</StackItem>

<style lang="scss">
  .CreateButtonSection {
    text-align: center;
  }
</style>
