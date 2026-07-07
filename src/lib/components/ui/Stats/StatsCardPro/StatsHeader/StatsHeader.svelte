<script lang="ts">
  type Props = {
    class?: string;
    title?: string;
  };

  let { class: className = '', title }: Props = $props();

  const classes = $derived(['StatsHeader', className].filter(Boolean));
</script>

<div class={classes.join(' ')}>
  {#if title}
    <h2>{title}</h2>
  {/if}
</div>

<style lang="scss">
  .StatsHeader {
    color: var(--dodo-color-neutral-800);
    margin-bottom: calc(var(--dodo-ui-space) * 2);
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    h2 {
      font-size: 1.05rem;
      font-weight: 600;
      margin: 0;
    }
  }
</style>
