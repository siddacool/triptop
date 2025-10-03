<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import UtilityButton from './UtilityButton.svelte';
  import type { StoryBookArgTypes } from '../../../storybook-types';
  import { buttonTypeArray } from '../Button/Button.svelte';
  import Icon from '@iconify/svelte';

  export const storyUtilityButtonArgTypes: StoryBookArgTypes = {
    type: {
      control: { type: 'select' },
      options: buttonTypeArray,
    },
  };

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    component: UtilityButton,
    tags: ['autodocs'],
    argTypes: storyUtilityButtonArgTypes,
  });
</script>

<!-- UtilityButton with default style -->
<Story name="Default" args={{ 'aria-label': 'action button' }}>
  <Icon icon="material-symbols:arrow-drop-up-rounded" width="28" height="28" />
</Story>

<!-- Anchor Link styled like a UtilityButton -->
<Story
  name="Link UtilityButton"
  args={{ href: 'https://www.w3schools.com/tags/tag_a.asp', 'aria-label': 'action button' }}
>
  <Icon icon="material-symbols:arrow-drop-up-rounded" width="28" height="28" />
</Story>

<Story name="Disabled" args={{ disabled: true }}>
  <Icon icon="material-symbols:arrow-drop-up-rounded" width="28" height="28" />
</Story>
