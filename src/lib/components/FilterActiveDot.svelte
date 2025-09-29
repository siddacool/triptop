<script lang="ts">
  interface FilterActiveDotProps {
    class?: string;
    show?: boolean;
  }

  const { class: className = '', show = false }: FilterActiveDotProps = $props();
</script>

{#if show}
  <span class={['FilterActiveDot', className].join(' ')}></span>
{/if}

<style lang="scss">
  .FilterActiveDot {
    background-color: var(--dodo-color-danger-500);
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
  }
</style>
