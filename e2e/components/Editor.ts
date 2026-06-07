import { Page, expect } from "@playwright/test";

export class Editor {
    constructor(private page: Page) { }
    async open() {
        await this.page.goto("/");
        const editorTextBox = this.page.getByRole("textbox", { name: "Editor content" });
        await expect(editorTextBox).toBeVisible();
    }

    async pasteSchema(schema: string) {
        await this.page.evaluate((schema) => {
            if (!window.monaco || !window.monaco.editor) {
                throw new Error("Monaco editor is not initialized on the window object yet.");
            }
            const models = window.monaco.editor.getModels();

            if (models && models.length > 0) {
                models[0].setValue(schema);
            } else {
                throw new Error("No active Monaco editor models found to set schema.");
            }
        }, schema);
    }

    async checkValidation(text: string) {
        const validationElement = this.page.getByRole("status");
        await expect(validationElement).toContainText(text);
    }
}