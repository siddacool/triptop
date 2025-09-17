<script lang="ts" module>
  export interface TimePickerProps {
    disabled?: boolean | null | undefined;
    error?: boolean;
    class?: string;
    name: string;
    placeholder?: string;
    value?: TimeValue;
    onchange?: (time: TimeValue | undefined) => void;
  }
</script>

<script lang="ts">
  import { AppColorSchemes, useThemeStore } from '$lib/stores/theme.svelte';
  import { TimeField, type TimeValue } from 'bits-ui';

  import './TimePicker.style.scss';

  let {
    class: className = '',
    disabled,
    name,
    onchange,
    value = $bindable<TimeValue>(),
    placeholder,
    error = false,
  }: TimePickerProps = $props();

  const theme = $derived(
    useThemeStore.theme === AppColorSchemes.DARK ? 'theme--dark' : 'theme--light',
  );
</script>

<TimeField.Root bind:value onValueChange={onchange} locale="de">
  <div class={['TimePicker', theme, className].join(' ')}>
    <TimeField.Input
      class={[
        'TimePickerInput',
        `${error ? 'error' : ''}`,
        `${disabled ? 'disabled' : ''}`,
        theme,
      ].join(' ')}
      {name}
      {placeholder}
    >
      {#snippet children({ segments })}
        {#each segments as { part, value }, i (part + i)}
          <div class="TimePickerInputSegmentHolder">
            {#if part === 'literal'}
              <TimeField.Segment {part} class="TimePickerInputSegment">
                {value}
              </TimeField.Segment>
            {:else}
              <TimeField.Segment {part} class="TimePickerInputSegment">
                {value}
              </TimeField.Segment>
            {/if}
          </div>
        {/each}
      {/snippet}
    </TimeField.Input>
  </div>
</TimeField.Root>
