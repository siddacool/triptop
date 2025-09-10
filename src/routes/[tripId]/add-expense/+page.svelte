<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import EditExpense from '$lib/components/Expense/EditExpense/EditExpense.svelte';
  import Header from '$lib/components/Header.svelte';
  import { processFirstError } from '$lib/helpers/process-errors';
  import { useCreateExpenseStore } from '$lib/stores/expense/create.svelte';
  import { Category, PaymentModes } from '$lib/stores/expense/individual.svelte';
  import { getMoment } from '@flightlesslabs/utils';
  import type { DateValue } from '@internationalized/date';
  import type { TimeValue } from 'bits-ui';
  import { onMount } from 'svelte';

  let errorMessage = $state('');

  const tripId = page.params.tripId;

  onMount(async () => {
    try {
      if (!tripId) {
        return;
      }

      await useCreateExpenseStore.substituteFormData(tripId);
    } catch (e) {
      console.log(e);
    }
  });

  async function onsubmit(e: SubmitEvent) {
    try {
      e.preventDefault();

      if (!tripId) {
        return;
      }

      errorMessage = '';
      await useCreateExpenseStore.create(tripId);

      goto(`/${tripId}`);
    } catch (error) {
      console.log(error);

      errorMessage = processFirstError(error);
    }
  }

  function onchange(e: Event, value?: string) {
    const target = e.target as HTMLInputElement;
    const name = value ? (e as unknown as string) : target.name;

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
        const formattedDate = value
          ? (value as unknown as DateValue).toString()
          : getMoment(useCreateExpenseStore.formData.date).format('YYYY-MM-DD');
        const cacheTime = getMoment(useCreateExpenseStore.formData.date).format('HH:mm');

        useCreateExpenseStore.updateForm({
          date: getMoment(`${formattedDate} ${cacheTime}`, 'YYYY-MM-DD HH:mm').valueOf(),
        });
        break;
      case 'time':
        const formattedTime = value
          ? (value as unknown as TimeValue).toString()
          : getMoment(useCreateExpenseStore.formData.date).format('HH:mm:ss');
        const cacheDate = getMoment(useCreateExpenseStore.formData.date).format('YYYY-MM-DD');

        useCreateExpenseStore.updateForm({
          date: getMoment(`${cacheDate} ${formattedTime}`, 'YYYY-MM-DD HH:mm:ss').valueOf(),
        });
        break;
      default:
        break;
    }
  }
</script>

<div class="AddExpense">
  <EditExpense
    {onsubmit}
    {onchange}
    {errorMessage}
    loading={useCreateExpenseStore.loading}
    formData={useCreateExpenseStore.formData}
    createNew
  >
    {#snippet header()}
      <Header backTo="/" aria-label="Back to trips">Add Expense</Header>
    {/snippet}
  </EditExpense>
</div>
