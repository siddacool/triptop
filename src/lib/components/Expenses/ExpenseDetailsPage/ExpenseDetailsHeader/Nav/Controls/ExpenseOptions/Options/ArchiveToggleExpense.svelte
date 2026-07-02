<script lang="ts">
  import { DropdownMenuItem, modals, toasts } from '@flightlesslabs/dodo-ui-bits';
  import Icon from '@iconify/svelte';
  import { page } from '$app/state';
  import { useEditExpenseStore } from '$lib/stores/expense/edit.svelte';
  import { useExpenseStore } from '$lib/stores/expense/individual.svelte';
  import { useTripStore } from '$lib/stores/trip/individual.svelte';
  import { useSettingsStore } from '$lib/stores/settings/settings.svelte';
  import { useExpenseListStore } from '$lib/stores/expense/list.svelte';
  import { useHistoricalCurrencyExchangeStore } from '$lib/stores/currency/exchange/historical.svelte';

  const tripId = page.params.tripId || '';
  const expenseId = page.params.expenseId || '';

  const loadContents = async () => {
    try {
      await useExpenseStore.fetch(expenseId);

      const tripCurrency = useTripStore.trip?.currency;
      const homeCurrency = useSettingsStore.settings.homeCurrency;
      const enableCurrencyConversion = useSettingsStore.settings.enableCurrencyConversion;

      if (tripCurrency && homeCurrency && enableCurrencyConversion) {
        await useExpenseListStore.fetch(tripId);
        await useHistoricalCurrencyExchangeStore.fetchSilent(tripCurrency, homeCurrency);
      }

      useExpenseStore.updateExchangeData();
    } catch (error) {
      console.error('Failed to fetch expsense:', error);
    }
  };

  async function toggleArchive(archiveCondition: boolean) {
    try {
      if (!tripId) {
        return;
      }

      if (!expenseId) {
        return;
      }

      await useEditExpenseStore.toggleArchived(expenseId, archiveCondition);

      toasts.add({
        title: 'Successs',
        description: archiveCondition ? 'Expense archived' : 'Expense unarchived',
        color: 'primary',
      });

      loadContents();
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);

      toasts.add({
        title: archiveCondition ? 'Failed to archive expense' : 'Failed to unarchive expense',
        description: message,
        color: 'danger',
      });
    }
  }

  function archiveConfirmation() {
    modals.add('confirm', {
      title: 'Archive expense',
      description: 'Are you sure you want to archive this expense?',
      onaccept: () => toggleArchive(true),
    });
  }

  function onselect() {
    const archiveState = useExpenseStore.expense?.archived || false;
    const archiveCondition = !archiveState;

    if (archiveCondition) {
      archiveConfirmation();
      return;
    }

    toggleArchive(false);
  }
</script>

<DropdownMenuItem onSelect={onselect} outline>
  {#if useExpenseStore.expense?.archived}
    <span class="Icon">
      <Icon icon="material-symbols:unarchive-outline" />
    </span>
    Unarchive expense
  {:else}
    <span class="Icon">
      <Icon icon="material-symbols:archive-outline" />
    </span>
    Archive expense
  {/if}
</DropdownMenuItem>
