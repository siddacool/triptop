<script lang="ts">
  interface ProgressBarProps {
    fill: number;
    class?: string;
  }

  const { fill, class: className = '' }: ProgressBarProps = $props();
</script>

<div class={`ProgressBar ${className}`} data-fill={fill}>
  <span class="fill" style={`width: ${fill}%`}></span>
</div>

<style lang="csss">
  .ProgressBar {
    display: flex;
    background-color: var(--color-grey-400);
    height: 8px;
    width: 100%;
    overflow: hidden;
    border-radius: 4px;

    .fill {
      display: inline-flex;
      background-color: var(--color-primary-700);
      transition: width 400ms;
      border-radius: 2px;
    }
  }
</style>
