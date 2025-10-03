<script lang="ts">
  import { onNavigate } from '$app/navigation';
  import GlobalStyles from '$lib/components/GlobalStyles';
  import ThemeSetter from '$lib/components/ThemeSetter';

  let { children } = $props();

  onNavigate((navigation) => {
    if (!document.startViewTransition) return;

    return new Promise((resolve) => {
      document.startViewTransition(async () => {
        resolve();
        await navigation.complete;
      });
    });
  });
</script>

<GlobalStyles />
<ThemeSetter />
<main>
  <div class="box">
    {@render children?.()}
  </div>
</main>

<style lang="scss">
  main {
    height: 100vh;
    width: 100vw;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 16px;
    padding-bottom: 0;
  }

  .box {
    width: 100%;
    max-width: 550px;
    margin: 0 auto;
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
  }

  @keyframes fade-out {
    to {
      opacity: 0;
    }
  }

  @keyframes slide-from-right {
    from {
      transform: translateX(30px);
    }
  }

  @keyframes slide-to-left {
    to {
      transform: translateX(-30px);
    }
  }

  :root::view-transition-old(root) {
    animation:
      50ms cubic-bezier(0.4, 0, 1, 1) both fade-out,
      120ms cubic-bezier(0.4, 0, 0.2, 1) both slide-to-left;
  }

  :root::view-transition-new(root) {
    animation:
      80ms cubic-bezier(0, 0, 0.2, 1) 40ms both fade-in,
      120ms cubic-bezier(0.4, 0, 0.2, 1) both slide-from-right;
  }
</style>
