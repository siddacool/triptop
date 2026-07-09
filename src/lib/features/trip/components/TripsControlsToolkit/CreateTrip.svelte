<script>
  import { resolve } from '$app/paths';
  import PrimaryButton from '$lib/components/ui/Buttons/PrimaryButton/PrimaryButton.svelte';
  import Icon from '@iconify/svelte';
</script>

<PrimaryButton href={resolve('/trips/create')} roundness={2} class="CreateTripButton">
  <span class="Icon">
    <Icon icon="material-symbols:add-rounded" />
  </span>
  Create new trip
</PrimaryButton>

<style lang="scss">
  .Icon {
    font-size: 1.6rem;
    display: inline-flex;
    align-items: center;
    margin-right: 4px;
  }
</style>
