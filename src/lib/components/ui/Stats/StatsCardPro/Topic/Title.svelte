<script lang="ts">
  import type { Snippet } from 'svelte';

  type Props = {
    class?: string;
    children?: Snippet;
  };

  let { class: className = '', children }: Props = $props();

  const classes = $derived(['topic-cell', 'Title', className].filter(Boolean));
</script>

<div class={classes.join(' ')}>
  <div class="box">
    {@render children?.()}
  </div>
</div>

<style lang="scss">
  .Title {
    white-space: nowrap;
    font-weight: 500;
    padding-left: 0;
  }

  .box {
    display: flex;
    align-items: center;
  }
</style>
