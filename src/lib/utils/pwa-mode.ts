interface NavigatorWithStandalone extends Navigator {
  standalone?: boolean;
}

export function isPWAMode() {
  const nav = window.navigator as NavigatorWithStandalone;

  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    window.matchMedia('(display-mode: fullscreen)').matches ||
    window.matchMedia('(display-mode: minimal-ui)').matches ||
    nav.standalone === true
  );
}
