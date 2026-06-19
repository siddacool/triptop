<script lang="ts">
  import ControlSection from '$lib/components/ui/ControlSection/ControlSection.svelte';
  import { Button } from '@flightlesslabs/dodo-ui';

  type Props = {
    mode: 'edit' | 'create';
    onreset: () => void;
    disabled: boolean;
    isDataValid: boolean;
  };

  let { mode, onreset, disabled, isDataValid }: Props = $props();
</script>

<ControlSection>
  {#if mode === 'edit'}
    <Button
      color="primary"
      type="submit"
      disabled={disabled || !isDataValid}
      class="event-submitter">Save trip</Button
    >
    <Button color="primary" variant="text" onclick={onreset} {disabled}>Reset</Button>
  {:else}
    <Button
      color="primary"
      type="submit"
      disabled={disabled || !isDataValid}
      class="event-submitter">Create trip</Button
    >
  {/if}
</ControlSection>

<style lang="scss">
  .Controls {
    display: flex;
    margin: 0 -8px;

    :global(.dodo-ui-Button) {
      margin: 0 8px;
    }
  }
</style>
