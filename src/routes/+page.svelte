<script lang="ts">
  import ActionButton from '$lib/ui-lib/ActionButton';
  import Icon from '@iconify/svelte';
</script>

<h1>
  <img src="favicon.svg" alt="icon" />
  Triptop
</h1>

<h3>Travel budgeting app</h3>

<ActionButton href="/create" aria-label="Create Trip">
  <Icon icon="material-symbols:add" />
</ActionButton>

<style lang="scss">
  h1 {
    display: flex;
    font-weight: 500;
    justify-content: center;
    align-items: center;
    margin-top: 0;
    padding-top: 20px;

    img {
      width: 45px;
      height: auto;
      margin-right: 12px;
    }
  }

  h3 {
    text-align: center;
    margin-top: 0;
    font-weight: 400;
  }
</style>
