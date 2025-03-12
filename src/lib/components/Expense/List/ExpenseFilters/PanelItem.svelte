<script lang="ts">
  import TagCheckboxGroup from '$lib/components/ui-framework/Form/TagCheckboxGroup/TagCheckboxGroup.svelte';
  import TagClear from '$lib/components/ui-framework/Form/TagClear.svelte';
  import StackItem from '$lib/components/ui-framework/Layout/Stack/StackItem.svelte';
  import type { SvelteComponentProps } from '$lib/types/svelte-component';

  interface PanelItemProps extends SvelteComponentProps {
    title: string;
    onClear?: () => void;
    disabledClear?: boolean;
  }

  const { children, title, onClear, disabledClear = false }: PanelItemProps = $props();
</script>

<StackItem>
  <div class="PanelItem">
    <p>{title}</p>
    {#if children}
      <TagCheckboxGroup>
        {@render children()}
        <TagClear title="Clear" onclick={onClear} disabled={disabledClear} />
      </TagCheckboxGroup>
    {/if}
  </div>
</StackItem>

<style lang="scss">
  .PanelItem {
    :global(.Logo) {
      width: 24px;
      height: 24px;
      font-size: 1.1rem;
      background-color: transparent;
      margin-right: 4px;
    }

    :global(.CategoryFormattedOption) {
      color: inherit;
      font-size: 0.9rem;
    }

    p {
      font-weight: 600;
      margin-top: 0;
      margin-bottom: 8px;
    }
  }
</style>
