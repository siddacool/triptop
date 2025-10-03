<script lang="ts">
  import Button from '$lib/ui-lib/Button/Button.svelte';
  import SpecialText from '$lib/ui-lib/SpecialText/SpecialText.svelte';
  import Icon from '@iconify/svelte';
  import type { Snippet } from 'svelte';

  interface HeaderProps {
    children?: Snippet;
    after?: Snippet;
    backTo?: string;
    'aria-label'?: string;
  }

  const { children, backTo, 'aria-label': ariaLabel, after }: HeaderProps = $props();
</script>

<header>
  <div class="backTo">
    {#if backTo}
      <Button href={backTo} aria-label={ariaLabel} compact>
        <Icon icon="lets-icons:back" />
      </Button>
    {/if}
  </div>

  <h1>
    <SpecialText fontWeight={500} width={80}>
      {@render children?.()}
    </SpecialText>
  </h1>

  <div class="after">
    {@render after?.()}
  </div>
</header>

<style lang="scss">
  header {
    display: flex;
    align-items: center;
    view-transition-name: header;
  }

  h1 {
    display: block;
    font-size: 1rem;
    margin-block-start: 0.83em;
    margin-block-end: 0.83em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: 500;
    unicode-bidi: isolate;
    margin-right: auto;
    margin: 0;
    letter-spacing: 1.2px;
  }

  .after {
    margin-left: auto;

    &:empty {
      display: none;
    }
  }

  .backTo {
    &:empty {
      display: none;
    }

    margin-right: 16px;
  }
</style>
