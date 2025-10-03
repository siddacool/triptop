<script lang="ts" module>
  export interface BaseModalProps {
    open?: boolean;
    class?: string;
    title?: Snippet;
    children?: Snippet;
    controls?: Snippet;
  }
</script>

<script lang="ts">
  import { AppColorSchemes, useThemeStore } from '$lib/stores/theme.svelte';
  import { Dialog } from 'bits-ui';
  import type { Snippet } from 'svelte';
  import './BaseModal.style.scss';
  import Card from '$lib/ui-lib/Card/Card.svelte';
  import UtilityButton from '$lib/ui-lib/UtilityButton';
  import Icon from '@iconify/svelte';

  let {
    open = $bindable(false),
    class: className = '',
    title,
    children,
    controls,
  }: BaseModalProps = $props();

  const theme = $derived(
    useThemeStore.theme === AppColorSchemes.DARK ? 'theme--dark' : 'theme--light',
  );
</script>

<Dialog.Root bind:open>
  <Dialog.Portal>
    <Dialog.Overlay class={['BaseModal', theme, className].join(' ')} />
    <Dialog.Content class={['BaseModalContent', theme, className].join(' ')}>
      <Card class="ModalCard dodo-shadow-3">
        <Dialog.Title>
          {@render title?.()}
          <UtilityButton class="CloseModal" title="Close Modal" onclick={() => (open = false)}>
            <Icon icon="material-symbols:close-small" width="28" height="28" />
          </UtilityButton>
        </Dialog.Title>
        <Dialog.Description>
          <div class="ModalDescriptionBody">
            {@render children?.()}
          </div>
          <div class="ModalDescriptionControls">
            {@render controls?.()}
          </div>
        </Dialog.Description>
      </Card>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
