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

  const hourOptions = generatePaddedNumberOptions(1, 12);
  const minuteOptions = generatePaddedNumberOptions(1, 59);

  const periodOptions = [
    { value: 'AM', label: 'AM' },
    { value: 'PM', label: 'PM' },
  ];

  let hourValue = $derived(convert24To12HourObj(value.hour).hour);
  let minuteValue = $derived(`${value.minute}`);
  let periodValue = $derived(convert24To12HourObj(value.hour).period);

  function onchangeHour(val: string) {
    const hourValueMod = convert12To24Hour({ hour: val, period: periodValue });

    hourValue = val;

    const finalValue = new Time(hourValueMod, Number(minuteValue));

    value = finalValue;

    if (onchange) {
      onchange(finalValue);
    }
  }

  function onchangeMinute(val: string) {
    const hourValueMod = convert12To24Hour({ hour: hourValue, period: periodValue });

    minuteValue = val;
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
  <Select
    options={hourOptions}
    value={hourValue}
    onchange={onchangeHour}
    {name}
    {error}
    {disabled}
  />
  <Select
    options={minuteOptions}
    value={minuteValue}
    onchange={onchangeMinute}
    {error}
    {disabled}
  />
  <Select
    options={periodOptions}
    value={periodValue}
    onchange={onchangePeriod}
    {error}
    {disabled}
  />
</div>
