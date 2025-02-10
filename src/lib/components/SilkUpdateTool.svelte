<script lang="ts">
  import { useSilkStore } from '$lib/stores/silk/silk.svelte';
  import { SilkAction } from '$lib/stores/silk/types';
  import Button from './ui-framework/Form/Button.svelte';
  import NumberInput from './ui-framework/Form/NumberInput.svelte';

  let value = $state(1);

  function isDigitsOnly(value: string): boolean {
    const regex: RegExp = /^\d+$/; // Matches strings containing only digits
    return regex.test(value);
  }

  function add() {
    useSilkStore.update(value, SilkAction.ADD);

    value = 1;
  }

  function remove() {
    useSilkStore.update(value, SilkAction.REMOVE);

    value = 1;
  }

  function oninput(e: Event) {
    const target = e.target as HTMLInputElement;

    value = Number(target.value);
  }
</script>

<div>
  <p>Remove / Add Silks</p>
  <article>
    <Button onclick={remove} disabled={!isDigitsOnly(`${value}`) || !value} variant="danger"
      >-</Button
    >
    <NumberInput {value} {oninput} />
    <Button onclick={add} disabled={!isDigitsOnly(`${value}`) || !value}>+</Button>
  </article>
</div>

<style lang="scss">
  article {
    display: flex;
    flex: 1;

    :global(.NumberInput) {
      padding: 0 8px;
      width: 100%;
      flex: 1;
    }

    :global(.Button) {
      font-size: 1.4rem;
    }

    :global(input) {
      width: 100%;
    }
  }

  p {
    text-align: center;
    margin-top: 0;
    font-weight: 500;
  }
</style>
