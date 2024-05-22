import { test } from "../lib/baseTest";

test("As a caseworker add note to a case", async ({ addNoteSteps }) => {

    await addNoteSteps.submitNoteSuccessfully();
});