<script>
  import { Column, Grid } from '@flightlesslabs/dodo-ui';
  import Theme from './Theme.svelte';
  import FieldHeader from '$lib/components/ui/FieldHeader/FieldHeader.svelte';
  import DateFormat from './DateFormat.svelte';
</script>

<Column>
  <Grid gap={2}>
    <Column>
      <FieldHeader>User interface</FieldHeader>
    </Column>
    <Theme />
    <DateFormat />
  </Grid>
</Column>
