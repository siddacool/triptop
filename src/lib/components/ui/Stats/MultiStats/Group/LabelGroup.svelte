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
    font-size: 0.95rem;
    display: flex;
    align-items: center;
    padding: calc(var(--dodo-ui-space) * 1) 0;

    .label {
      font-weight: 500;
      white-space: nowrap;
      font-weight: 500;
      width: 90px;
    }

    .content {
      color: var(--dodo-color-neutral-600);
      font-weight: 600;
    }
  }
</style>
