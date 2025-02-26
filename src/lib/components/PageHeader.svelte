<script lang="ts">
  import type { SvelteComponentProps } from '$lib/types/svelte-component';
  import AnchorButton from './ui-framework/Form/AnchorButton.svelte';
  import Icon from '@iconify/svelte';

  interface PageHeaderProps extends SvelteComponentProps {
    backTo?: string;
    title: string;
    class?: string;
  }

  const { children, class: className = '', title, backTo }: PageHeaderProps = $props();
</script>

<header class={`PageHeader ${className}`}>
  <section>
    {#if backTo}
      <AnchorButton href={backTo} compact variant="inert" class="BackButton">
        <Icon icon="lets-icons:back" />
      </AnchorButton>
    {/if}

    <h2>{title}</h2>
  </section>

  {#if children}
    {@render children()}
  {/if}
</header>

<style lang="scss">
  header {
    margin-bottom: 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    :global(.BackButton) {
      width: 44px;
      min-width: initial;
      border-radius: 50%;
      margin-right: 8px;
    }
  }

  section {
    display: flex;
    align-items: center;
  }

  h2 {
    margin: 0;
    font-weight: 500;
  }
</style>
