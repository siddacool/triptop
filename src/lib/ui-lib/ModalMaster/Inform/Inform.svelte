<script lang="ts" module>
  export interface InformProps {
    open?: boolean;
    class?: string;
    title?: Snippet;
    children?: Snippet;
    onaccept?: () => void;
  }
</script>

<script lang="ts">
  import type { Snippet } from 'svelte';
  import BaseModal from '../BaseModal';
  import './Inform.style.scss';
  import Button from '$lib/ui-lib/Button';
  import Icon from '@iconify/svelte';

  let {
    open = $bindable(false),
    class: className = '',
    title: titleInternal,
    children,
    onaccept,
  }: InformProps = $props();

  function onacceptMod() {
    open = false;

    if (onaccept) {
      onaccept();
    }
  }
</script>

<BaseModal bind:open class={['InformModal', className].join(' ')}>
  {#snippet title()}
    <Icon icon="ic:baseline-info" width="24" height="24" class="InfoIcon" />

    {#if titleInternal}
      {@render titleInternal()}
    {:else}
      Inform
    {/if}
  {/snippet}

  {@render children?.()}

  {#snippet controls()}
    <Button name="ok" color="secondary" onclick={onacceptMod}>OK</Button>
  {/snippet}
</BaseModal>
