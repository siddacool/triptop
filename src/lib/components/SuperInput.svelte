<script lang="ts">
  import type { Snippet } from 'svelte';

  interface SuperInputProps {
    children?: Snippet;
    class?: string;
  }

  const { children, class: className = '' }: SuperInputProps = $props();
</script>

<div class={['SuperInput', className].join(' ')}>
  {@render children?.()}
</div>

<style lang="scss">
  .SuperInput {
    margin: 4px 0;

    :global(.TextInput),
    :global(.NumericInput) {
      height: 3.4rem;
      border-radius: 22px;
    }

    :global(.TextInput input),
    :global(.NumericInput input) {
      font-size: 1.4rem;
      padding: 0 16px;
    }
  }
</style>
