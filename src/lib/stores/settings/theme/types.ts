export type ThemeMode = 'light' | 'dark' | 'auto';

type ThemeOption = {
  value: ThemeMode;
  label: string;
};

export const enum ThemeAppBarColors {
  LIGHT = '#ddd6ff',
  DARK = '#1a162f', // #0f0324
}

export const themeOptions: ThemeOption[] = [
  {
    value: 'auto',
    label: 'Auto',
  },
  {
    value: 'light',
    label: 'Light',
  },
  {
    value: 'dark',
    label: 'Dark',
  },
];
