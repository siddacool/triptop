<script lang="ts" module>
  export interface ChipPickerOption {
    value: string;
    label: string;
  }

  export interface ChipPickerProps {
    disabled?: boolean | null | undefined;
    ref?: HTMLDivElement;
    class?: string;
    name: string;
    value?: string;
    onchange?: (value: string) => void;
    options: ChipPickerOption[];
    label?: (val: ChipPickerOption) => Snippet;
  }
</script>

<script lang="ts">
  import { AppColorSchemes, useThemeStore } from '$lib/stores/theme.svelte';
  import { Label, RadioGroup } from 'bits-ui';

  import './ChipPicker.style.scss';
  import type { Snippet } from 'svelte';
  import Icon from '@iconify/svelte';

  const {
    class: className = '',
    disabled,
    ref = $bindable<HTMLDivElement>(),
    options,
    name,
    onchange,
    value,
    label: labelInternal,
  }: ChipPickerProps = $props();

  const theme = $derived(
    useThemeStore.theme === AppColorSchemes.DARK ? 'theme--dark' : 'theme--light',
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let labelTyped = labelInternal as any;
</script>

<RadioGroup.Root class={['ChipPicker', theme, className].join(' ')} {ref} {value}>
  {#each options as option, index (option.value)}
    <div class="ChipPickerChip">
      <RadioGroup.Item
        id={`${name}-${index}`}
        value={option.value}
        {disabled}
        onclick={() => (onchange ? onchange(option.value) : undefined)}
      />
      <Label.Root for={`${name}-${index}`}>
        <Icon icon="material-symbols:check-rounded" width="24" height="24" class="checkIcon" />
        {#if labelTyped}
          {@render labelTyped(option)}
        {:else}
          {option.label}
        {/if}
      </Label.Root>
    </div>
  {/each}
</RadioGroup.Root>
