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
      class="event-submitter">Save expense</Button
    >
    <Button color="primary" variant="text" onclick={onreset} {disabled}>Reset</Button>
  {:else}
    <Button
      color="primary"
      type="submit"
      disabled={disabled || !isDataValid}
      class="event-submitter">Save expense</Button
    >
    <Button
      color="primary"
      type="submit"
      disabled={disabled || !isDataValid}
      class="event-submitter"
      name="save-and-add-new"
    >
      Save and add new</Button
    >
  {/if}
</ControlSection>
