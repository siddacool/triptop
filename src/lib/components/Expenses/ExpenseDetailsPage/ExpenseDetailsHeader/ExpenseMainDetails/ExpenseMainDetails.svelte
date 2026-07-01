<script>
  import { Column } from '@flightlesslabs/dodo-ui';
  import Controls from './Controls/Controls.svelte';
  import Title from './Title.svelte';
</script>

<Column>
  <div class="ExpenseMainDetails">
    <Title />
    <Controls />
  </div>
</Column>

<style lang="scss">
  .ExpenseMainDetails {
    display: flex;
    align-items: flex-end;
    width: 100%;
    min-height: 40px;
  }
</style>
