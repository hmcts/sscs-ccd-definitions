import { test } from "../lib/stepsFactory";

test("As a caseworker add note to a case", async ({ addNoteSteps }) => {

    await addNoteSteps.performAddANote();
});
