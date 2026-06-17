<script>
  import BackButton from '$lib/components/ui/BackButton/BackButton.svelte';
  import { Card } from '@flightlesslabs/dodo-ui';
  import Controls from './Controls/Controls.svelte';
  import TripName from './TripName.svelte';
</script>

<div class="TripHeader">
  <Card shadow={0} class="TripHeaderCard" outline roundness={2}>
    <BackButton href="/trips" />
    <TripName />
    <Controls />
  </Card>
</div>

<style lang="scss">
  .TripHeader {
    :global(.TripHeaderCard) {
      display: flex;
      align-items: center;
      padding: var(--dodo-ui-space);
      border-color: var(--dodo-color-neutral-300);

      @media (min-width: 600px) {
        padding: calc(var(--dodo-ui-space) * 1.5);
      }
    }
  }
</style>
