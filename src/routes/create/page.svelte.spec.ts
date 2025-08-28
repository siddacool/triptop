import { page } from '@vitest/browser/context';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Page from './+page.svelte';

describe('/+page.svelte', () => {
  it('should render h1', async () => {
    render(Page);

    const heading = page.getByRole('heading', { level: 1 });
    await expect.element(heading).toBeInTheDocument();
  });

  it('should render form', async () => {
    render(Page);

    const heading = page.getByRole('form');
    await expect.element(heading).toBeInTheDocument();
  });

  it('should render save button', async () => {
    render(Page);

    const button = page.getByRole('button');
    await expect.element(button).toBeInTheDocument();
  });
});
