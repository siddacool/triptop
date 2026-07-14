<script lang="ts">
  import { Button } from '@flightlesslabs/dodo-ui';
  import type { Snippet } from 'svelte';

  type Props = {
    class?: string;
    value: number | string;
    onclick: (value: number | string) => void;
    children?: Snippet;
    disabled?: boolean;
  };

  let { class: className = '', onclick, value, children, disabled }: Props = $props();

  const classes = $derived(['CalculatorButton', className].filter(Boolean));
</script>

<div class={classes.join(' ')}>
  <Button
    fullWidth
    roundness="pill"
    variant="text"
    color="neutral"
    onclick={() => onclick(value)}
    size="large"
    compact
    class="CalculatorButtonButton"
    {disabled}
  >
    {@render children?.()}
  </Button>
</div>

<style lang="scss">
  .CalculatorButton {
    width: 100%;

    :global(.CalculatorButtonButton.dodo-ui-Button.compact.size--large) {
      width: 100%;
      font-size: 1.5rem;
    }
  }
</style>
