<script lang="ts" module>
  import type { Snippet } from 'svelte';

  export interface LabelProps {
    /** Label contents goes here */
    children?: Snippet;
    /** Label ref */
    ref?: HTMLLabelElement;
    /** id of the form element the label should be bound to */
    for?: string;
    /** Specifies which form the label belongs to */
    form?: string;
    /** Custom css class*/
    class?: string;
  }
</script>

<script lang="ts">
  let {
    children,
    class: className = '',
    for: htmlFor,
    form,
    ref = $bindable<HTMLLabelElement>(),
  }: LabelProps = $props();

  import './Label.style.scss';
</script>

<label class={['Label', className].join(' ')} for={htmlFor} {form} bind:this={ref}>
  {#if children}
    {@render children()}
  {/if}
</label>
