<script lang="ts">
  import { Column, Grid } from '@flightlesslabs/dodo-ui';
  import NumberSection from './NumberSection/NumberSection.svelte';
  import BackspaceButton from './BackspaceButton.svelte';
  import DecimalMarkButton from './DecimalMarkButton.svelte';
  import ClearAllButton from './ClearAllButton.svelte';
  import { calculatorAmount } from '$lib/features/exchange/utils/calculator-amount';

  type Props = {
    class?: string;
    amount: string;
  };

  let { class: className = '', amount = $bindable() }: Props = $props();

  const classes = $derived(['EditGadget', className].filter(Boolean));

  function handleClick(value: number | string) {
    amount = calculatorAmount(amount, value);
  }
</script>

<div class={classes.join(' ')}>
  <Grid gap={1}>
    <Column size={9}>
      <NumberSection onclick={handleClick} />
    </Column>
    <Column size={3}>
      <div class="rightSection">
        <div>
          <Grid gap={1}>
            <Column>
              <BackspaceButton onclick={handleClick} />
            </Column>
            <Column>
              <ClearAllButton onclick={handleClick} />
            </Column>
          </Grid>
        </div>
        <DecimalMarkButton onclick={handleClick} />
      </div>
    </Column>
  </Grid>
</div>

<style lang="scss">
  .EditGadget {
    margin-top: calc(var(--dodo-ui-space) * 1);

    .rightSection {
      height: 100%;
      display: flex;
      flex-direction: column;
      width: 100%;
      justify-content: space-between;
      margin-left: calc(var(--dodo-ui-space) * 0.5);
    }
  }
</style>
