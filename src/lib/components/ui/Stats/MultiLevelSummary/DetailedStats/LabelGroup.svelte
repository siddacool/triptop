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
    padding-right: var(--dodo-ui-space);
    margin-bottom: var(--dodo-ui-space);

    .label {
      font-weight: 400;
      white-space: nowrap;
      width: 90px;
    }

    .content {
      color: inherit;
      font-weight: 400;
    }
  }
</style>
