<script lang="ts">
  type Props = {
    class?: string;
  };

  const { class: className = '' }: Props = $props();

  const classes = $derived(['Divider', className].filter(Boolean));
</script>

<hr class={classes.join(' ')} />

<style lang="scss">
  .Divider {
    border: none;
    border-top: 1px solid var(--dodo-color-neutral-300);
  }
</style>
