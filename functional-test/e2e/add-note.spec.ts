import { test } from "../lib/steps.factory";

test("As a caseworker add note to a case", async ({ addNoteSteps }) => {

    await addNoteSteps.performAddANote();
});
