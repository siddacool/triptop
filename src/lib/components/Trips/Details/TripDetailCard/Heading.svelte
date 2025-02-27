<script lang="ts">
  interface Props {
    title: string;
  }

  const { title }: Props = $props();
</script>

<h3>
  {title}
</h3>

<style lang="scss">
  h3 {
    margin: 0;
    margin-bottom: 20px;
    font-size: 1rem;
    font-weight: 600;
    text-align: left;
    letter-spacing: 0.3px;
    color: var(--color-grey-font-700);
  }
</style>
