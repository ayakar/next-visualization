import { test, expect } from '@playwright/test';

test.describe('dashboard shell', () => {
    test('renders the header, filters and all three data panels', async ({ page }) => {
        await page.goto('/');

        await expect(page.getByRole('heading', { name: 'Climate Risk Overview' })).toBeVisible();

        // filter controls
        await expect(page.getByRole('checkbox', { name: 'Flooding' })).toBeVisible();

        // the three cards
        await expect(page.getByText(/geographic distribution/i)).toBeVisible();
        await expect(page.getByText(/average risk/i)).toBeVisible();
        await expect(page.getByText(/asset ledger/i)).toBeVisible();

        // map renders (Leaflet mounts a container) and the table has data
        await expect(page.locator('.leaflet-container')).toBeVisible();
        await expect(page.getByText('Asset Name')).toBeVisible();
    });
});
