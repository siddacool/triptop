<script lang="ts">
  import AddExpense from './AddExpense.svelte';
</script>

<div class="FloatingControls">
  <AddExpense />
</div>

<style lang="scss">
  .FloatingControls {
    display: flex;
    flex-direction: column;
    position: fixed;
    right: calc(var(--dodo-ui-space) * 3);
    bottom: calc(var(--dodo-ui-space) * 6);
    z-index: 10;

    @media (min-width: 800px) {
      right: initial;
      left: 50%;
      transform: translateX(-50%);
      margin-left: 368px;
    }
  }
</style>
