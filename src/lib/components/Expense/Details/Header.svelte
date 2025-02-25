<script lang="ts">
  import { page } from '$app/state';
  import AnchorButton from '$lib/components/ui-framework/Form/AnchorButton.svelte';
  import Icon from '@iconify/svelte';

  const expenseId = page.params.expenseId;
  const tripId = page.params.tripId;
</script>

<header>
  <section>
    <h2>Expense details</h2>
  </section>

  <AnchorButton compact href={`/${tripId}/${expenseId}/edit`}>
    <Icon icon="material-symbols:edit" />
  </AnchorButton>
</header>

<style lang="scss">
  header {
    margin-bottom: 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  h2 {
    margin: 0;
    font-weight: 500;
  }
</style>
