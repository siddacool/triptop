<script lang="ts">
  import { Button } from '@flightlesslabs/dodo-ui';
  import type { ButtonAsButtonProps } from '@flightlesslabs/dodo-ui';

  export type ButtonBaseProps = Omit<ButtonAsButtonProps, 'onclick' | 'size'>;

  type Props = ButtonBaseProps & {
    value: number | string;
    onclick: (value: number | string) => void;
  };

  let { class: className = '', onclick, value, ...restProps }: Props = $props();

  const classes = $derived(['CalculatorButton', className].filter(Boolean));
</script>

<div class={classes.join(' ')}>
  <Button
    roundness="pill"
    variant="text"
    color="neutral"
    compact
    {...restProps}
    fullWidth
    size="large"
    onclick={() => onclick(value)}
    class="CalculatorButtonButton"
  />
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
