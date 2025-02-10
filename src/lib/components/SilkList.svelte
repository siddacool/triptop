<script lang="ts">
  import { getMoment } from '$lib/helpers/time';
  import { useSilkStore } from '$lib/stores/silk/silk.svelte';
  import { SilkAction } from '$lib/stores/silk/types';
  import Accordian from './ui-framework/Layout/Accordian.svelte';

  let open = $state(false);
</script>

{#if useSilkStore.data?.length}
  <Accordian title="History" onclick={() => (open = !open)} {open}>
    <table>
      <thead>
        <tr>
          <th>Silks</th>
          <th>Action</th>
          <th>At</th>
        </tr>
      </thead>
      <tbody>
        {#each useSilkStore.data as silk}
          <tr>
            <td>{silk.silks}</td>
            <td>{silk.action === SilkAction.ADD ? 'Add' : 'Remove'}</td>
            <td>{getMoment(silk?.createdAt).format('DD-MM-YYYY hh:mm:ss A')}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </Accordian>
{/if}

<style lang="scss">
  table {
    width: 100%;
  }

  th {
    text-align: left;
    padding: 6px;
  }

  td {
    text-align: left;
    padding: 6px;
    border-bottom: 1px solid var(--color-grey-800);
  }

  tbody {
    tr {
      &:first-child {
        td {
          color: var(--color-primary-600);
        }
      }
    }
  }
</style>
