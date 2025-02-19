<script lang="ts">
  import StackItem from '$lib/components/ui-framework/Layout/Stack/StackItem.svelte';
  import type { Snippet } from 'svelte';

  interface StatsTemplateProps {
    label?: Snippet;
    value?: Snippet;
  }

  const { label, value }: StatsTemplateProps = $props();
</script>

<li class="StatsTemplate">
  <div class="StatsLabel">
    {#if label}
      {@render label()}
    {/if}
  </div>
  <div class="StatsValue">
    {#if value}
      {@render value()}
    {/if}
  </div>
</li>

<style lang="scss">
  .StatsTemplate {
    margin: 0;
    padding: 16px;
    display: flex;
    justify-content: space-between;
    font-size: 1.05rem;
    border-bottom: 1px solid var(--color-grey-400);
    padding-bottom: 16px;

    &:last-child {
      margin-bottom: 0;
      border-bottom: 0;
    }

    :global(a) {
      text-decoration: none;
      color: var(--color-primary-800);
    }

    .StatsValue {
      font-weight: 600;
    }
  }
</style>
