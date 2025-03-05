<script lang="ts">
  import DateInput from '$lib/components/ui-framework/Form/DateInput.svelte';
  import FormLabel from '$lib/components/ui-framework/Form/shared/FormLabel.svelte';
  import TimeInput from '$lib/components/ui-framework/Form/TimeInput.svelte';
  import StackItem from '$lib/components/ui-framework/Layout/Stack/StackItem.svelte';

  interface Props {
    oninput: (e: Event) => void;
    dateDate: string;
    dateTime: string;
  }

  const { oninput, dateDate, dateTime }: Props = $props();
</script>

<StackItem>
  <div class="Date">
    <FormLabel label="Select date" />

    <section>
      <DateInput value={dateDate} {oninput} name="date_date" />
      <TimeInput value={dateTime} {oninput} name="date_time" />
    </section>
  </div>
</StackItem>

<style lang="scss">
  .Date {
    section {
      display: flex;

      :global(.DateInput) {
        margin-right: 16px;
        flex: 1;
      }

      :global(.TimeInput) {
        flex: 1;
      }
    }
  }
</style>
