<script lang="ts">
  import type { SvelteComponentProps } from '$lib/types/svelte-component';
  import type { Snippet } from 'svelte';
  import Icon from '@iconify/svelte';
  import Button from '../Form/Button.svelte';

  interface AccordianProps extends SvelteComponentProps {
    onclick?: (e: MouseEvent) => void;
    title: string;
    class?: string;
    open?: boolean;
    headerContent?: Snippet;
  }

  const {
    children,
    onclick,
    title,
    class: className = '',
    headerContent,
    open = false,
  }: AccordianProps = $props();
</script>

<div class={`Accordian ${className}`}>
  <div class="title">
    <Button variant="inert" {onclick} compact class="toggle">
      {#if open}
        <Icon icon="material-symbols:arrow-drop-up-rounded" />
      {:else}
        <Icon icon="material-symbols:arrow-drop-down-rounded" />
      {/if}

      {title}
    </Button>

    <div class="headerContent">
      {#if headerContent}
        {@render headerContent()}
      {/if}
    </div>
  </div>

  {#if children}
    <div class="content" class:open>
      {@render children()}
    </div>
  {/if}
</div>

<style lang="scss">
  .Accordian {
    display: flex;
    flex-direction: column;

    :global(.Button.toggle) {
      color: var(--color-grey-font-800);
    }
  }

  .headerContent {
    padding-left: 8px;
    &:empty {
      display: none;
    }
  }

  .content {
    padding-top: 8px;
    padding-bottom: 8px;
    display: none;

    &.open {
      display: block;
    }
  }

  .title {
    display: flex;
    align-items: center;
  }
</style>
