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
    <Icon icon="fa7-solid:masks-theater" width="24" height="24" />
  {:else if category === Category.FLIGHT}
    <Icon icon="mdi:flight" width="24" height="24" />
  {:else if category === Category.FOOD}
    <Icon icon="mdi:food" width="24" height="24" />
  {:else if category === Category.MART}
    <Icon icon="mdi:cart" width="24" height="24" />
  {:else if category === Category.SHOPPING}
    <Icon icon="mdi:shopping" width="24" height="24" />
  {:else if category === Category.STAY}
    <Icon icon="material-symbols:hotel" width="24" height="24" />
  {:else if category === Category.TOUR}
    <Icon icon="map:boat-tour" width="28" height="28" />
  {:else if category === Category.TRANSPORT}
    <Icon icon="ri:taxi-fill" width="24" height="24" />
  {:else}
    <Icon icon="icon-park-solid:other" width="24" height="24" />
  {/if}
</span>

<style lang="scss">
  .CategoryIcon {
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }
</style>
