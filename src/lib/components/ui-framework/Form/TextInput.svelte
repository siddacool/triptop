<script lang="ts">
  import ErrorMessage from './shared/ErrorMessage.svelte';
  import FormLabel from './shared/FormLabel.svelte';

  interface TextInputProps {
    name?: string;
    id?: string;
    label?: string;
    placeholder?: string;
    value?: string;
    disabled?: boolean;
    error?: string;
    onchange?: (e: Event) => void;
    oninput?: (e: Event) => void;
    type?: 'text' | 'email' | 'mobile';
  }

  let {
    name,
    id,
    label,
    placeholder,
    value = $bindable<string>(),
    onchange,
    oninput,
    disabled = false,
    error,
    type = 'text',
  }: TextInputProps = $props();

  let active = $state(false);
</script>

<div class="TextInput">
  {#if label}
    <FormLabel {name} {error} {active} {disabled} {label} />
  {/if}

  <input
    {type}
    {name}
    {id}
    {placeholder}
    bind:value
    {onchange}
    {oninput}
    {disabled}
    onfocus={() => (active = true)}
    onblur={() => (active = false)}
    class:error
  />

  {#if error && !disabled}
    <ErrorMessage message={error} />
  {/if}
</div>

<style lang="scss">
  div {
    display: flex;
    flex-direction: column;
    color: var(--color-grey-font-900);
  }

  input {
    font-size: 1rem;
    font-weight: 400;
    outline: none;
    height: var(--size-ui-element-input-height);
    padding: 0 12px;
    border: 1px solid;
    border-color: var(--color-grey-500);
    border-radius: 10px;
    background-color: transparent;
    transition: all 100ms;
    font-family: inherit;
    background-color: var(--color-white);
    color: var(--color-black-pure);

    &::-webkit-input-placeholder {
      /* Chrome */
      color: var(--color-grey-font-600);
    }

    &:-ms-input-placeholder {
      /* IE 10+ */
      color: var(--color-grey-font-600);
    }

    &::-moz-placeholder {
      /* Firefox 19+ */
      color: var(--color-grey-font-600);
      opacity: 1;
    }

    &:-moz-placeholder {
      /* Firefox 4 - 18 */
      color: var(--color-grey-font-600);
      opacity: 1;
    }

    &:not(.error):not([disabled]) {
      &:focus {
        border-color: var(--color-primary-600);
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
    }
  }
</style>
