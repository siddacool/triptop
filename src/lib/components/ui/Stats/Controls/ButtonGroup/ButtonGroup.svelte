<script lang="ts">
  import {
    ToggleGroup,
    type ToggleGroupCustomContentContext,
    type ToggleGroupOption,
  } from '@flightlesslabs/dodo-ui-bits';

  import type { Snippet } from 'svelte';

  type Props = {
    class?: string;
    value: string;
    options: ToggleGroupOption[];
    customContent?: Snippet<[ToggleGroupCustomContentContext]>;
    'aria-label'?: string;
  };

  let {
    class: className = '',
    options,
    value = $bindable(),
    customContent,
    'aria-label': ariaLabel,
  }: Props = $props();

  const classes = $derived(['ButtonGroup', className].filter(Boolean));
</script>

<div class={classes.join(' ')}>
  <ToggleGroup
    type="single"
    {options}
    bind:value
    attached
    buttonProps={{ outline: true, size: 'small', 'aria-label': ariaLabel, title: ariaLabel }}
    inactiveButtonProps={{ color: 'neutral', variant: 'text', background: 'none' }}
    activeButtonProps={{ color: 'primary', variant: 'text', background: 'subtle' }}
    {customContent}
  />
</div>

<style lang="scss">
  .ButtonGroup {
    margin: 0 var(--dodo-ui-space);
  }
</style>
