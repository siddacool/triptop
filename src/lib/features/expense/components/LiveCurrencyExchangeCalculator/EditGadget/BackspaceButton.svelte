<script lang="ts">
  import Icon from '@iconify/svelte';
  import CalculatorButton from './CalculatorButton/CalculatorButton.svelte';

  type Props = {
    class?: string;
    onclick: (value: number | string) => void;
  };

  let { class: className = '', onclick }: Props = $props();

  const classes = $derived(['BackspaceButton', className].filter(Boolean));
</script>

<div class={classes.join(' ')}>
  <CalculatorButton value="backspace" {onclick}>
    <Icon icon="material-symbols:keyboard-backspace-rounded" />
  </CalculatorButton>
</div>

<style lang="scss">
  .BackspaceButton {
    width: 100%;
    :global(.CalculatorButtonButton) {
      font-size: 1.5rem;
    }
  }
</style>
