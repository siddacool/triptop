<script lang="ts">
  import ErrorMessage from './shared/ErrorMessage.svelte';
  import FormLabel from './shared/FormLabel.svelte';

  interface TextAreaProps {
    name?: string;
    id?: string;
    label?: string;
    value?: string;
    disabled?: boolean;
    error?: string;
    onchange?: (e: Event) => void;
    oninput?: (e: Event) => void;
  }

  let {
    name,
    id,
    label,
    value = $bindable<string>(),
    onchange,
    oninput,
    disabled = false,
    error,
  }: TextAreaProps = $props();

  let active = $state(false);
</script>

<div class="TextArea">
  {#if label}
    <FormLabel {name} {error} {active} {disabled} {label} />
  {/if}

  <textarea
    {name}
    {id}
    bind:value
    {onchange}
    {oninput}
    {disabled}
    onfocus={() => (active = true)}
    onblur={() => (active = false)}
    class:error
    rows={4}
    cols={50}
  ></textarea>

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

  textarea {
    font-size: 1rem;
    font-weight: 400;
    outline: none;
    padding: 14px;
    border: 1px solid;
    border-color: var(--color-grey-500);
    border-radius: 10px;
    background-color: transparent;
    transition: all 100ms;
    font-family: inherit;
    background-color: var(--color-white);
    color: var(--color-black-pure);
    resize: vertical;
    width: 100%;

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
