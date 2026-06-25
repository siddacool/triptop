<script>
  import { Column, Grid } from '@flightlesslabs/dodo-ui';
  import DateFormat from './DateFormat.svelte';
  import FieldHeader from '$lib/components/ui/FieldHeader/FieldHeader.svelte';
</script>

<Column>
  <Grid gap={2}>
    <Column>
      <FieldHeader>Localization</FieldHeader>
    </Column>
    <DateFormat />
  </Grid>
</Column>
