<script lang="ts" module>
  export interface InputEnclosureProps {
    children?: Snippet;
    /**  ref */
    ref?: HTMLDivElement;
    /** disabled state */
    disabled?: boolean;
    /** focused state */
    focused?: boolean;
    /** is there any associated Error ? */
    error?: boolean;
    /** Icon before button content */
    before?: Snippet;
    /** Icon after button content */
    after?: Snippet;
    /** Custom css class*/
    class?: string;
  }
</script>

<script lang="ts">
  import { AppColorSchemes, useThemeStore } from '$lib/stores/theme.svelte';

  import './InputEnclosure.style.scss';
  import type { Snippet } from 'svelte';

  let {
    children,
    class: className = '',
    disabled = false,
    focused = false,
    before,
    after,
    error = false,
    ref = $bindable<HTMLDivElement>(),
  }: InputEnclosureProps = $props();

  const theme = $derived(
    useThemeStore.theme === AppColorSchemes.DARK ? 'theme--dark' : 'theme--light',
  );
</script>

<div
  class={['InputEnclosure', theme, className].join(' ')}
  class:error
  class:disabled
  class:focused
>
  <div class="before">
    {@render before?.()}
  </div>

  {@render children?.()}

  <div class="after">
    {@render after?.()}
  </div>
</div>
