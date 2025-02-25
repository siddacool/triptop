<script lang="ts">
  import NumberInput from '$lib/components/ui-framework/Form/NumberInput.svelte';
  import StackItem from '$lib/components/ui-framework/Layout/Stack/StackItem.svelte';

  interface Props {
    oninput: (e: Event) => void;
    value: number;
  }

  const { oninput, value }: Props = $props();
</script>

<StackItem>
  <NumberInput {value} {oninput} name="amount" label="Enter amount" />
</StackItem>

<style lang="scss">
</style>
