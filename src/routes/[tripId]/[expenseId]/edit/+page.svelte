<script lang="ts" module>
  function getFormattedDate(value: string | undefined) {
    const formattedDate = value
      ? (value as unknown as DateValue).toString()
      : getMoment(useCreateExpenseStore.formData.date).format('YYYY-MM-DD');

    return formattedDate;
  }

  function getFormattedTime(value: string | undefined) {
    const formattedTime = value
      ? (value as unknown as TimeValue).toString()
      : getMoment(useCreateExpenseStore.formData.date).format('HH:mm:ss');

    return formattedTime;
  }

  export function editExpenseOnChange(e: Event, value?: string) {
    const target = e.target as HTMLInputElement;
    const name = value ? (e as unknown as string) : target.name;
    const cacheTime = getMoment(useCreateExpenseStore.formData.date).format('HH:mm');
    const cacheDate = getMoment(useCreateExpenseStore.formData.date).format('YYYY-MM-DD');

    switch (name) {
      case 'name':
        useCreateExpenseStore.updateForm({ name: target.value });
        break;
      case 'amount':
        useCreateExpenseStore.updateForm({ amount: Number(target.value) });
        break;
      case 'currency':
        useCreateExpenseStore.updateForm({ currency: value });
        break;
      case 'paymentMode':
        console.log(value);

        useCreateExpenseStore.updateForm({ paymentMode: value as PaymentModes });
        break;
      case 'category':
        useCreateExpenseStore.updateForm({
          category: value === 'MISC' ? undefined : (value as Category),
        });
        break;
      case 'date':
        useCreateExpenseStore.updateForm({
          date: getMoment(`${getFormattedDate(value)} ${cacheTime}`, 'YYYY-MM-DD HH:mm').valueOf(),
        });
        break;
      case 'time':
        useCreateExpenseStore.updateForm({
          date: getMoment(
            `${cacheDate} ${getFormattedTime(value)}`,
            'YYYY-MM-DD HH:mm:ss',
          ).valueOf(),
        });
        break;
      default:
        break;
    }
  }
</script>

<script lang="ts">
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  import { page } from '$app/state';
  import EditExpense from '$lib/components/Expense/EditExpense';
  import Header from '$lib/components/Header.svelte';
  import { processFirstError } from '$lib/helpers/process-errors';
  import { useCreateExpenseStore } from '$lib/stores/expense/create.svelte';
  import { Category, PaymentModes, useExpenseStore } from '$lib/stores/expense/individual.svelte';
  import Loader from '$lib/ui-lib/Loader/Loader.svelte';
  import { Column, Grid } from '@flightlesslabs/grid';
  import { getMoment } from '@flightlesslabs/utils';
  import type { DateValue } from '@internationalized/date';
  import type { TimeValue } from 'bits-ui';
  import { onMount } from 'svelte';

  const tripId = page.params.tripId;
  const expenseId = page.params.expenseId;

  let loading = $state<boolean>(false);

  onMount(async () => {
    if (!expenseId) {
      return;
    }

    await useExpenseStore.fetch(expenseId);

    const data = useExpenseStore.data;

    if (!data) {
      return;
    }

    useCreateExpenseStore.updateForm(data);
  });

  onMount(() => {
    return () => {
      useCreateExpenseStore.reset();
      useExpenseStore.reset();
    };
  });

  let errorMessage = $state('');

  async function onsubmit(e: SubmitEvent) {
    try {
      e.preventDefault();

      if (!tripId) {
        return;
      }

      if (!expenseId) {
        return;
      }

      loading = true;

      errorMessage = '';

      const formData = useCreateExpenseStore.formData;

      await useExpenseStore.update(formData);

      const resolved = resolve(`/${tripId}/${expenseId}`);

      goto(resolved);
    } catch (error) {
      console.log(error);

      errorMessage = processFirstError(error);
    } finally {
      loading = false;
    }
  }

  async function ondelete() {
    try {
      loading = true;
      await useExpenseStore.delete();

      const resolved = resolve(`/${tripId}`);

      goto(resolved);
    } catch (error) {
      console.log(error);

      errorMessage = processFirstError(error);
    } finally {
      loading = false;
    }
  }
</script>

<svelte:head>
  <title>Edit Expense</title>
  <meta name="description" content="Triptop - Edit Expense" />
</svelte:head>

<div class="EditExpense">
  {#if useExpenseStore.fetching}
    <Grid spacing={2}>
      <Column>
        <Loader />
      </Column>
    </Grid>
  {:else if useExpenseStore.data?._id}
    <EditExpense
      {onsubmit}
      onchange={editExpenseOnChange}
      {errorMessage}
      loading={useCreateExpenseStore.loading || loading}
      formData={useCreateExpenseStore.formData}
      {ondelete}
    >
      {#snippet header()}
        <Header backTo={`/${tripId}/${expenseId}`} aria-label="Back to expense">
          Edit Expense
        </Header>
      {/snippet}
    </EditExpense>
  {/if}
</div>
