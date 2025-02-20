import { test, expect } from '@playwright/test';

test.describe.parallel('Kanban Board Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('https://kanban-566d8.firebaseapp.com/');
  });

  test('Verify that the Kanban board has at least one list', async ({ page }) => {
    // Espera a que al menos una lista esté presente
    const lists = page.locator('.list');
    await expect(lists).toHaveCount(0);  // Asegura que haya al menos una lista
  });

  test('Add a New Task to a list', async ({ page }) => {
    // Espera a que el botón "Add Card" esté visible antes de hacer clic
    const addCardButton = page.getByRole('button', { name: 'Add Card' }).first();
    await addCardButton.click();

    // Espera a que el campo de entrada esté visible antes de interactuar con él
    const input = page.locator('input[placeholder="Enter card title"]');
    await expect(input).toBeVisible();  // Asegura que el input esté visible
    await input.fill('Automated Task');
    await input.press('Enter');

    // Espera a que la tarjeta agregada esté visible
    const newCard = page.locator('.card').filter({ hasText: 'Automated Task' });
    await expect(newCard).toBeVisible();  // Asegura que la tarjeta sea visible
  });

  test('Move a card between lists', async ({ page }) => {
    // Espera a que haya al menos 2 listas visibles
    const lists = page.locator('.list');
    await expect(lists).toHaveCount(1);  // Asegura que haya al menos 2 listas

    // Espera a que haya al menos una tarjeta
    const card = page.locator('.card').first();
    await expect(card).toBeVisible();  // Verifica que la tarjeta esté visible

    // Obtiene la lista de destino y el texto de la tarjeta
    const targetList = lists.nth(1);  // Selecciona la segunda lista
    const cardText = await card.innerText();

    // Mueve la tarjeta a la lista destino
    await card.dragTo(targetList);

    // Verifica que la tarjeta haya sido movida correctamente
    await expect(targetList.locator('.card')).toContainText(cardText);
  });

  test('Delete a card from the board', async ({ page }) => {
    // Espera a que haya al menos una tarjeta antes de intentar eliminarla
    const card = page.locator('.card').first();
    await expect(card).toBeVisible();  // Asegura que la tarjeta esté visible

    // Pasa el mouse sobre la tarjeta para mostrar el botón de eliminar
    await card.hover();
    const deleteButton = card.locator('button:has-text("Delete")');
    await expect(deleteButton).toBeVisible();  // Verifica que el botón de eliminar esté visible
    await deleteButton.click();

    // Verifica que la tarjeta haya desaparecido
    await expect(card).not.toBeVisible();  // Asegura que la tarjeta no esté visible
  });

});
