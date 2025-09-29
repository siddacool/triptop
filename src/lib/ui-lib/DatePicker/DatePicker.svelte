<script lang="ts" module>
  export interface DatePickerProps {
    disabled?: boolean | null | undefined;
    error?: boolean;
    class?: string;
    name: string;
    placeholder?: string;
    value?: DateValue;
    initialDate?: DateValue;
    onchange?: (date: DateValue | undefined) => void;
    maxValue?: DateValue;
    minValue?: DateValue;
  }
</script>

<script lang="ts">
  import { AppColorSchemes, useThemeStore } from '$lib/stores/theme.svelte';
  import { DatePicker } from 'bits-ui';

  import './DatePicker.style.scss';
  import Icon from '@iconify/svelte';
  import type { DateValue } from '@internationalized/date';
  import InputSegment from './InputSegment.svelte';

  let {
    class: className = '',
    disabled,
    name,
    onchange,
    value = $bindable<DateValue>(),
    placeholder,
    error = false,
    maxValue,
    minValue,
    initialDate,
  }: DatePickerProps = $props();

  const theme = $derived(
    useThemeStore.theme === AppColorSchemes.DARK ? 'theme--dark' : 'theme--light',
  );
</script>

<DatePicker.Root
  weekdayFormat="short"
  fixedWeeks={true}
  bind:value
  onValueChange={onchange}
  {maxValue}
  {minValue}
  placeholder={value || initialDate}
>
  <div class={['DatePicker', theme, className].join(' ')}>
    <DatePicker.Input
      class={[
        'DatePickerInput',
        `${error ? 'error' : ''}`,
        `${disabled ? 'disabled' : ''}`,
        theme,
      ].join(' ')}
      {name}
      {placeholder}
    >
      {#snippet children({ segments })}
        <InputSegment data={segments} />
        <DatePicker.Trigger class="DatePickerTrigger" {disabled}>
          <Icon icon="material-symbols:calendar-month-rounded" width="24" height="24" />
        </DatePicker.Trigger>
      {/snippet}
    </DatePicker.Input>
    <DatePicker.Content
      sideOffset={6}
      class={['DatePickerContent', 'dodo-shadow-5', theme].join(' ')}
    >
      <DatePicker.Calendar class="DatePickerCalendar">
        {#snippet children({ months, weekdays })}
          <DatePicker.Header class="DatePickerHeader">
            <DatePicker.PrevButton class="DatePickerNavButton">
              <Icon icon="material-symbols:arrow-left-rounded" width="30" height="30" />
            </DatePicker.PrevButton>
            <DatePicker.Heading class="text-[15px] font-medium" />
            <DatePicker.NextButton class="DatePickerNavButton">
              <Icon icon="material-symbols:arrow-right-rounded" width="30" height="30" />
            </DatePicker.NextButton>
          </DatePicker.Header>
          <div class="DatePickerCalendarContent">
            {#each months as month (month.value)}
              <DatePicker.Grid class="DatePickerGrid">
                <DatePicker.GridHead>
                  <DatePicker.GridRow class="DatePickerGridRow">
                    {#each weekdays as day (day)}
                      <DatePicker.HeadCell class="DatePickerHeadCell">
                        <div>{day.slice(0, 2)}</div>
                      </DatePicker.HeadCell>
                    {/each}
                  </DatePicker.GridRow>
                </DatePicker.GridHead>
                <DatePicker.GridBody>
                  {#each month.weeks as weekDates (weekDates)}
                    <DatePicker.GridRow class="DatePickerGridRow">
                      {#each weekDates as date (date)}
                        <DatePicker.Cell
                          {date}
                          month={month.value}
                          class={['DatePickerGridCell', theme].join(' ')}
                        >
                          <DatePicker.Day class="DatePickerDay">
                            {date.day}
                          </DatePicker.Day>
                        </DatePicker.Cell>
                      {/each}
                    </DatePicker.GridRow>
                  {/each}
                </DatePicker.GridBody>
              </DatePicker.Grid>
            {/each}
          </div>
        {/snippet}
      </DatePicker.Calendar>
    </DatePicker.Content>
  </div>
</DatePicker.Root>
