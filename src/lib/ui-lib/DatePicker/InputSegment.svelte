<script lang="ts">
  import { DatePicker, type SegmentPart } from 'bits-ui';

  export type InputSegmentDataItem = {
    part: SegmentPart;
    value: string;
  };

  interface InputSegmentProps {
    data: InputSegmentDataItem[];
  }

  const { data }: InputSegmentProps = $props();

  let newData = $state<InputSegmentDataItem[]>([]);

  $effect(() => {
    const month = [data[0], data[1]];
    const day = [data[2], data[3]];
    const year = [data[4]];

    newData = [...day, ...month, ...year];
  });
</script>

<div class="InputSegment">
  {#each newData as { part, value: valueInternal }, i (part + i)}
    <div class="DatePickerInputSegmentHolder">
      {#if part === 'literal'}
        <DatePicker.Segment {part} class="DatePickerInputSegment">
          {valueInternal}
        </DatePicker.Segment>
      {:else}
        <DatePicker.Segment {part} class="DatePickerInputSegment DatePickerInputSegmentPart">
          {valueInternal}
        </DatePicker.Segment>
      {/if}
    </div>
  {/each}
</div>
