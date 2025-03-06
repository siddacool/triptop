<script lang="ts">
  import { useStatisticsStore } from '$lib/stores/statistics/statistics.svelte';
  import type { SvelteComponentProps } from '$lib/types/svelte-component';
  import ToggleButton from '../ui-framework/Form/ToggleButton.svelte';
  import Card from '../ui-framework/Layout/Card.svelte';
  import StackItem from '../ui-framework/Layout/Stack/StackItem.svelte';

  interface StatsTableProps extends SvelteComponentProps {
    title: string;
    name: string;
  }

  const { title, children, name }: StatsTableProps = $props();
  const openState = $derived(useStatisticsStore.tableState[name] === false ? false : true);
</script>

<StackItem>
  <div class="StatsTable">
    <h3>
      {title}
      <ToggleButton
        isOpen={openState}
        onclick={() => useStatisticsStore.updateTableState({ [name]: !openState })}
      />
    </h3>
    {#if openState}
      <Card>
        <table class="StatsTable">
          {#if children}
            {@render children()}
          {/if}
        </table>
      </Card>
    {/if}
  </div>
</StackItem>

<style lang="scss">
  .StatsTable {
    :global(.Card) {
      padding-left: 0;
      padding-right: 0;
      overflow: hidden;
      padding-bottom: 0;
    }

    table {
      border-collapse: collapse;
      width: 100%;

      :global(tr) {
        border-bottom: 1px solid var(--color-grey-300);
      }

      :global(thead tr) {
        border-bottom-color: var(--color-grey-600);
      }

      :global(tbody tr) {
        &:hover {
          background-color: var(--color-primary-50);
        }

        &:last-child {
          border-bottom: 0;
        }
      }

      :global(th) {
        text-align: left;
        font-weight: 700;
        font-size: 0.9rem;
        padding: 10px;

        &:last-child {
          text-align: right;
        }
      }

      :global(td) {
        padding: 14px 10px;
        font-size: 0.9rem;

        &:first-child {
          vertical-align: top;
          width: 200px;
        }

        &:last-child {
          text-align: right;
        }
      }

      :global(.Logo) {
        width: 32px;
        height: 32px;
        font-size: 1.1rem;
      }

      :global(.CategoryFormattedOption) {
        font-weight: 400;
      }

      :global(ul) {
        margin: 0;
        padding: 0;
      }

      :global(li) {
        margin: 0;
        padding: 0;
        display: block;
        font-weight: 400;
        margin-bottom: 16px;
        font-size: 0.85rem;

        &:last-child {
          margin-bottom: 0;
        }
      }

      :global(.FormattedCurrency) {
        font-size: 1rem;
        font-weight: 500;
      }
    }
  }

  h3 {
    margin-top: 0;
    margin-bottom: 8px;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>
