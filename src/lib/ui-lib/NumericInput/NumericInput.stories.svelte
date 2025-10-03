<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import NumericInput from './NumericInput.svelte';

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    component: NumericInput,
    tags: ['autodocs'],
  });
</script>

<Story name="Default" />

<Story name="AllowNegative" args={{ allowNegative: true }} />

<Story name="decimalPlaces" args={{ decimalPlaces: 2 }} />

<Story name="prefix" args={{ prefix: '$' }} />

<Story name="suffix" args={{ suffix: '/_' }} />

<Story name="FormatCurrency" args={{ formatCurrency: true }} />

<Story name="lakhSeparator" args={{ formatCurrency: true, lakhSeparator: true }} />

<Story name="max" args={{ max: 10000 }} />

<Story name="disabled" args={{ disabled: true }} />

<Story name="readonly" args={{ readonly: true }} />
