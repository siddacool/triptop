import type { Preview } from '@storybook/sveltekit';
import { themes } from 'storybook/theming';
import './global.scss';
import { addons } from 'storybook/internal/preview-api';
import { DARK_MODE_EVENT_NAME } from '@vueless/storybook-dark-mode';
import { useThemeStore, AppColorSchemes } from '../src/lib/stores/theme.svelte';

const channel = addons.getChannel();

channel.on(DARK_MODE_EVENT_NAME, (condition) => {
  if (condition) {
    useThemeStore.update(AppColorSchemes.DARK);
  } else {
    useThemeStore.update(AppColorSchemes.LIGHT);
  }
});

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    darkMode: {
      // Set the initial theme
      current: 'light',
      // Override the default dark theme
      dark: themes.dark,
      // Override the default light theme
      light: themes.light,
      stylePreview: true,
      darkClass: ['dodo-theme--dark'],
      lightClass: ['dodo-theme--light'],
    },
  },
};

export default preview;
