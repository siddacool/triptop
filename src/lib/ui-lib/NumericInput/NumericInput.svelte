<script lang="ts" module>
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
    /** Allow Negative */
    allowNegative?: boolean;
    /** Decimal Places */
    decimalPlaces?: number;
    /** prefix */
    prefix?: string;
    /** suffix */
    suffix?: string;
    /** Get comma separated Currency value */
    formatCurrency?: boolean;
    /** Lakh Separator (for Indian Currency) */
    lakhSeparator?: boolean;
    /** min, should not be less than -9999999999999.99 */
    min?: number;
    /** max, should not exceed 9999999999999.99 */
    max?: number;
    /** on Numeric Value Change */
    onValueChange?: (value: number | undefined, formattedValue: string) => void;
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

  import './NumericInput.style.scss';
  import type { Snippet } from 'svelte';
  import type {
    DynamicInputFocusEvent,
    TextInputFocusEvent,
    TextInputKeyboardEvent,
  } from '../TextInput/TextInput.svelte';
  import InputEnclosure from '../InputEnclosure';
  import { NumericInput as FlightlesslabsNumericInput } from '@flightlesslabs/number-format';

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
    allowNegative,
    decimalPlaces = 0,
    prefix,
    suffix,
    formatCurrency,
    lakhSeparator,
    min,
    max,
    onValueChange,
  }: NumericInputProps = $props();

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
  class={['NumericInput', className].join(' ')}
  {error}
  {disabled}
  {focused}
  {before}
  {after}
>
  <FlightlesslabsNumericInput
    bind:value
    {name}
    {id}
    {disabled}
    {ref}
    {oninput}
    {onchange}
    onfocus={onfocusMod}
    onblur={onblurMod}
    {onpaste}
    {oncopy}
    {oncut}
    onkeydown={onkeydown ? (e) => onkeydown(e as TextInputKeyboardEvent) : undefined}
    onkeypress={onkeypress ? (e) => onkeypress(e as TextInputKeyboardEvent) : undefined}
    onkeyup={onkeyup ? (e) => onkeyup(e as TextInputKeyboardEvent) : undefined}
    {placeholder}
    {readonly}
    {min}
    {max}
    {allowNegative}
    {decimalPlaces}
    {prefix}
    {suffix}
    {formatCurrency}
    {lakhSeparator}
    {onValueChange}
  />
</InputEnclosure>
