import { test, expect } from '@playwright/test';

test.describe('navigation & table', () => {
    test('sidebar links through to the About page', async ({ page }) => {
        await page.goto('/');

        await page.getByRole('link', { name: 'About' }).click();

        await expect(page).toHaveURL(/\/about$/);
        await expect(page.getByRole('heading', { name: 'Summary' })).toBeVisible();
    });

    test('table pagination advances to the next page', async ({ page }) => {
        await page.goto('/');

        const page2 = page.getByRole('button', { name: 'Go to page 2' });
        await expect(page2).toBeEnabled();
        await page2.click();

        // the current page button is disabled — confirms we moved to page 2
        await expect(page2).toBeDisabled();
    });
});
