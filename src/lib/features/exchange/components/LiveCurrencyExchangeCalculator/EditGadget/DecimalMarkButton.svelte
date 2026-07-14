<script lang="ts">
  import CalculatorButton from './CalculatorButton/CalculatorButton.svelte';

  type Props = {
    class?: string;
    onclick: (value: number | string) => void;
  };

  let { class: className = '', onclick }: Props = $props();

  const classes = $derived(['DecimalMarkButton', className].filter(Boolean));
  const value = '.';
</script>

<div class={classes.join(' ')}>
  <CalculatorButton {value} {onclick}>{value}</CalculatorButton>
</div>

<style lang="scss">
  .DecimalMarkButton {
    width: 100%;
    :global(.CalculatorButtonButton) {
      font-size: 1.6rem;
    }
  }
</style>
