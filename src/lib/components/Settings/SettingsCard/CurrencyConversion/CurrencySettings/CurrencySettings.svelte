<script>
  import { Column, Grid } from '@flightlesslabs/dodo-ui';
  import HomeCurrency from './HomeCurrency.svelte';
  import Locale from './Locale.svelte';
  import Example from './Example.svelte';
</script>

<Column>
  <Grid gap={2}>
    <HomeCurrency />
    <Locale />
  </Grid>
  <Example />
</Column>
