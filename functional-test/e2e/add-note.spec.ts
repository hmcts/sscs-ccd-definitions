import { test } from "../lib/steps.factory";

test("Test to Add a note to a case", async ({ addNoteSteps }) => {
    await addNoteSteps.performAddANote();
});
