<script lang="ts">
  import { Button } from '@flightlesslabs/dodo-ui';

  type Props = {
    mode: 'edit' | 'create';
    onreset: () => void;
    disabled: boolean;
    isDataValid: boolean;
  };

  let { mode, onreset, disabled, isDataValid }: Props = $props();
</script>

<div class="Controls">
  {#if mode === 'edit'}
    <Button color="primary" type="submit" disabled={disabled || !isDataValid}>Save trip</Button>
    <Button color="primary" variant="text" onclick={onreset} {disabled}>Reset</Button>
  {:else}
    <Button color="primary" type="submit" disabled={disabled || !isDataValid}>Create trip</Button>
  {/if}
</div>

<style lang="scss">
  .Controls {
    display: flex;
    margin: 0 -8px;

    :global(.dodo-ui-Button) {
      margin: 0 8px;
    }
  }
</style>
