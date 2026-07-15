<script lang="ts">
  import { Column, Grid, Row } from '@flightlesslabs/dodo-ui';
  import CalculatorButton from '../CalculatorButton/CalculatorButton.svelte';

  type Props = {
    class?: string;
    onclick: (value: number | string) => void;
  };

  let { class: className = '', onclick }: Props = $props();

  const classes = $derived(['NumberSection', className].filter(Boolean));
  const numberValues = [
    [7, 8, 9],
    [4, 5, 6],
    [1, 2, 3],
    [0, '00', '000'],
  ];
</script>

<div class={classes.join(' ')}>
  <Grid gap={1}>
    {#each numberValues as valueRow, i (valueRow)}
      <Row class={`row-${i}`}>
        {#each valueRow as item (item)}
          <Column size={4}>
            <CalculatorButton value={item} {onclick} color="primary" outline>
              {item}
            </CalculatorButton>
          </Column>
        {/each}
      </Row>
    {/each}
  </Grid>
</div>
