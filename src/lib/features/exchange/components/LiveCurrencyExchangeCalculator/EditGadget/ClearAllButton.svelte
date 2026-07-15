<script lang="ts">
  import CalculatorButton from './CalculatorButton/CalculatorButton.svelte';

  type Props = {
    class?: string;
    onclick: (value: number | string) => void;
  };

  let { class: className = '', onclick }: Props = $props();

  const classes = $derived(['ClearAllButton', className].filter(Boolean));
</script>

<div class={classes.join(' ')}>
  <CalculatorButton value="clearAll" {onclick} color="danger" outline>Clear</CalculatorButton>
</div>

<style lang="scss">
  .ClearAllButton {
    width: 100%;

    :global(.CalculatorButtonButton.dodo-ui-Button.compact.size--large) {
      font-size: 1.2rem;
    }
  }
</style>
