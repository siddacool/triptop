<script lang="ts" module>
  export interface OptionsPickerOption {
    value: string;
    label: string;
  }

  export type OptionsPickerType = 'single' | 'multiple';

  export interface OptionsPickerProps {
    disabled?: boolean | null | undefined;
    ref?: HTMLDivElement;
    class?: string;
    name: string;
    value?: string | string[];
    onchange?: (value: string) => void;
    onclear?: () => void;
    options: OptionsPickerOption[];
    label?: (val: OptionsPickerOption) => Snippet;
    type: OptionsPickerType;
  }
</script>

<script lang="ts">
  import './OptionsPicker.style.scss';
  import type { Snippet } from 'svelte';
  import ChipLabel from './ChipLabel';
  import Button from '../Button';
  import Icon from '@iconify/svelte';

  let {
    class: className = '',
    disabled,
    ref = $bindable<HTMLDivElement>(),
    options,
    name,
    onchange,
    onclear,
    value: valueInternal,
    label,
    type,
  }: OptionsPickerProps = $props();

  const value = $derived(
    typeof valueInternal === 'string' ? [valueInternal] : (valueInternal ?? []),
  );
</script>

<div class={['OptionsPicker', className].join(' ')} bind:this={ref}>
  {#each options as option, index (option.value)}
    <ChipLabel {label} {type} {value} {name} {option} {index} {onchange} {disabled} />
  {/each}

  {#if type === 'multiple' && onclear && options.length && value.length}
    <Button class="ClearAll" onclick={onclear} compact aria-label="Clear Filter">
      <Icon icon="material-symbols:close-small" width="28" height="28" class="checkIcon" />
    </Button>
  {/if}
</div>
