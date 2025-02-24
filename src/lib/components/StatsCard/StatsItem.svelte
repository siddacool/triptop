<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    label?: Snippet;
    value?: Snippet;
  }

  const { value, label }: Props = $props();
</script>

<li>
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
  li {
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

    .StatsLabel {
      flex: 1;
    }

    .StatsValue {
      font-weight: 600;
    }
  }
</style>
