<script lang="ts">
  type Props = {
    class?: string;
    exchangeDate: string;
  };

  let { class: className = '', exchangeDate }: Props = $props();

  const classes = $derived(['ExchangeInfo', className].filter(Boolean));
</script>

<div class={classes.join(' ')}></div>

<style lang="scss">
  .ExchangeInfo {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
</style>
