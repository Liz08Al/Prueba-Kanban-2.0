import { test, expect } from '@playwright/test';
import { KanbanPage } from '../pages/KanbanPage';

test.describe('Kanban Board Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Verify that lists exist', async ({ page }) => {
    const lists = page.locator('.list');  
    await expect(lists).toHaveCount(1);
  });

  test('Add New Card', async ({ page }) => {
    const addCardButton = page.locator('button:has-text("Add Card")').first();
    await addCardButton.click();

    const input = page.locator('input[placeholder="Enter card title"]');
    await input.fill('New Task');
    await input.press('Enter');

    const newCard = page.locator('.card:has-text("New Task")');
    await expect(newCard).toBeVisible();
  });

  test('Move Card between the lists', async ({ page }) => {
    const card = page.locator('.card').first();
    const targetList = page.locator('.list').nth(1);

    const cardText = await card.innerText(); // Guardar el texto de la tarjeta antes de moverla

    await card.dragTo(targetList);

    await expect(targetList.locator('.card')).toContainText(cardText);
  });

  test('Delete Card', async ({ page }) => {
    const card = page.locator('.card').first();
    await card.hover();

    const deleteButton = card.locator('button:has-text("Delete")');
    await deleteButton.click();

    await expect(page.locator('.card')).not.toContainText(await card.innerText());
  });

});

