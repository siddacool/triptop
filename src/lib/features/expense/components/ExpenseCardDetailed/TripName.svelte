<script lang="ts">
  import FieldValue from '$lib/components/ui/FieldValue/FieldValue.svelte';
  import type { Trip } from '$lib/features/trip/types';
  import { Column } from '@flightlesslabs/dodo-ui';

  type Props = {
    trip: Trip;
  };

  let { trip }: Props = $props();
</script>

<Column>
  <FieldValue label="Trip:">
    {trip.name}
  </FieldValue>
</Column>
