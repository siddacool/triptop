<script lang="ts">
  import Chip from '../Chip/Chip.svelte';

  type Props = {
    class?: string;
  };

  const { class: className = '' }: Props = $props();

  const classes = $derived(['ArchivedTag', className].filter(Boolean));
</script>

<Chip color="neutral" class={classes.join(' ')}>Archived</Chip>
