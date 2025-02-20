<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  const id = page.params.id;

  $effect(() => {
    goto(`/${id}`);
  });
</script>
