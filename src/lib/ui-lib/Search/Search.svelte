<script lang="ts" module>
  export interface SearchProps {
    /** Input ref */
    ref?: HTMLInputElement;
    /** Input value */
    value?: string;
    /** How round should the border radius be? */
    placeholder?: string;
    /** disabled state */
    disabled?: boolean;
    /** Read only ? */
    readonly?: boolean;
    /** is there any associated Error ? */
    error?: boolean;
    /** Name */
    name?: string;
    /** Id */
    id?: string;
    /** Icon before button content */
    before?: Snippet;
    /** Icon after button content */
    after?: Snippet;
    /** Custom css class*/
    class?: string;
    /** oninput event handler */
    oninput?: FormEventHandler<HTMLInputElement>;
    /** onchange event handler */
    onchange?: ChangeEventHandler<HTMLInputElement>;
    /** onblur event handler */
    onblur?: FocusEventHandler<HTMLInputElement>;
    /** onfocus event handler */
    onfocus?: FocusEventHandler<HTMLInputElement>;
    /** onpaste event handler */
    onpaste?: ClipboardEventHandler<HTMLInputElement>;
    /** oncopy event handler */
    oncopy?: ClipboardEventHandler<HTMLInputElement>;
    /** oncut event handler */
    oncut?: ClipboardEventHandler<HTMLInputElement>;
    /** onkeydown event handler */
    onkeydown?: KeyboardEventHandler<HTMLInputElement>;
    /** onkeypress event handler */
    onkeypress?: KeyboardEventHandler<HTMLInputElement>;
    /** onkeyup event handler */
    onkeyup?: KeyboardEventHandler<HTMLInputElement>;
    /** onsearch event handler */
    onsearch?: () => void;
    /** onclear event handler */
    onclear?: () => void;
  }
</script>

<script lang="ts">
  import type {
    FormEventHandler,
    ChangeEventHandler,
    FocusEventHandler,
    ClipboardEventHandler,
    KeyboardEventHandler,
  } from 'svelte/elements';

  import './Search.style.scss';
  import type { Snippet } from 'svelte';
  import type {
    DynamicInputFocusEvent,
    DynamicInputKeyboardEvent,
    TextInputFocusEvent,
    TextInputKeyboardEvent,
  } from '../TextInput/TextInput.svelte';
  import Icon from '@iconify/svelte';
  import InputEnclosure from '../InputEnclosure';

  let {
    name,
    id,
    class: className = '',
    disabled = false,
    oninput,
    onchange,
    onblur,
    onfocus,
    onpaste,
    oncopy,
    oncut,
    onkeydown,
    onkeypress,
    onkeyup,
    onsearch,
    onclear,
    before,
    after,
    error = false,
    value = $bindable<string>(),
    placeholder,
    ref = $bindable<HTMLInputElement>(),
    readonly = false,
  }: SearchProps = $props();

  let focused: boolean = $state(false);

  function onfocusMod(e: DynamicInputFocusEvent) {
    const eTyped = e as TextInputFocusEvent;

    focused = true;

    if (onfocus) {
      onfocus(eTyped);
    }
  }

  function onblurMod(e: DynamicInputFocusEvent) {
    const eTyped = e as TextInputFocusEvent;

    focused = false;

    if (onblur) {
      onblur(eTyped);
    }
  }

  function onkeydownMod(e: DynamicInputKeyboardEvent) {
    const eTyped = e as TextInputKeyboardEvent;

    if (onkeydown) {
      onkeydown(eTyped);
    }

    if (e.key === 'Enter' && onsearch) {
      e.preventDefault();

      onsearch();
      return;
    }

    if (e.key === 'Escape' && onclear) {
      e.preventDefault();

      onclear();
      return;
    }
  }
</script>

<InputEnclosure
  class={['Search', className].join(' ')}
  {error}
  {disabled}
  {focused}
  {before}
  {after}
>
  <div class="SearchIcon">
    <Icon icon="material-symbols:search-rounded" width="24" height="24" />
  </div>

  <input
    type="search"
    {name}
    {id}
    {disabled}
    bind:this={ref}
    {oninput}
    {onchange}
    onfocus={onfocusMod}
    onblur={onblurMod}
    {onpaste}
    {oncopy}
    {oncut}
    onkeydown={onkeydownMod}
    onkeypress={onkeypress ? (e) => onkeypress(e as TextInputKeyboardEvent) : undefined}
    onkeyup={onkeyup ? (e) => onkeyup(e as TextInputKeyboardEvent) : undefined}
    {placeholder}
    bind:value
    {readonly}
  />

  {#if value && onclear && !disabled}
    <button class="SearchClear" title="Clear" onclick={onclear}>
      <Icon icon="material-symbols:close-small" width="28" height="28" />
    </button>
  {/if}
</InputEnclosure>
