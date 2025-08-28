<script lang="ts" module>
  import type { Snippet } from 'svelte';

  export interface MessageProps {
    /** Message contents goes here */
    children?: Snippet;
    /** Message ref */
    ref?: HTMLDivElement;
    /** What color to use? */
    color?: 'primary' | 'secondary' | 'neutral' | 'safe' | 'warning' | 'danger';
    /** Custom css class*/
    class?: string;
  }
</script>

<script lang="ts">
  let {
    children,
    class: className = '',
    color = 'primary',
    ref = $bindable<HTMLDivElement>(),
  }: MessageProps = $props();

  import './Message.style.scss';
</script>

<div class={['Message', `color--${color}`, className].join(' ')} bind:this={ref}>
  {@render children?.()}
</div>
