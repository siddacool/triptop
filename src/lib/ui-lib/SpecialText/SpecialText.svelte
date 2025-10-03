<script lang="ts" module>
  import type { Snippet } from 'svelte';

  export interface SpecialTextProps {
    /** SpecialText contents goes here */
    children?: Snippet;
    /** SpecialText ref */
    ref?: HTMLSpanElement;
    /** Custom css class*/
    class?: string;
    /** Font Weight: 200 - 900 */
    fontWeight?: number;
    /** italic */
    italic?: boolean;
    /** width: 75 - 125 */
    width?: number;
  }
</script>

<script lang="ts">
  let {
    children,
    class: className = '',
    ref = $bindable<HTMLSpanElement>(),
    fontWeight = 400,
    italic = false,
    width = 100,
  }: SpecialTextProps = $props();

  import './SpecialText.style.scss';
</script>

<span
  class={['SpecialText', className].join(' ')}
  bind:this={ref}
  style:--SpecialText-font-weight={fontWeight}
  style:--SpecialText-italic={italic ? 'italic' : 'normal'}
  style:--SpecialText-width={width}
>
  {@render children?.()}
</span>
