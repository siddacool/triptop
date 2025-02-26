<script lang="ts" module>
  export type ButtonVariant = 'default' | 'primary' | 'danger' | 'inert';
</script>

<script lang="ts">
  import type { SvelteComponentProps } from '$lib/types/svelte-component';

  interface ButtonProps extends SvelteComponentProps {
    variant?: ButtonVariant;
    compact?: boolean;
    disabled?: boolean;
    onclick?: (e: MouseEvent) => void;
    name?: string;
    title?: string;
    class?: string;
    type?: 'button' | 'submit';
  }

  const {
    variant = 'default',
    compact = false,
    disabled = false,
    children,
    onclick,
    name,
    title,
    class: className = '',
    type,
  }: ButtonProps = $props();
</script>

<button
  class={`Button variant variant--${variant} ${className}`}
  class:compact
  {disabled}
  {onclick}
  {name}
  {title}
  {type}
>
  {#if children}
    {@render children()}
  {/if}
</button>

<style lang="scss">
  button {
    margin: 0;
    padding: 0 16px;
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

    :global(svg) {
      font-size: 1.55rem;
    }

    &.compact {
      padding: 0;
      min-width: 65px;
    }

    &:not([disabled]) {
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
          background-color: var(--color-primary-700);
          color: var(--color-white-const);

          &:hover {
            background-color: var(--color-primary-800);
          }

          &:active {
            background-color: var(--color-primary-900);
          }
        }

        &--danger {
          background-color: var(--color-danger-200);
          color: var(--color-danger-800);

          &:hover {
            background-color: var(--color-danger-300);
          }

          &:active {
            background-color: var(--color-danger-400);
          }
        }
      }
    }

    &[disabled] {
      cursor: not-allowed;
      background-color: var(--color-grey-200);
      color: var(--color-grey-font-400);
    }
  }
</style>
