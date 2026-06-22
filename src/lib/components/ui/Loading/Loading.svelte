<script lang="ts">
  type Props = {
    class?: string;
  };

  const { class: className = '' }: Props = $props();

  const classes = $derived(['Loading', className].filter(Boolean));
</script>

<div class={classes.join(' ')}>
  <span class="loader"></span>
</div>

<style lang="scss">
  .Loading {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: var(--dodo-ui-space) 0;
  }

  .loader {
    --loader-c1: rgba(0, 0, 0, 0.15);
    --loader-c2: rgba(0, 0, 0, 0.25);
    --loader-c3: rgba(0, 0, 0, 0.35);
    --loader-c4: rgba(0, 0, 0, 0.75);

    border: 18px solid;
    border-color: var(--loader-c1) var(--loader-c2) var(--loader-c3) var(--loader-c4);
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: animloader 1s linear infinite;
  }

  /* Dark mode */
  :global(.dodo-theme--dark) .loader {
    --loader-c1: rgba(255, 255, 255, 0.15);
    --loader-c2: rgba(255, 255, 255, 0.25);
    --loader-c3: rgba(255, 255, 255, 0.35);
    --loader-c4: rgba(255, 255, 255, 0.75);
  }

  @keyframes animloader {
    0% {
      border-color: var(--loader-c1) var(--loader-c2) var(--loader-c3) var(--loader-c4);
    }
    33% {
      border-color: var(--loader-c4) var(--loader-c1) var(--loader-c2) var(--loader-c3);
    }
    66% {
      border-color: var(--loader-c3) var(--loader-c4) var(--loader-c1) var(--loader-c2);
    }
    100% {
      border-color: var(--loader-c2) var(--loader-c3) var(--loader-c4) var(--loader-c1);
    }
  }
</style>
