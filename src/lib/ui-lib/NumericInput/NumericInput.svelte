<script lang="ts" module>
  export type DynamicInputFocusEvent = FocusEvent & {
    currentTarget: EventTarget & (HTMLInputElement | HTMLButtonElement);
  };

  export type DynamicInputKeyboardEvent = KeyboardEvent & {
    currentTarget: EventTarget & (HTMLInputElement | HTMLButtonElement);
  };

  export type NumericInputFocusEvent = FocusEvent & {
    currentTarget: EventTarget & HTMLInputElement;
  };

  export type NumericInputClipboardEvent = ClipboardEvent & {
    currentTarget: EventTarget & HTMLInputElement;
  };

  export type NumericInputInputEvent = Event & {
    currentTarget: EventTarget & HTMLInputElement;
  };

  export type NumericInputKeyboardEvent = KeyboardEvent & {
    currentTarget: EventTarget & HTMLInputElement;
  };

  export interface NumericInputProps {
    /** Input ref */
    ref?: HTMLInputElement;
    /** Input value */
    value?: number;
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
  }
</script>

<script lang="ts">
  import { AppColorSchemes, useThemeStore } from '$lib/stores/theme.svelte';
  import type {
    FormEventHandler,
    ChangeEventHandler,
    FocusEventHandler,
    ClipboardEventHandler,
    KeyboardEventHandler,
  } from 'svelte/elements';

  import './NumericInput.style.scss';
  import type { Snippet } from 'svelte';

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
    before,
    after,
    error = false,
    value = $bindable<number>(),
    placeholder,
    ref = $bindable<HTMLInputElement>(),
    readonly = false,
  }: NumericInputProps = $props();

  let focused: boolean = $state(false);

  function onfocusMod(e: DynamicInputFocusEvent) {
    const eTyped = e as NumericInputFocusEvent;

    focused = true;

    if (onfocus) {
      onfocus(eTyped);
    }
  }

  function onblurMod(e: DynamicInputFocusEvent) {
    const eTyped = e as NumericInputFocusEvent;

    focused = false;

    if (onblur) {
      onblur(eTyped);
    }
  }

  const theme = $derived(
    useThemeStore.theme === AppColorSchemes.DARK ? 'theme--dark' : 'theme--light',
  );
</script>

<div class={['NumericInput', theme, className].join(' ')} class:error class:disabled class:focused>
  <div class="before">
    {@render before?.()}
  </div>

  <input
    type="number"
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
    onkeydown={onkeydown ? (e) => onkeydown(e as NumericInputKeyboardEvent) : undefined}
    onkeypress={onkeypress ? (e) => onkeypress(e as NumericInputKeyboardEvent) : undefined}
    onkeyup={onkeyup ? (e) => onkeyup(e as NumericInputKeyboardEvent) : undefined}
    {placeholder}
    bind:value
    {readonly}
  />

  <div class="after">
    {@render after?.()}
  </div>
</div>
