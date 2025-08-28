export const enum AppColorSchemes {
  LIGHT = 'light',
  DARK = 'dark',
}

function createThemeStore() {
  let theme: AppColorSchemes = $state(AppColorSchemes.LIGHT);

  return {
    get theme() {
      return theme;
    },
    update(themeData: AppColorSchemes) {
      theme = themeData;
    },
  };
}

export const useThemeStore = createThemeStore();
