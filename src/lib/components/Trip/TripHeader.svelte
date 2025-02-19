<script lang="ts">
  import { StackItem } from '$lib/components/ui-framework/Layout/Stack';
</script>

<StackItem>
  <header>
    <img src="web-app-manifest-192x192.png" alt="icon" />
    <h2>Triptop</h2>
  </header>
</StackItem>

<style lang="scss">
  header {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 24px;
  }

  h2 {
    font-size: 2rem;
    font-weight: 500;
    margin: 0;
  }

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 8px;
    opacity: 0.8;
    border: 1px solid var(--color-primary-300);
  }
</style>
