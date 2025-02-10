<script lang="ts" module>
  export interface SearchProps {
    name?: string;
    id?: string;
    label?: string;
    placeholder?: string;
    value?: string;
    disabled?: boolean;
    class?: string;
    onchange?: (e: Event) => void;
    oninput?: (e: Event) => void;
    onsearch?: () => void;
    onclear?: () => void;
    onfocus?: () => void;
    onblur?: () => void;
  }
</script>

<script lang="ts">
  import Icon from '@iconify/svelte';

  let {
    name,
    id,
    placeholder,
    value = $bindable<string>(),
    onchange,
    oninput,
    disabled = false,
    onsearch,
    onclear,
    class: className = '',
    onfocus,
    onblur,
  }: SearchProps = $props();

  let active = $state(false);

  function handleKeyPress(e: KeyboardEvent) {
    if (e.key === 'Enter' && onsearch) {
      onsearch();
      return;
    }

    if (e.key === 'Escape' && onclear) {
      onclear();
      return;
    }
  }

  function handleOnFocus() {
    active = true;

    if (onfocus) {
      onfocus();
    }
  }

  function handleOnBlur() {
    active = false;

    if (onblur) {
      onblur();
    }
  }
</script>

<div class={`Search ${className}`} class:active class:disabled>
  {#if !active}
    <span class="search-icon" class:disabled>
      <Icon icon="material-symbols:search" />
    </span>
  {/if}

  <input
    type="text"
    {name}
    {id}
    {placeholder}
    bind:value
    {onchange}
    {oninput}
    {disabled}
    onfocus={handleOnFocus}
    onblur={handleOnBlur}
    onkeydown={handleKeyPress}
  />
  {#if value && !disabled}
    <button class="close-icon" onclick={onclear}>
      <Icon icon="material-symbols:close-rounded" />
    </button>
  {/if}
</div>

<style lang="scss">
  div {
    display: flex;
    color: var(--color-grey-font-900);
    transition: all 100ms;
    border: 1px solid;
    border-color: var(--color-grey-500);
    height: var(--size-ui-element-input-height);
    border-radius: 30px;
    overflow: hidden;
    position: relative;
    transition: all 100ms;
    background-color: var(--color-white);

    &:not(.disabled) {
      &.active {
        border-color: var(--color-primary-600);
      }
    }

    &.disabled {
      background-color: var(--color-grey-200);
      color: var(--color-grey-font-400);
      border-color: var(--color-grey-200);
    }
  }

  input {
    font-size: 1rem;
    font-weight: 400;
    outline: none;
    border: 0;
    height: 100%;
    padding: 0;
    background-color: transparent;
    letter-spacing: 0.3px;
    flex: 1;
    position: relative;
    z-index: 1;
    padding-left: var(--size-ui-element-input-height);
    transition: all 100ms;
    width: 100%;
    font-family: inherit;
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

    &::-webkit-search-decoration,
    &::-webkit-search-cancel-button {
      appearance: none;
    }

    &:focus {
      padding-left: 24px;
    }
  }

  .search-icon {
    display: inline-flex;
    height: 100%;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    font-size: 1.4rem;
    width: var(--size-ui-element-input-height);

    &:not(.disabled) {
      color: var(--color-grey-font-900);
    }
  }

  .close-icon {
    font-size: 1.3rem;
    height: 100%;
    width: var(--size-ui-element-input-height);
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 100ms;
    background-color: transparent;
    border: 0;
    border-radius: 30px;
    color: var(--color-grey-font-900);
    display: inline-flex;

    &:hover {
      background-color: var(--color-primary-200);
    }

    &:active {
      background-color: var(--color-primary-300);
    }
  }
</style>
