<script lang="ts">
  import type { ComponentSize } from '@flightlesslabs/dodo-ui';
  import type { Snippet } from 'svelte';

  type Props = {
    label: string;
    children?: Snippet;
    class?: string;
    size?: ComponentSize;
  };

  const { class: className = '', children, label, size = 'normal' }: Props = $props();

  const classes = $derived(['FieldValue', `size--${size}`, className].filter(Boolean));
</script>

<div class={classes.join(' ')}>
  <div class="label">
    {label}
  </div>

  <div class="content">
    {@render children?.()}
  </div>
</div>

<style lang="scss">
  .FieldValue {
    display: flex;
    flex-direction: column;
    color: inherit;

    .label {
      margin-bottom: var(--dodo-ui-space);
      font-weight: 600;
      color: var(--dodo-color-neutral-700);
    }

    .content {
      font-size: 1.1rem;
      color: var(--dodo-color-neutral-800);
    }

    &.size--large {
      .content {
        font-size: 1.4rem;
      }
    }

    &.size--small {
      .content {
        font-size: 1rem;
      }
    }
  }
</style>
