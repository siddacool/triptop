<script lang="ts">
  import type { Snippet } from 'svelte';

  type Props = {
    label: string;
    children?: Snippet;
    class?: string;
  };

  const { class: className = '', children, label }: Props = $props();

  const classes = $derived(['LabelGroup', className].filter(Boolean));
</script>

<div class={classes.join(' ')}>
  <div class="label">{label}</div>

  <div class="content">
    {@render children?.()}
  </div>
</div>

<style lang="scss">
  .LabelGroup {
    font-size: 0.9rem;
    display: table-row;

    .label {
      font-weight: 400;
      display: table-cell;
      width: 1%; /* Shrinks to minimum required width */
      white-space: nowrap; /* Prevent wrapping if desired */
      padding: var(--dodo-ui-space);
      padding-left: 0;
      color: var(--dodo-color-neutral-600);
    }

    .content {
      color: inherit;
      font-weight: 400;
      display: table-cell;
      width: auto;
      padding: var(--dodo-ui-space);
      padding-right: 0;
    }
  }
</style>
