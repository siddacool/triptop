<script lang="ts">
  interface FormLabelProps {
    name?: string;
    label: string;
    error?: string;
    disabled?: boolean;
    active?: boolean;
  }

  let { name, label, disabled = false, active = false, error }: FormLabelProps = $props();
</script>

<label for={name} class:error class:active class:disabled>{label}</label>

<style lang="scss">
  label {
    font-size: 0.85rem;
    display: block;
    margin-bottom: 6px;
    font-weight: 500;
    padding-left: 4px;

    &:not(.error):not(.disabled) {
      &.active {
        color: var(--color-primary-600);
      }
    }

    &:not(.disabled) {
      &.error {
        color: var(--color-danger-800);
      }
    }
  }
</style>
