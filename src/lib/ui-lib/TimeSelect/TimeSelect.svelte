<script lang="ts" module>
  export interface TimeSelectProps {
    disabled?: boolean;
    error?: boolean;
    class?: string;
    name: string;
    value?: TimeValue;
    onchange?: (time: TimeValue | undefined) => void;
  }
</script>

<script lang="ts">
  import { AppColorSchemes, useThemeStore } from '$lib/stores/theme.svelte';
  import type { TimeValue } from 'bits-ui';

  import './TimeSelect.style.scss';
  import {
    convert12To24Hour,
    convert24To12HourObj,
    generatePaddedNumberOptions,
  } from './timeGenerator';
  import Select from '../Select';
  import { Time } from '@internationalized/date';
  import NumericInput from '../NumericInput/NumericInput.svelte';

  let {
    class: className = '',
    disabled,
    name,
    onchange,
    value = $bindable<TimeValue>(),
    error = false,
  }: TimeSelectProps = $props();

  const theme = $derived(
    useThemeStore.theme === AppColorSchemes.DARK ? 'theme--dark' : 'theme--light',
  );

  const periodOptions = [
    { value: 'AM', label: 'AM' },
    { value: 'PM', label: 'PM' },
  ];

  let hourValue = $derived(convert24To12HourObj(value.hour).hour);
  let minuteValue = $derived(`${value.minute}`);
  let periodValue = $derived(convert24To12HourObj(value.hour).period);

  function onchangeHour(e: Event) {
    const target = e.target as HTMLInputElement;

    const hourValueMod = convert12To24Hour({ hour: target.value, period: periodValue });

    hourValue = target.value;

    const finalValue = new Time(hourValueMod, Number(minuteValue));

    value = finalValue;

    if (onchange) {
      onchange(finalValue);
    }
  }

  function onchangeMinute(e: Event) {
    const target = e.target as HTMLInputElement;
    const hourValueMod = convert12To24Hour({ hour: target.value, period: periodValue });

    minuteValue = target.value;
    const finalValue = new Time(hourValueMod, Number(minuteValue));

    value = finalValue;

    if (onchange) {
      onchange(finalValue);
    }
  }

  function onchangePeriod(val: string) {
    const hourValueMod = convert12To24Hour({ hour: hourValue, period: val });

    periodValue = val;

    const finalValue = new Time(hourValueMod, Number(minuteValue));

    value = finalValue;

    if (onchange) {
      onchange(finalValue);
    }
  }
</script>

<div class={['TimeSelect', theme, className].join(' ')}>
  <NumericInput
    value={Number(hourValue)}
    oninput={onchangeHour}
    {name}
    {error}
    {disabled}
    min={1}
    max={12}
  />
  <NumericInput
    value={Number(minuteValue)}
    oninput={onchangeMinute}
    {name}
    {error}
    {disabled}
    min={0}
    max={59}
  />
  <Select
    options={periodOptions}
    value={periodValue}
    onchange={onchangePeriod}
    {error}
    {disabled}
  />
</div>
