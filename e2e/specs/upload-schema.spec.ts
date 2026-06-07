import { test } from "@playwright/test";
import { Editor } from "../components/Editor";
import { validSchema } from "../data/schemas/sample.schema";

test.describe("Editor", () => {
    let editor: Editor;

    test.beforeEach(async ({ page }) => {
        editor = new Editor(page);
        await editor.open();
    });

    test("user can upload and check validation of schema", async ({ page }) => {

        await editor.pasteSchema(JSON.stringify(validSchema))
        await editor.checkValidation("Valid JSON Schema");
    });
});