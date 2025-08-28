<script lang="ts" module>
  import type { Snippet } from 'svelte';

  export interface FormControlProps {
    /** FormControl contents goes here */
    children?: Snippet;
    /** Label for FormControl */
    label?: string;
    /** is there any associated Error Message ? */
    errorMessage?: string;
    /** Label ref */
    ref?: HTMLDivElement;
    /** id of the form element the label should be bound to */
    for?: string;
    /** Specifies which form the label belongs to */
    form?: string;
    /** Custom css class*/
    class?: string;
  }
</script>

<script lang="ts">
  import Label from '../Label';
  import Message from '../Message';
  import './FormControl.style.scss';

  let {
    children,
    label,
    class: className = '',
    for: htmlFor,
    form,
    ref = $bindable<HTMLDivElement>(),
    errorMessage,
  }: FormControlProps = $props();
</script>

<div class={['FormControl', className].join(' ')} bind:this={ref}>
  {#if label}
    <div class="LabelSection">
      <Label for={htmlFor} {form}>{label}</Label>
    </div>
  {/if}
  <div class="content">
    {#if children}
      {@render children()}
    {/if}
  </div>
  {#if errorMessage}
    <div class="errorMessage">
      <Message color="danger">{errorMessage}</Message>
    </div>
  {/if}
</div>
