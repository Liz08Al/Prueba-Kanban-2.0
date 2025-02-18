import { Page, Locator, expect } from '@playwright/test';

export class KanbanPage {
    readonly page: Page;
    readonly boardTitle: Locator;
    readonly newTaskButton: Locator;
    readonly taskInput: Locator;
    readonly addTaskButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.boardTitle = page.locator('.board-title');
        this.newTaskButton = page.locator('.add-task');
        this.taskInput = page.locator('input[name="taskName"]');
        this.addTaskButton = page.locator('.submit-task');
    }

    async navigate() {
        await this.page.goto('https://kanban-566d8.firebaseapp.com/');
    }

    async addTask(taskName: string) {
        await this.newTaskButton.click();
        await this.taskInput.fill(taskName);
        await this.addTaskButton.click();
    }

    async verifyTaskExists(taskName: string) {
        const task = this.page.locator(`text=${taskName}`);
        await expect(task).toBeVisible();
    }
}
