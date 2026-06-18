<script lang="ts">
  import { page } from '$app/state';
  import { getRouteNavMap } from '$lib/helpers/getRouteNavMap';

  const params = $derived(page.params);
  const route = $derived(page.route.id?.split('/') || []);
  const navMap = $derived(getRouteNavMap(route, params));

  $effect(() => {
    console.log(params, route, navMap);
  });
</script>
