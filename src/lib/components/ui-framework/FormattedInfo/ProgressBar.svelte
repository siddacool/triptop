<script lang="ts">
  interface ProgressBarProps {
    fill: number;
    class?: string;
  }

  const { fill, class: className = '' }: ProgressBarProps = $props();
</script>

<progress value={fill} max="100" class={`Progress ${className}`}>
  {fill}%
</progress>
