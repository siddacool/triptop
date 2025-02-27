<script lang="ts">
  import type { SvelteComponentProps } from '$lib/types/svelte-component';

  type CardProps = SvelteComponentProps;

  const { children }: CardProps = $props();
</script>

<div class="Card">
  {#if children}
    {@render children()}
  {/if}
</div>

<style lang="scss">
  div {
    background-color: var(--color-white);
    display: block;
    border: 1px solid;
    border-color: var(--color-grey-500);
    padding: 16px;
    border-radius: 20px;
    transition: background-color 100ms;
  }
</style>
