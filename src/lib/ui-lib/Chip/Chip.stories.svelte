<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Chip, { chipColorArray } from './Chip.svelte';
  import type { StoryBookArgTypes } from '../../../storybook-types';

  export const storyChipArgTypes: StoryBookArgTypes = {
    color: {
      control: { type: 'select' },
      options: chipColorArray,
    },
  };

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    component: Chip,
    tags: ['autodocs'],
    argTypes: storyChipArgTypes,
  });
</script>

<Story name="Primary">Some info</Story>

<Story name="Secondary" args={{ color: 'secondary' }}>Some info</Story>

<Story name="Neutral" args={{ color: 'neutral' }}>Some info</Story>

<Story name="Safe" args={{ color: 'safe' }}>Some info</Story>

<Story name="Warning" args={{ color: 'warning' }}>Some info</Story>

<Story name="Danger" args={{ color: 'danger' }}>Some info</Story>
