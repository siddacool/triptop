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
  <CalculatorButton value="clearAll" {onclick}>Clear</CalculatorButton>
</div>

<style lang="scss">
  .BackspaceButton {
    width: 100%;
  }
</style>
