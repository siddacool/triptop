<script lang="ts">
  type Props = {
    class?: string;
    size?: number;
  };

  const { class: className = '', size = 1.45 }: Props = $props();

  const classes = $derived(['BubbleLoader', className].filter(Boolean));
</script>

<div class={classes.join(' ')} style={`--size: ${size}px;`} aria-hidden="true"></div>

<style lang="scss">
  .BubbleLoader {
    --color-1: rgba(0, 0, 0, 0.2);
    --color-2: rgba(0, 0, 0, 0.8);

    width: calc(64 * var(--size));
    height: calc(64 * var(--size));
    border-radius: 50%;
    position: relative;
    background: var(--color-1);
  }

  .BubbleLoader::before,
  .BubbleLoader::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: var(--color-2);
  }

  .BubbleLoader::before {
    animation: slide 1s infinite linear alternate;
    opacity: 0.5;
  }

  .BubbleLoader::after {
    animation: slide2 1s infinite linear alternate;
    opacity: 1;
  }

  :global(.dodo-theme--dark) .BubbleLoader {
    --color-1: rgba(255, 255, 255, 0.8);
    --color-2: #fff;
  }

  @keyframes slide {
    0%,
    20% {
      transform: translate(0, 0);
    }

    80%,
    100% {
      transform: translate(calc(15 * var(--size)), calc(15 * var(--size)));
    }
  }

  @keyframes slide2 {
    0%,
    20% {
      transform: translate(0, 0);
    }

    80%,
    100% {
      transform: translate(calc(-15 * var(--size)), calc(-15 * var(--size)));
    }
  }
</style>
