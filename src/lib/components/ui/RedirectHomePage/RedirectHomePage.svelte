<script lang="ts">
  import { Button, Column, Grid } from '@flightlesslabs/dodo-ui';
  import type { Snippet } from 'svelte';
  import ControlSection from '../ControlSection/ControlSection.svelte';
  import Icon from '@iconify/svelte';

  type Props = {
    children?: Snippet;
    class?: string;
    backTo?: string;
  };

  const { class: className = '', children, backTo = '/trips' }: Props = $props();

  const classes = $derived(['RedirectHomePage', className].filter(Boolean));
</script>

<div class={classes.join(' ')}>
  <Grid gap={2}>
    <Column>
      <div class="content">
        {@render children?.()}
      </div>
    </Column>
    <Column>
      <ControlSection controlsAlignment="center">
        <Button href={backTo} variant="text" outline>
          <div class="Icon">
            <Icon icon="ic:twotone-arrow-back" />
          </div>
          Go back
        </Button>
      </ControlSection>
    </Column>
  </Grid>
</div>

<style lang="scss">
  .RedirectHomePage {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: calc(var(--dodo-ui-space) * 4);

    :global(.RedirectHomePageCard) {
      padding: calc(var(--dodo-ui-space) * 2);
    }

    .content {
      font-size: 1.3rem;
      color: var(--dodo-color-neutral-700);
      text-align: center;
    }

    .Icon {
      display: inline-flex;
      margin-right: var(--dodo-ui-space);
      font-size: 1.5rem;
    }
  }
</style>
