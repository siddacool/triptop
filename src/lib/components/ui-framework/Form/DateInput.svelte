<script lang="ts">
  import { getMoment } from '$lib/helpers/time';
  import Icon from '@iconify/svelte';
  import ErrorMessage from './shared/ErrorMessage.svelte';
  import FormLabel from './shared/FormLabel.svelte';

  interface DateInputProps {
    name?: string;
    id?: string;
    label?: string;
    placeholder?: string;
    value?: string;
    disabled?: boolean;
    error?: string;
    onchange?: (e: Event) => void;
    oninput?: (e: Event) => void;
    min?: string;
    max?: string;
  }

  let {
    name,
    id,
    label,
    placeholder = 'Select date',
    value = $bindable<string>(),
    onchange,
    oninput,
    disabled = false,
    error,
    min,
    max,
  }: DateInputProps = $props();

  let dateInputElement: HTMLInputElement | undefined = $state(undefined);
  let active = $state(false);

  function onclick(e: MouseEvent) {
    e.preventDefault();

    if (!dateInputElement) {
      return;
    }

    if (dateInputElement.showPicker) {
      dateInputElement.showPicker();
    } else {
      dateInputElement.focus();
    }
  }
</script>

<div class="DateInput">
  {#if label}
    <FormLabel {name} {error} {active} {disabled} {label} />
  {/if}

  <input
    type="date"
    {name}
    {id}
    bind:value
    {onchange}
    {oninput}
    {disabled}
    {min}
    {max}
    bind:this={dateInputElement}
  />

  <button
    class="mockInput"
    {disabled}
    class:error
    {onclick}
    onfocus={() => (active = true)}
    onblur={() => (active = false)}
  >
    {#if value}
      {getMoment(value, 'YYYY-MM-DD').format('MMM D, YYYY')}
    {:else}
      <div class="placeholder">{placeholder}</div>
    {/if}

    <div class="InputIcon">
      <Icon icon="mdi:calendar" />
    </div>
  </button>

  {#if error && !disabled}
    <ErrorMessage message={error} />
  {/if}
</div>

<style lang="scss">
  .DateInput {
    display: flex;
    flex-direction: column;
    color: var(--color-grey-font-900);
    position: relative;

    input {
      opacity: 0;
      position: absolute;
      z-index: -100;
    }

    .mockInput {
      font-size: 1rem;
      font-weight: 400;
      outline: none;
      height: var(--size-ui-element-input-height);
      padding: 0 14px;
      border: 1px solid;
      border-color: var(--color-grey-500);
      border-radius: 10px;
      background-color: transparent;
      transition: all 100ms;
      font-family: inherit;
      background-color: var(--color-white);
      color: var(--color-black-pure);
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      &:not(.error):not([disabled]) {
        &:focus {
          border-color: var(--color-primary-600);

          .InputIcon {
            color: var(--color-primary-700);
          }
        }
      }

      &:not([disabled]) {
        &.error {
          border-color: var(--color-danger-400);

          &:focus {
            border-color: var(--color-danger-600);
          }
        }
      }

      &[disabled] {
        background-color: var(--color-grey-200);
        color: var(--color-grey-font-400);
        border-color: var(--color-grey-200);

        .placeholder {
          color: var(--color-grey-font-400);
        }

        .InputIcon {
          color: var(--color-grey-font-400);
        }
      }

      .placeholder {
        color: var(--color-grey-font-600);
      }

      .InputIcon {
        font-size: 1.4rem;
        color: var(--color-grey-font-600);
        height: 100%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding-top: 2px;
        margin-right: -4px;
      }
    }
  }
</style>
