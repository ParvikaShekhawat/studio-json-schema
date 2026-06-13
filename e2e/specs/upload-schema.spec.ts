import { test } from "@playwright/test";
import { Editor } from "../components/Editor";
import { validSchema } from "../data/schemas/sample.schema";

test.describe("Editor", () => {
    let editor: Editor;

    test.beforeEach(async ({ page }) => {
        editor = new Editor(page);
        await editor.open();
    });

    test("user can paste a schema in editor", async ({ }) => {
        await editor.pasteSchema(JSON.stringify(validSchema));
        await editor.verifyPaste(new RegExp("\\S+"));
    });
});