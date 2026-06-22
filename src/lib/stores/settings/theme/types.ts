export type ThemeMode = 'light' | 'dark' | 'auto';

type ThemeOption = {
  value: ThemeMode;
  label: string;
};

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
