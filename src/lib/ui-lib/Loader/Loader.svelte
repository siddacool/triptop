<script lang="ts">
  interface LoaderProps {
    ref?: HTMLSpanElement;
    class?: string;
  }

  import './Loader.style.scss';

  let { ref = $bindable<HTMLDivElement>(), class: className = '' }: LoaderProps = $props();
</script>

<span bind:this={ref} class={['Loader', className].join(' ')}></span>

<style lang="scss">
</style>
