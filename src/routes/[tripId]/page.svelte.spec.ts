import { page } from '@vitest/browser/context';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Page from './+page.svelte';

describe('/+page.svelte', () => {
  it('should render add button', async () => {
    render(Page);

    const link = page.getByRole('link');
    await expect.element(link).toBeInTheDocument();
  });
});
