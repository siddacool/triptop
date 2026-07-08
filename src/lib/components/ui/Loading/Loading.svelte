<script lang="ts">
  import RippleLoader from './RippleLoader.svelte';

  type Props = {
    class?: string;
  };

  const { class: className = '' }: Props = $props();

  const classes = $derived(['Loading', className].filter(Boolean));
</script>

<div class={classes.join(' ')}>
  <RippleLoader size={1} />
</div>

<style lang="scss">
  .Loading {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: calc(var(--dodo-ui-space) * 3);
  }
</style>
