<script lang="ts">
  import { page } from '$app/state';
  import Box from '$lib/components/ui/Box/Box.svelte';
  import ControlSection from '$lib/components/ui/ControlSection/ControlSection.svelte';
  import Divider from '$lib/components/ui/Divider/Divider.svelte';
  import WhiteMaterial from '$lib/components/ui/Materials/WhiteMaterial/WhiteMaterial.svelte';
  import PageHeadingNav from '$lib/components/ui/PageHeadingNav/PageHeadingNav.svelte';
  import { expenseDeatilStore } from '$lib/features/expense/store/detail.svelte';
  import { tripDetailStore } from '$lib/features/trip/store/detail.svelte';
  import { Column, Grid } from '@flightlesslabs/dodo-ui';
  import UpdateExpense from '$lib/features/expense/components/ExpenseUpdate/UpdateExpense.svelte';
  import DeleteExpense from '$lib/features/expense/components/ExpenseUpdate/DeleteExpense.svelte';
  import ArchiveExpense from '$lib/features/expense/components/ExpenseUpdate/ArchiveExpense.svelte';

  const tripId = page.params.tripId;
  const expenseId = page.params.expenseId;
</script>

<svelte:head>
  <title>Edit expense</title>
</svelte:head>

<WhiteMaterial>
  {#if expenseDeatilStore.expense && tripDetailStore.trip}
    <Box>
      <Grid gap={2}>
        <Column>
          <div>
            <PageHeadingNav class="TripHeader" href={`/trips/${tripId}/expenses/${expenseId}`}>
              Edit expense
            </PageHeadingNav>
            <UpdateExpense />
          </div>
        </Column>
        <Column>
          <Divider />
        </Column>
        <Column>
          <ControlSection class="ExpenseEditControls" controlsAlignment="center">
            <DeleteExpense />
            <ArchiveExpense />
          </ControlSection>
        </Column>
      </Grid>
    </Box>
  {/if}
</WhiteMaterial>
