<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import DatePicker from './DatePicker.svelte';
  import { parseDate } from '@internationalized/date';
  import { getMoment } from '@flightlesslabs/utils';

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    component: DatePicker,
    tags: ['autodocs'],
  });
</script>

<Story name="Default" />

<Story
  name="InitialDate"
  args={{ initialDate: parseDate(getMoment('2025-01-01', 'YYYY-MM-DD').format('YYYY-MM-DD')) }}
/>

<Story
  name="MinMax"
  args={{
    minValue: parseDate(getMoment().format('YYYY-MM-DD')),
    maxValue: parseDate(getMoment().add(5, 'day').format('YYYY-MM-DD')),
  }}
/>

<Story name="disabled" args={{ disabled: true }} />

<Story name="Error" args={{ error: true }} />
