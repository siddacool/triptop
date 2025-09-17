<script lang="ts" module>
  import Icon from '@iconify/svelte';
  import type { Snippet } from 'svelte';

  export interface LightAccordianProps {
    children?: Snippet;
    header?: Snippet;
    ref?: HTMLDivElement;
    class?: string;
    open?: boolean;
    ontoggle?: () => void;
  }
</script>

<script lang="ts">
  import './LightAccordian.style.scss';
  import { AppColorSchemes, useThemeStore } from '$lib/stores/theme.svelte';
  import Divider from '$lib/components/Divider.svelte';
  import UtilityButton from '../UtilityButton';

  let {
    header,
    children,
    ref = $bindable<HTMLDivElement>(),
    open = $bindable(false),
    class: className = '',
    ontoggle,
  }: LightAccordianProps = $props();

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

<div class={['LightAccordian', theme, className].join(' ')} bind:this={ref}>
  <div class="header">
    <div class="headerContent">
      {@render header?.()}
    </div>

    <UtilityButton class="toggle" onclick={ontoggleMod} title="Accordian toggle">
      {#if open}
        <Icon icon="material-symbols:arrow-drop-up-rounded" width="28" height="28" />
      {:else}
        <Icon icon="material-symbols:arrow-drop-down-rounded" width="28" height="28" />
      {/if}
    </UtilityButton>
  </div>

  {#if open}
    <div class="accordianBody">
      {@render children?.()}
      <Divider />
    </div>
  {/if}
</div>
