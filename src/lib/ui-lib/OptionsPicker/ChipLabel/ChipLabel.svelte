<script lang="ts" module>
  export interface ChipLabelProps {
    disabled?: boolean | null | undefined;
    class?: string;
    name: string;
    index: number;
    value?: string[];
    onchange?: (value: string) => void;
    option: OptionsPickerOption;
    label?: (val: OptionsPickerOption) => Snippet;
    type: OptionsPickerType;
  }
</script>

<script lang="ts">
  import { AppColorSchemes, useThemeStore } from '$lib/stores/theme.svelte';

  import './ChipLabel.style.scss';
  import type { Snippet } from 'svelte';
  import Icon from '@iconify/svelte';
  import Label from '../../Label';
  import type { OptionsPickerOption, OptionsPickerType } from '../OptionsPicker.svelte';

  let {
    class: className = '',
    disabled,
    option,
    name,
    onchange,
    value = [],
    label: labelInternal,
    index,
    type,
  }: ChipLabelProps = $props();

  const theme = $derived(
    useThemeStore.theme === AppColorSchemes.DARK ? 'theme--dark' : 'theme--light',
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let labelTyped = labelInternal as any;
</script>

<div
  class={[
    'ChipLabel',
    theme,
    type === 'single' ? 'ChipLabelSingle' : 'ChipLabelMultiple',
    className,
  ].join(' ')}
>
  <input
    {name}
    type={type === 'single' ? 'radio' : 'checkbox'}
    id={`${name}-${index}`}
    {disabled}
    checked={value.includes(option.value)}
    onchange={() => (onchange ? onchange(option.value) : undefined)}
    value={option.value}
  />

  <Label for={`${name}-${index}`}>
    {#if type === 'single'}
      <Icon icon="material-symbols:check-rounded" width="24" height="24" class="checkIcon" />
    {/if}

    {#if labelTyped}
      {@render labelTyped(option)}
    {:else}
      {option.label}
    {/if}

    {#if type === 'multiple'}
      <Icon icon="material-symbols:close-small" width="24" height="24" class="checkIcon" />
    {/if}
  </Label>
</div>
