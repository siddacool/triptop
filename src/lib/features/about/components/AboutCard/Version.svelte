<script lang="ts">
  import pkg from '../../../../../../package.json';
</script>

<div class="Version">Version {pkg.version}</div>

<style lang="scss">
  .Version {
    color: var(--dodo-color-neutral-600);
    font-weight: 500;
    margin-top: calc(var(--dodo-ui-space) * 2);
  }
</style>
