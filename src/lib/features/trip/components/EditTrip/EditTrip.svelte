<script lang="ts" module>
  type EditTripBaseProps = {
    onsubmit?: (data: TripCreateData) => void;
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
  import { Column, FormField, Grid, Row, TextInput } from '@flightlesslabs/dodo-ui';
  import Controls from './Controls.svelte';
  import { Select } from '@flightlesslabs/dodo-ui-bits';
  import { currencyOptions } from '$lib/features/trip/config/currency';
  import type { TripCreateData, Trip } from '../../types';
  import { localeOptionAuto, localeOptions } from '../../config';

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

    const eventSubmitter = event.submitter;

    if (!eventSubmitter?.classList.contains('event-submitter')) {
      return;
    }

    const formData: TripCreateData = {
      ...data,
      name: name || '',
      currency: currency || 'USD',
      locale: locale === localeOptionAuto.value ? undefined : locale,
    };

    onsubmit?.(formData);
  }

  function reset() {
    name = data?.name;
    currency = data?.currency;
    locale = data?.locale || localeOptionAuto.value;
  }
</script>

<div class="EditTrip">
  <form onsubmit={submit}>
    <Grid gap={2}>
      <Column>
        <FormField label="Trip name:" for="name">
          <TextInput
            bind:value={name}
            name="name"
            {disabled}
            placeholder="e.g. Trip to bali"
            size="large"
          />
        </FormField>
      </Column>

      <Row>
        <Column lg={8}>
          <FormField label="Currency:" for="currency">
            <Select
              options={currencyOptions}
              bind:value={currency}
              name="currency"
              searchable
              placeholder="Select currency"
              clearable
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
  </form>
</div>

<style>
  .EditTrip {
    margin-top: calc(var(--dodo-ui-space) * 2);
    color: var(--dodo-color-neutral-800);
  }
</style>
