<script>
  import Box from '$lib/components/ui/Box/Box.svelte';
</script>

<Box>
  <h2>Privacy Policy for Triptop</h2>

  <p>
    This application is Free and Open Source software distributed under the <br />
    <b>MIT License</b>. Copyright (c) 2026 Siddhesh Mangela.
  </p>

  <p>
    The complete source code is fully transparent and publicly accessible at
    <a href="https://github.com/siddacool/triptop">triptop github</a>
  </p>
</Box>

<style lang="scss">
  p {
    line-height: 2;
  }

  a {
    color: var(--dodo-color-secondary-700);

    &:hover {
      color: var(--dodo-color-secondary-800);
    }
  }
</style>
