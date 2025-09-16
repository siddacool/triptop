<script lang="ts">
  import { Column } from '@flightlesslabs/grid';
  import Divider from './Divider.svelte';
</script>

<Column>
  <div class="FormCardDivider">
    <Divider />
  </div>
</Column>

<style lang="scss">
  .FormCardDivider {
    margin-top: 14px;
    margin-bottom: 8px;
    margin-left: -14px;
    margin-right: -14px;
  }
</style>
