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
    display: flex;
    align-items: center;
    padding: calc(var(--dodo-ui-space) * 0.7) 0;

    .label {
      font-weight: 400;
      white-space: nowrap;
      width: 90px;
    }

    .content {
      color: var(--dodo-color-neutral-800);
      font-weight: 400;
    }
  }
</style>
