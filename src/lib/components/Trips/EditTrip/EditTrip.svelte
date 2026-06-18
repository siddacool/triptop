<script lang="ts" module>
  import {
    localeOptionAuto,
    localeOptions,
    type EditTripFormData,
    type Trip,
  } from '$lib/stores/trip/types';

  type EditTripBaseProps = {
    onsubmit?: (data: EditTripFormData) => void;
    disabled?: boolean;
  };

  export type EditTripProps =
    | (EditTripBaseProps & {
        mode: 'edit';
        data: Trip;
      })
    | (EditTripBaseProps & {
        mode: 'create';
        data?: undefined;
      });
</script>

<script lang="ts">
  import { Card, Column, FormField, Grid, Row, TextInput } from '@flightlesslabs/dodo-ui';
  import Controls from './Controls.svelte';
  import { Select } from '@flightlesslabs/dodo-ui-bits';
  import { currencyOptions } from '$lib/stores/currency/types';

  const { mode, data, onsubmit, disabled = false }: EditTripProps = $props();

  let name = $derived(data?.name);
  let currency = $derived(data?.currency);
  let locale = $derived(data?.locale || localeOptionAuto.value);

  const isDataValid = $derived(name && currency && locale ? true : false);

  function submit(event: SubmitEvent) {
    event.preventDefault();

    if (!isDataValid) {
      return;
    }

    const data: EditTripFormData = {
      name: name || '',
      currency: currency || 'USD',
      locale: locale === localeOptionAuto.value ? undefined : locale,
    };

    onsubmit?.(data);
  }

  function reset() {
    name = data?.name;
    currency = data?.currency;
    locale = data?.locale || localeOptionAuto.value;
  }
</script>

<div class="EditTrip">
  <form onsubmit={submit}>
    <Card outline shadow={0} class="EditTripCard">
      <Grid gap={2}>
        <Column>
          <FormField label="Trip name:" for="name">
            <TextInput bind:value={name} name="name" {disabled} placeholder="e.g. Trip to bali" />
          </FormField>
        </Column>

        <Row>
          <Column lg="flex">
            <FormField label="Currency:" for="currency">
              <Select
                options={currencyOptions}
                bind:value={currency}
                name="currency"
                searchable
                placeholder="Select currency"
              />
            </FormField>
          </Column>

          <Column lg={4}>
            <FormField label="Locale:" for="locale">
              <Select
                options={localeOptions}
                bind:value={locale}
                name="locale"
                placeholder="Select locale"
              />
            </FormField>
          </Column>
        </Row>

        <Column>
          <Controls {mode} {disabled} onreset={reset} {isDataValid} />
        </Column>
      </Grid>
    </Card>
  </form>
</div>

<style>
  .EditTrip {
    color: var(--dodo-color-neutral-800);

    :global(.EditTripCard) {
      padding: calc(var(--dodo-ui-space) * 2);
    }
  }
</style>
