<script lang="ts" module>
  import Icon from '@iconify/svelte';
  import type { Snippet } from 'svelte';

  export interface AccordianProps {
    children?: Snippet;
    header?: Snippet;
    ref?: HTMLDivElement;
    class?: string;
    open?: boolean;
    ontoggle?: () => void;
  }
</script>

<script lang="ts">
  import './Accordian.style.scss';
  import { AppColorSchemes, useThemeStore } from '$lib/stores/theme.svelte';
  import UtilityButton from '../UtilityButton';
  import Divider from '../Divider';

  let {
    header,
    children,
    ref = $bindable<HTMLDivElement>(),
    open = $bindable(false),
    class: className = '',
    ontoggle,
  }: AccordianProps = $props();

  function ontoggleMod() {
    open = !open;

    if (ontoggle) {
      ontoggle();
    }
  }

  const theme = $derived(
    useThemeStore.theme === AppColorSchemes.DARK ? 'theme--dark' : 'theme--light',
  );
</script>

<div class={['Accordian', theme, className].join(' ')} bind:this={ref}>
  <button class="header" onclick={ontoggleMod}>
    <UtilityButton class="toggle" title="Accordian toggle" tabindex={-1}>
      {#if open}
        <Icon icon="material-symbols:arrow-drop-up-rounded" width="28" height="28" />
      {:else}
        <Icon icon="material-symbols:arrow-drop-down-rounded" width="28" height="28" />
      {/if}
    </UtilityButton>
    <div class="headerContent">
      {@render header?.()}
    </div>
  </button>

  {#if open}
    <div class="accordianBody">
      {@render children?.()}
      <Divider />
    </div>
  {/if}
</div>
