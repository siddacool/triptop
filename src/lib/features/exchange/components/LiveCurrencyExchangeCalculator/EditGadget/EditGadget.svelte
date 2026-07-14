<script lang="ts">
  import { Column, Grid } from '@flightlesslabs/dodo-ui';
  import NumberSection from './NumberSection/NumberSection.svelte';
  import BackspaceButton from './BackspaceButton.svelte';
  import DecimalMarkButton from './DecimalMarkButton.svelte';
  import ClearAllButton from './ClearAllButton.svelte';

  type Props = {
    class?: string;
    amount: string;
  };

  let { class: className = '', amount = $bindable() }: Props = $props();

  const classes = $derived(['EditGadget', className].filter(Boolean));

  function handleClick(value: number | string) {
    const [, afterDecimal = ''] = amount.split('.');

    if (typeof value === 'number') {
      if (amount === '0') {
        amount = `${value}`;
      } else if (afterDecimal.length >= 4) {
        return;
      } else {
        amount = `${amount}${value}`;
      }
    } else if (value.includes('00')) {
      if (amount === '0' || amount.includes('.')) {
        return;
      }

      amount = `${amount}${value}`;
    } else if (value === 'backspace') {
      amount = `${amount}`.slice(0, -1);
    } else if (value === '.') {
      if (amount.includes('.')) {
        return;
      }

      amount = `${amount}${value}`;
    } else if (value === 'clearAll') {
      amount = '0';
    }
  }
</script>

<div class={classes.join(' ')}>
  <Grid gap={2}>
    <Column size={9}>
      <NumberSection onclick={handleClick} />
    </Column>
    <Column size={3}>
      <div class="rightSection">
        <div>
          <Grid gap={2}>
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
    }
  }
</style>
