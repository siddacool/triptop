<script lang="ts">
  import type { SvelteComponentProps } from '$lib/types/svelte-component';
  import type { ButtonVariant } from './Button.svelte';

  interface AnchorButtonProps extends SvelteComponentProps {
    variant?: ButtonVariant;
    compact?: boolean;
    disabled?: boolean;
    title?: string;
    class?: string;
    href?: string;
    target?: string;
  }

  const {
    variant = 'default',
    compact = false,
    disabled = false,
    children,
    title,
    class: className = '',
    href,
    target,
  }: AnchorButtonProps = $props();
</script>

<a
  class={`AnchorButton variant variant--${variant} ${disabled ? 'disabled' : ''} ${className}`}
  class:compact
  {title}
  {href}
  {target}
>
  {#if children}
    {@render children()}
  {/if}
</a>

<style lang="scss">
  a {
    margin: 0;
    padding: 0 20px;
    border: 0;
    font-size: 1rem;
    font-weight: 500;
    border-radius: 20px;
    min-width: 85px;
    cursor: pointer;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    height: var(--size-ui-element-height);
    transition: all 100ms;
    letter-spacing: 0.3px;
    font-family: inherit;
    text-decoration: none;

    :global(svg) {
      font-size: 1.55rem;
    }

    &.compact {
      padding: 0;
      min-width: 65px;
    }

    &:not(.disabled) {
      &.variant {
        &--inert {
          background-color: transparent;
          color: var(--color-primary-800);

          &:hover {
            background-color: var(--color-primary-200);
          }

          &:active {
            background-color: var(--color-primary-300);
          }
        }

        &--default {
          background-color: var(--color-primary-200);
          color: var(--color-grey-font-900);

          &:hover {
            background-color: var(--color-primary-300);
          }

          &:active {
            background-color: var(--color-primary-400);
          }
        }

        &--primary {
          background-color: var(--color-accent-600);
          color: var(--color-black-const);

          &:hover {
            background-color: var(--color-accent-700);
          }

          &:active {
            background-color: var(--color-accent-800);
          }
        }

        &--danger {
          background-color: var(--color-danger-100);
          color: var(--color-danger-800);

          &:hover {
            background-color: var(--color-danger-200);
          }

          &:active {
            background-color: var(--color-danger-300);
          }
        }

        &--safe {
          background-color: var(--color-safe-200);
          color: var(--color-safe-800);

          &:hover {
            background-color: var(--color-safe-300);
          }

          &:active {
            background-color: var(--color-safe-400);
          }
        }
      }
    }

    &.disabled {
      cursor: not-allowed;
      background-color: var(--color-grey-200);
      color: var(--color-grey-font-400);
      pointer-events: none;
    }
  }
</style>
