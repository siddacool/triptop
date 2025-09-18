<script lang="ts" module>
  export interface ConfirmProps {
    open?: boolean;
    class?: string;
    title?: Snippet;
    children?: Snippet;
    onaccept?: () => void;
    onreject?: () => void;
  }
</script>

<script lang="ts">
  import type { Snippet } from 'svelte';
  import BaseModal from '../BaseModal';
  import './Confirm.style.scss';
  import Button from '$lib/ui-lib/Button';
  import Icon from '@iconify/svelte';

  let {
    open = $bindable(false),
    class: className = '',
    title: titleInternal,
    children,
    onaccept,
    onreject,
  }: ConfirmProps = $props();

  function onacceptMod() {
    open = false;

    if (onaccept) {
      onaccept();
    }
  }

  function onrejectMod() {
    open = false;

    if (onreject) {
      onreject();
    }
  }
</script>

<BaseModal bind:open class={['ConfirmModal', className].join(' ')}>
  {#snippet title()}
    <Icon icon="foundation:alert" width="24" height="24" class="AlertIcon" />
    {#if titleInternal}
      {@render titleInternal()}
    {:else}
      Confirm
    {/if}
  {/snippet}

  {@render children?.()}

  {#snippet controls()}
    <Button name="yes" color="secondary" onclick={onacceptMod}>Yes</Button>
    <Button name="no" onclick={onrejectMod} class="RejectButton">No</Button>
  {/snippet}
</BaseModal>
