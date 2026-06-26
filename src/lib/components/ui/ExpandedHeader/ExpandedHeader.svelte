<script lang="ts">
  import type { Snippet } from 'svelte';
  import { Card } from '@flightlesslabs/dodo-ui';

  type Props = {
    children?: Snippet;
    class?: string;
  };

  const { class: className = '', children }: Props = $props();

  const classes = $derived(['ExpandedHeader', className].filter(Boolean));
</script>

<header class={classes.join(' ')}>
  <Card outline class="ExpandedHeaderCard" roundness={0} shadow={0}>
    <div class="box">
      {@render children?.()}
    </div>
  </Card>
</header>

<style lang="scss">
  .ExpandedHeader {
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;

    :global(.ExpandedHeaderCard) {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      border-color: var(--dodo-color-neutral-200);
    }

    .box {
      width: 100%;
      max-width: 820px;
      margin: 0 auto;
      padding: 0 calc(var(--dodo-ui-space) * 2);

      @media (min-width: 600px) {
        padding: 0 calc(var(--dodo-ui-space) * 3);
      }
    }
  }
</style>
