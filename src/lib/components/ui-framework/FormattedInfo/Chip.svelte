<script lang="ts" module>
  export type ChipVariant = 'default' | 'primary' | 'danger';
  export type ChipSize = 'small' | 'normal';
</script>

<script lang="ts">
  import type { SvelteComponentProps } from '$lib/types/svelte-component';

  interface ChipProps extends SvelteComponentProps {
    variant?: ChipVariant;
    size?: ChipSize;
    class?: string;
    title?: string;
  }

  const {
    children,
    variant = 'default',
    size = 'normal',
    title,
    class: className = '',
  }: ChipProps = $props();
</script>

<span class={`Chip variant variant--${variant} size size--${size} ${className}`} {title}>
  {#if children}
    {@render children()}
  {/if}
</span>

<style lang="scss">
  span {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: 400;
    overflow: hidden;

    &.size {
      &--small {
        font-size: 0.9rem;
        min-width: 30px;
        height: 25px;
        padding: 0 8px;
        border-radius: 10px;

        :global(svg) {
          font-size: 1.1rem;
        }
      }

      &--normal {
        font-size: 1rem;
        min-width: 40px;
        height: 35px;
        padding: 0 12px;
        border-radius: 18px;

        :global(svg) {
          font-size: 1.4rem;
        }
      }
    }

    &.variant {
      &--default {
        background-color: var(--color-primary-200);
        color: var(--color-grey-font-900);
      }

      &--primary {
        background-color: var(--color-primary-700);
        color: var(--color-white-const);
      }

      &--danger {
        background-color: var(--color-danger-200);
        color: var(--color-danger-800);
      }
    }
  }
</style>
