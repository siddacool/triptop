<script lang="ts">
  import type { SvelteComponentProps } from '$lib/types/svelte-component';
  import type { Snippet } from 'svelte';
  import Card from './ui-framework/Layout/Card.svelte';

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
      <h3>
        {@render title()}
      </h3>
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
  }

  a {
    display: block;
    width: 100%;
    text-decoration: none;
    color: inherit;
  }

  h3 {
    font-size: 1.2rem;
    font-weight: 500;
    margin-top: 0;
  }
</style>
