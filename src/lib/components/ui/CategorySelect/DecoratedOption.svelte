<script lang="ts">
  import type { CategoryOption } from '$lib/stores/expense/types';
  import Icon from '@iconify/svelte';

  type Props = {
    option?: CategoryOption;
  };

  let { option }: Props = $props();
</script>

{#if option}
  <div class="DecoratedOption">
    {#if option.meta?.icon?.name}
      <span class="icon">
        <Icon icon={option.meta?.icon?.name} />
      </span>
    {/if}

    {option.label}
  </div>
{/if}

<style lang="scss">
  .DecoratedOption {
    display: flex;
    align-items: center;
    .icon {
      margin-right: 8px;
      display: inline-flex;
      font-size: 1.25rem;
    }
  }
</style>
