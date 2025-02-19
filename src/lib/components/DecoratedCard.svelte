<script lang="ts">
  import type { SvelteComponentProps } from '$lib/types/svelte-component';
  import type { Snippet } from 'svelte';
  import Card from './ui-framework/Layout/Card.svelte';
  import H3 from './ui-framework/Headings/H3.svelte';

  interface DecoratedCardProps extends SvelteComponentProps {
    active?: boolean;
    href?: string;
    title?: Snippet;
    class?: string;
  }

  const {
    children,
    active = false,
    href,
    title,
    class: className = '',
  }: DecoratedCardProps = $props();
</script>

{#snippet card()}
  <Card>
    {#if title}
      <H3>
        {@render title()}
      </H3>
    {/if}

    <div class="Content">
      {#if children}
        {@render children()}
      {/if}
    </div>
  </Card>
{/snippet}

<li class={`DecoratedCard ${className}`} class:active>
  {#if href}
    <a {href}>
      {@render card()}
    </a>
  {:else}
    {@render card()}
  {/if}
</li>

<style lang="scss">
  li {
    display: block;
    padding: 0;
    margin: 0;
    margin-bottom: 16px;

    &:last-child {
      margin-bottom: 0;
    }

    &.active {
      :global(.Card) {
        &:hover {
          background-color: var(--color-primary-100);
        }
      }
    }

    :global(.H3) {
      margin-bottom: 8px;
    }
  }

  a {
    display: block;
    width: 100%;
    text-decoration: none;
    color: inherit;
  }
</style>
