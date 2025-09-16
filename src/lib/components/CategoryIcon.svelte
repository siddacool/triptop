<script lang="ts">
  import { Category } from '$lib/stores/expense/individual.svelte';
  import Icon from '@iconify/svelte';

  interface CategoryIconProps {
    category?: Category;
  }

  const { category }: CategoryIconProps = $props();
</script>

<span class="CategoryIcon">
  {#if category === Category.ENTERTAINMENT}
    <Icon icon="fa7-solid:masks-theater" width="20" height="20" class="ENTERTAINMENT" />
  {:else if category === Category.FLIGHT}
    <Icon icon="mdi:flight" width="20" height="20" class="FLIGHT" />
  {:else if category === Category.FOOD}
    <Icon icon="mdi:food" width="20" height="20" class="FOOD" />
  {:else if category === Category.MART}
    <Icon icon="mdi:cart" width="20" height="20" class="MART" />
  {:else if category === Category.SHOPPING}
    <Icon icon="mdi:shopping" width="20" height="20" class="SHOPPING" />
  {:else if category === Category.STAY}
    <Icon icon="material-symbols:hotel" width="20" height="20" class="STAY" />
  {:else if category === Category.TOUR}
    <Icon icon="map:boat-tour" width="22" height="22" class="TOUR" />
  {:else if category === Category.TRANSPORT}
    <Icon icon="ri:taxi-fill" width="20" height="20" class="TRANSPORT" />
  {:else}
    <Icon icon="icon-park-solid:other" width="20" height="20" />
  {/if}
</span>

<style lang="scss">
  .CategoryIcon {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    color: #8170ff;

    :global(.ENTERTAINMENT) {
      color: #76a521;
    }

    :global(.FLIGHT) {
      color: #d263ef;
    }

    :global(.FOOD) {
      color: #ff9a40;
    }

    :global(.MART) {
      color: #40a6ff;
    }

    :global(.SHOPPING) {
      color: #40a6ff;
    }

    :global(.STAY) {
      color: #3bc5a9;
    }

    :global(.TOUR) {
      color: #40e6ff;
    }

    :global(.TRANSPORT) {
      color: #d1d530;
    }
  }
</style>
