<script lang="ts">
  import type { CreateExpenseFormData } from '$lib/stores/expense/create.svelte';
  import DatePicker from '$lib/ui-lib/DatePicker/DatePicker.svelte';
  import FormControl from '$lib/ui-lib/FormControl';
  import TimePicker from '$lib/ui-lib/TimePicker';
  import { Column, Grid } from '@flightlesslabs/grid';
  import { getMoment } from '@flightlesslabs/utils';
  import { parseDate, Time } from '@internationalized/date';

  interface ExpenseDateProps {
    formData?: CreateExpenseFormData;
    onchange: (name: string, value: string) => void;
  }

  const { formData, onchange }: ExpenseDateProps = $props();

  const isoStringData = $derived(getMoment(formData?.date).format('YYYY-MM-DD'));
  const hours = $derived(Number(getMoment(formData?.date).format('HH')));
  const minutes = $derived(Number(getMoment(formData?.date).format('mm')));

  const parsedDate = $derived(parseDate(isoStringData));
  const maxDate = $derived(parseDate(getMoment().format('YYYY-MM-DD')));
  const parsedTime = $derived(new Time(hours, minutes));

  const formattedDate = $derived(
    formData?.date ? `${getMoment(formData?.date).format('ddd, MMM D, YYYY. h:mm a')}` : '',
  );
</script>

<Column>
  <FormControl label="Date" for="date">
    <Grid>
      <Column md={6}>
        <DatePicker
          name="date"
          placeholder="Select Date"
          value={parsedDate}
          onchange={(val) => onchange('date', val as unknown as string)}
          maxValue={maxDate}
        />
      </Column>
      <Column md={6}>
        <TimePicker
          name="date-time"
          placeholder="Select Time"
          value={parsedTime}
          onchange={(val) => onchange('time', val as unknown as string)}
        />
      </Column>
      {#if formattedDate}
        <Column sm={12}>
          <div class="formattedDate">
            {formattedDate}
          </div>
        </Column>
      {/if}
    </Grid>
  </FormControl>
</Column>

<style lang="scss">
</style>
