<script lang="ts">
  import Message from '$lib/ui-lib/Message/Message.svelte';
  import type { Snippet } from 'svelte';
  import FilterActiveDot from './FilterActiveDot.svelte';
  import OptionsPicker from '$lib/ui-lib/OptionsPicker';
  import type { OptionsPickerOption } from '$lib/ui-lib/OptionsPicker/OptionsPicker.svelte';

  interface FormOptionsPickerProps {
    class?: string;
    label?: string;
    errorMessage?: string;
    disabled?: boolean | null | undefined;
    ref?: HTMLDivElement;
    name: string;
    value?: string[];
    onchange?: (value: string) => void;
    onclear?: () => void;
    options: OptionsPickerOption[];
    tagLabel?: (val: OptionsPickerOption) => Snippet;
  }

  const {
    class: className = '',
    label,
    name,
    errorMessage,
    options,
    value = [],
    onchange,
    onclear,
    tagLabel,
  }: FormOptionsPickerProps = $props();
</script>

<div class={['FormOptionsPicker', className].join(' ')}>
  {#if label}
    <div class="LabelSection">
      {label}
      <FilterActiveDot show={value.length ? true : false} />
    </div>
  {/if}
  <div class="content">
    <OptionsPicker type="multiple" {options} {value} {onchange} {onclear} {name} label={tagLabel} />
  </div>
  {#if errorMessage}
    <div class="errorMessage">
      <Message color="danger">{errorMessage}</Message>
    </div>
  {/if}
</div>

<style lang="scss">
  .FormOptionsPicker {
    .LabelSection {
      font-size: 0.9rem;
      color: var(--dodo-color-neutral-800);
      display: flex;
      align-items: center;
      font-family: inherit;
      margin-bottom: 8px;
      margin-top: 4px;

      :global(.FilterActiveDot) {
        margin-left: 8px;
        margin-top: 2px;
      }
    }

    .errorMessage {
      margin-top: 12px;
    }
  }
</style>
