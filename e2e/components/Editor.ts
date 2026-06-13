import { Page, expect } from "@playwright/test";

export class Editor {
    constructor(private page: Page) { }

    private get editorBox() {
        return this.page.locator(".monaco-editor");
    }

    async open() {
        await this.page.goto("/");
        await expect(this.editorBox).toBeAttached({ timeout: 10000 })
    }

    async pasteSchema(schemaText: string) {
        await this.page.evaluate((text) => {
            if (!window.monaco || !window.monaco.editor) {
                throw new Error("Monaco editor is not initialized on the window object yet.");
            }

            const models = window.monaco.editor.getModels();
            if (!models || models.length === 0) {
                throw new Error("No active Monaco editor models found to set schema.");
            }

            models[0].setValue(text);
        }, schemaText);
    }

    async checkValidation(text: string) {
        const validationElement = this.page.getByRole("status");
        await expect(validationElement).toContainText(text);
    }
}