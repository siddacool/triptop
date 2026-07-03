<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { GroupStats } from '$lib/stores/stats/types';
  import Title from './Title.svelte';
  import type { Trip } from '$lib/stores/trip/types';
  import Share from './Share/Share.svelte';

  type Props = {
    class?: string;
    children?: Snippet;
    groupStat: GroupStats;
    trip: Trip;
  };

  let { class: className = '', children, trip, groupStat }: Props = $props();

  const classes = $derived(['Topic', className].filter(Boolean));
</script>

<div class={classes.join(' ')}>
  <Title>
    {@render children?.()}
  </Title>
  <Share {groupStat} />
</div>

<style lang="scss">
  .Topic {
  }
</style>
