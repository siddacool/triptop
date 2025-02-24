<script lang="ts">
  import type { SvelteComponentProps } from '$lib/types/svelte-component';
  import type { Snippet } from 'svelte';
  import Icon from '@iconify/svelte';

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
    <button {onclick}>
      {#if open}
        <Icon icon="material-symbols:arrow-drop-up-rounded" />
      {:else}
        <Icon icon="material-symbols:arrow-drop-down-rounded" />
      {/if}

      {title}
    </button>
    {#if headerContent}
      <div class="headerContent">
        {#if headerContent}
          {@render headerContent()}
        {/if}
      </div>
    {/if}
  </div>

  {#if open && children}
    <div class="content">
      {@render children()}
    </div>
  {/if}
</div>

<style lang="scss">
  .Accordian {
    margin-bottom: 24px;
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
  }

  .title {
    display: flex;
  }

  button {
    cursor: pointer;
    flex: 1;
    overflow: hidden;
    white-space: pre;
    text-overflow: ellipsis;
    font-size: 0.9rem;
    height: 40px;
    display: flex;
    align-items: center;
    background-color: transparent;
    border: 0;
    color: inherit;
    font-family: inherit;
    font-weight: 500;
    padding: 0;
    margin: 0;
    color: var(--color-grey-font-700);

    &:hover {
      color: var(--color-primary-600);
    }

    :global(svg) {
      font-size: 1.8rem;
    }
  }
</style>
