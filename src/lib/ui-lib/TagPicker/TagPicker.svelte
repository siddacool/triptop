<script lang="ts" module>
  export interface TagPickerOption {
    value: string;
    label: string;
  }

  export interface TagPickerProps {
    disabled?: boolean | null | undefined;
    ref?: HTMLDivElement;
    class?: string;
    name: string;
    value?: string[];
    onchange?: (value: string) => void;
    onclear?: () => void;
    options: TagPickerOption[];
    label?: (val: TagPickerOption) => Snippet;
  }
</script>

<script lang="ts">
  import { AppColorSchemes, useThemeStore } from '$lib/stores/theme.svelte';

  import './TagPicker.style.scss';
  import type { Snippet } from 'svelte';
  import Icon from '@iconify/svelte';
  import Label from '../Label';
  import Button from '../Button';

  let {
    class: className = '',
    disabled,
    ref = $bindable<HTMLDivElement>(),
    options,
    name,
    onchange,
    onclear,
    value = [],
    label: labelInternal,
  }: TagPickerProps = $props();

  const theme = $derived(
    useThemeStore.theme === AppColorSchemes.DARK ? 'theme--dark' : 'theme--light',
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let labelTyped = labelInternal as any;

  $effect(() => {
    console.log(value);
  });
</script>

<div class={['TagPicker', theme, className].join(' ')} bind:this={ref}>
  {#each options as option, index (option.value)}
    <div class="TagPickerChip">
      <input
        type="checkbox"
        id={`${name}-${index}`}
        {disabled}
        checked={value.includes(option.value)}
        onchange={() => (onchange ? onchange(option.value) : undefined)}
      />
      <Label for={`${name}-${index}`}>
        {#if labelTyped}
          {@render labelTyped(option)}
        {:else}
          {option.label}
        {/if}

        <Icon icon="material-symbols:close-small" width="24" height="24" class="checkIcon" />
      </Label>
    </div>
  {/each}

  {#if onclear && options.length && value.length}
    <Button class="ClearAll" onclick={onclear} compact aria-label="Clear Filter">
      <Icon icon="material-symbols:close-small" width="28" height="28" class="checkIcon" />
    </Button>
  {/if}
</div>
