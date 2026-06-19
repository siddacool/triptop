<script lang="ts">
  import type { Snippet } from 'svelte';
  import BackButton from '../BackButton/BackButton.svelte';

  type Props = {
    href?: string;
    children?: Snippet;
    controls?: Snippet;
    class?: string;
  };

  let { href, children, controls, class: className = '' }: Props = $props();

  const classes = $derived(['PageHeadingNav', className].filter(Boolean));
</script>

<div class={classes.join(' ')}>
  {#if href}
    <BackButton {href} />
  {/if}

  <div class="content">
    {@render children?.()}
  </div>

  {#if controls}
    <div class="controls">
      {@render controls?.()}
    </div>
  {/if}
</div>

<style lang="scss">
  .PageHeadingNav {
    display: flex;
    align-items: center;

    .content {
      margin: 0 var(--dodo-ui-space);
      font-size: 1.1rem;
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      @media (min-width: 600px) {
        font-size: 1.2rem;
      }
    }
  }
</style>
