<script lang="ts">
  import { Grid } from '@flightlesslabs/dodo-ui';
  import {
    AccordionItem,
    AccordionTrigger,
    type AccordionItemProps,
  } from '@flightlesslabs/dodo-ui-bits';
  import Icon from '@iconify/svelte';

  type Props = AccordionItemProps;

  let { children, title, ...restProps }: Props = $props();
</script>

<AccordionItem {...restProps}>
  {#snippet customHeaderContent()}
    <AccordionTrigger>
      <div class="Container">
        <div class="Icon">
          <Icon icon="ri:arrow-drop-down-line" />
        </div>
        {title}
      </div>
    </AccordionTrigger>
  {/snippet}

  <Grid gap={2}>
    {@render children?.()}
  </Grid>
</AccordionItem>

<style lang="scss">
  .Container {
    display: flex;
    align-items: center;
  }
  .Icon {
    display: inline-flex;
    font-size: 1.6rem;
    cursor: pointer;
    color: inherit;
  }
</style>
