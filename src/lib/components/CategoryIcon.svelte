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
    color: var(--triptop-color-category-other-icon);

    :global(.ENTERTAINMENT) {
      color: var(--triptop-color-category-entertainment-icon);
    }

    :global(.FLIGHT) {
      color: var(--triptop-color-category-flight-icon);
    }

    :global(.FOOD) {
      color: var(--triptop-color-category-food-icon);
    }

    :global(.MART) {
      color: var(--triptop-color-category-mart-icon);
    }

    :global(.SHOPPING) {
      color: var(--triptop-color-category-shopping-icon);
    }

    :global(.STAY) {
      color: var(--triptop-color-category-stay-icon);
    }

    :global(.TOUR) {
      color: var(--triptop-color-category-tour-icon);
    }

    :global(.TRANSPORT) {
      color: var(--triptop-color-category-transport-icon);
    }
  }
</style>
