<script lang="ts">
  interface ErrorProps {
    message: string;
  }

  const { message }: ErrorProps = $props();
</script>

<p class="ErrorMessage">{message}</p>

<style lang="scss">
  p {
    margin-top: 6px;
    padding-left: 8px;
    color: var(--color-danger-800);
    font-size: 1rem;
    font-weight: 500;
  }
</style>
