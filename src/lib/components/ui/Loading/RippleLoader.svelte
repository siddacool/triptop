<script lang="ts">
  type Props = {
    class?: string;
    size?: number;
  };

  const { class: className = '', size = 1 }: Props = $props();

  const classes = $derived(['RippleLoader', className].filter(Boolean));
</script>

<div class={classes.join(' ')} style={`--size: ${size}px;`} aria-hidden="true"></div>

<style lang="scss">
  .RippleLoader {
    --color: rgba(0, 0, 0, 0.8);

    width: calc(48 * var(--size));
    height: calc(48 * var(--size));
    display: inline-block;
    position: relative;
  }

  .RippleLoader::before,
  .RippleLoader::after {
    content: '';
    position: absolute;
    inset: 0;
    box-sizing: border-box;
    border-radius: 50%;
    background: var(--color);

    /* Prevent the initial dark dot */
    opacity: 0;
    transform: scale(0);

    animation: ripple 2s linear infinite;
    will-change: transform, opacity;
  }

  .RippleLoader::after {
    animation-delay: 1s;
  }

  :global(.dodo-theme--dark) .RippleLoader {
    --color: #fff;
  }

  @keyframes ripple {
    0% {
      transform: scale(0);
      opacity: 0;
    }

    10% {
      opacity: 1;
    }

    100% {
      transform: scale(1);
      opacity: 0;
    }
  }
</style>
