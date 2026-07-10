<script lang="ts">
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  import { page } from '$app/state';
  import EditExpense from '$lib/components/Expenses/EditExpense/EditExpense.svelte';
  import Box from '$lib/components/ui/Box/Box.svelte';
  import ControlSection from '$lib/components/ui/ControlSection/ControlSection.svelte';
  import Divider from '$lib/components/ui/Divider/Divider.svelte';
  import Loading from '$lib/components/ui/Loading/Loading.svelte';
  import WhiteMaterial from '$lib/components/ui/Materials/WhiteMaterial/WhiteMaterial.svelte';
  import PageHeadingNav from '$lib/components/ui/PageHeadingNav/PageHeadingNav.svelte';
  import { useEditExpenseStore } from '$lib/stores/expense/edit.svelte';
  import { useExpenseStore } from '$lib/stores/expense/individual.svelte';
  import type { EditExpenseFormData } from '$lib/features/expense/types';
  import { tripDetailStore } from '$lib/features/trip/store/detail.svelte.ts';
  import { Button, Column, Grid } from '@flightlesslabs/dodo-ui';
  import { modals, toasts } from '@flightlesslabs/dodo-ui-bits';

  let fetching: boolean = $state(false);

  const tripId = page.params.tripId;
  const expenseId = page.params.expenseId;
  const isArchived = $derived(useExpenseStore.expense?.archived || false);

  async function deleteExpense() {
    try {
      if (!tripId) {
        return;
      }

      if (!expenseId) {
        return;
      }

      fetching = true;

      await useEditExpenseStore.delete(expenseId);

      toasts.add({
        title: 'Successs',
        description: 'Expense deleted',
        color: 'primary',
      });

      await goto(resolve(`/trips/${tripId}`));
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);

      toasts.add({
        title: 'Failed to delete expense',
        description: message,
        color: 'danger',
      });

      fetching = false;
    }
  }

  async function updateExpense(data: EditExpenseFormData) {
    try {
      if (!tripId) {
        return;
      }

      if (!expenseId) {
        return;
      }

      fetching = true;
      await useEditExpenseStore.update(expenseId, data);

      toasts.add({
        title: 'Successs',
        description: 'Expense details updated',
        color: 'primary',
      });

      await useExpenseStore.fetch(expenseId);

      await goto(resolve(`/trips/${tripId}/expenses/${expenseId}`));
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);

      toasts.add({
        title: 'Failed to edit expense',
        description: message,
        color: 'danger',
      });

      fetching = false;
    }
  }

  async function toggleArchive(archiveCondition: boolean) {
    try {
      if (!tripId) {
        return;
      }

      if (!expenseId) {
        return;
      }

      fetching = true;

      await useEditExpenseStore.toggleArchived(expenseId, archiveCondition);

      toasts.add({
        title: 'Successs',
        description: archiveCondition ? 'Expense deleted' : 'Expense restored',
        color: 'primary',
      });

      await goto(resolve(`/trips/${tripId}`));
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);

      toasts.add({
        title: archiveCondition ? 'Failed to delete expense' : 'Failed to restore expense',
        description: message,
        color: 'danger',
      });

      fetching = false;
    }
  }

  function deleteConfirmation() {
    modals.add('confirm', {
      title: 'Delete Expense',
      description: 'Are you sure you want to delete this expense?',
      onaccept: () => deleteExpense(),
    });
  }

  function archiveConfirmation() {
    modals.add('confirm', {
      title: 'Archive expense',
      description: 'Are you sure you want to archive this expense?',
      onaccept: () => toggleArchive(true),
    });
  }
</script>

<svelte:head>
  <title>Edit expense</title>
</svelte:head>

{#snippet content()}
  {#if useExpenseStore.expense && tripDetailStore.trip}
    <Grid gap={2}>
      <Column>
        <div>
          <PageHeadingNav class="TripHeader" href={`/trips/${tripId}/expenses/${expenseId}`}>
            Edit expense
          </PageHeadingNav>
          <EditExpense
            trip={tripDetailStore.trip}
            mode="edit"
            data={useExpenseStore.expense}
            onsubmit={updateExpense}
            disabled={fetching}
          />
        </div>
      </Column>
      <Column>
        <Divider />
      </Column>
      <Column>
        <ControlSection class="ExpenseEditControls" controlsAlignment="center">
          <Button color="danger" onclick={deleteConfirmation}>Delete expense</Button>

          {#if isArchived}
            <Button onclick={() => toggleArchive(false)}>Unarchive expense</Button>
          {:else}
            <Button color="neutral" onclick={archiveConfirmation}>Archive expense</Button>
          {/if}
        </ControlSection>
      </Column>
    </Grid>
  {/if}
{/snippet}

<WhiteMaterial>
  <Box>
    {#if useExpenseStore.fetching || tripDetailStore.loading}
      <Loading />
    {:else}
      {@render content()}
    {/if}
  </Box>
</WhiteMaterial>
