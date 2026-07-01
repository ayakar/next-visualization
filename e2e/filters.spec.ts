import { test, expect } from '@playwright/test';

test.describe('URL-backed filters (nuqs)', () => {
    test('selecting a risk factor writes it to the URL', async ({ page }) => {
        await page.goto('/');

        await page.getByRole('checkbox', { name: 'Flooding' }).click();

        await expect(page).toHaveURL(/[?&]risk=Flooding/);
        await expect(page.getByRole('checkbox', { name: 'Flooding' })).toBeChecked();
    });

    test('a filter in the URL is restored on load (shareable state)', async ({ page }) => {
        await page.goto('/?risk=Flooding');

        await expect(page.getByRole('checkbox', { name: 'Flooding' })).toBeChecked();
        await expect(page.getByRole('checkbox', { name: 'Wildfire' })).not.toBeChecked();
    });

    test('multiple risk factors accumulate in the URL', async ({ page }) => {
        await page.goto('/');

        await page.getByRole('checkbox', { name: 'Flooding' }).click();
        await page.getByRole('checkbox', { name: 'Wildfire' }).click();

        await expect(page).toHaveURL(/risk=Flooding.*Wildfire|risk=Flooding%2CWildfire|risk=Flooding,Wildfire/);
    });

    test('Clear filters resets the URL and the controls', async ({ page }) => {
        await page.goto('/?risk=Flooding');

        const clear = page.getByRole('button', { name: /clear filters/i });
        await expect(clear).toBeVisible();
        await clear.click();

        await expect(page).not.toHaveURL(/risk=/);
        await expect(page.getByRole('checkbox', { name: 'Flooding' })).not.toBeChecked();
        await expect(clear).toBeHidden();
    });
});
