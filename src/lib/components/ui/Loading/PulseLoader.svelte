<script lang="ts">
  type Props = {
    class?: string;
    size?: number;
  };

  const { class: className = '', size = 1 }: Props = $props();

  const classes = $derived(['PulseLoader', className].filter(Boolean));
</script>

<div class={classes.join(' ')} style={`--size: ${size}px;`} aria-hidden="true"></div>

<style lang="scss">
  .PulseLoader {
    --color: rgba(0, 0, 0, 0.8);

    width: calc(48 * var(--size));
    height: calc(48 * var(--size));
    display: inline-block;
    position: relative;
  }

  .PulseLoader::before,
  .PulseLoader::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: var(--color);
    animation: pulse 2s ease-in-out infinite;
  }

  .PulseLoader::after {
    animation-delay: 1s;
  }

  :global(.dodo-theme--dark) .PulseLoader {
    --color: #fff;
  }

  @keyframes pulse {
    0%,
    100% {
      transform: scale(0);
      opacity: 1;
    }

    50% {
      transform: scale(1);
      opacity: 0;
    }
  }
</style>
