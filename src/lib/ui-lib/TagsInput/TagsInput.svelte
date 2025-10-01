<script lang="ts" module>
  export interface TagsInputChangeData {
    option?: string;
    options?: string[];
    type: `add` | `remove` | `removeAll`;
  }

  export interface TagsInputProps {
    /** Input value */
    value?: string[];
    /** options */
    options: string[];
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
    /** onchange event handler */
    onchange?: (data: TagsInputChangeData) => void;
  }
</script>

<script lang="ts">
  /* eslint-disable @typescript-eslint/no-explicit-any */
  import type {
    FormEventHandler,
    FocusEventHandler,
    ClipboardEventHandler,
    KeyboardEventHandler,
  } from 'svelte/elements';

  import './TagsInput.style.scss';
  import type { Snippet } from 'svelte';
  import type {
    DynamicInputFocusEvent,
    TextInputFocusEvent,
    TextInputKeyboardEvent,
  } from '../TextInput/TextInput.svelte';
  import InputEnclosure from '../InputEnclosure';
  import MultiSelect from 'svelte-multiselect';

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
    value = $bindable<string[]>([]),
    placeholder,
    readonly = false,
    options,
  }: TagsInputProps = $props();

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
</script>

<InputEnclosure
  class={['TagsInput', className].join(' ')}
  {error}
  {disabled}
  {focused}
  {before}
  {after}
>
  <MultiSelect
    bind:selected={value}
    {options}
    {oninput}
    onchange={onchange
      ? (onchange as (data: {
          option?: any;
          options?: any[];
          type: `add` | `remove` | `removeAll`;
        }) => unknown)
      : undefined}
    onfocus={onfocusMod}
    onblur={onblurMod}
    {onpaste}
    {oncopy}
    {oncut}
    onkeydown={onkeydown ? (e) => onkeydown(e as TextInputKeyboardEvent) : undefined}
    onkeypress={onkeypress
      ? (e: TextInputKeyboardEvent) => onkeypress(e as TextInputKeyboardEvent)
      : undefined}
    onkeyup={onkeyup ? (e) => onkeyup(e as TextInputKeyboardEvent) : undefined}
    {placeholder}
    {readonly}
    {name}
    {id}
    {disabled}
    allowUserOptions
  />
</InputEnclosure>
