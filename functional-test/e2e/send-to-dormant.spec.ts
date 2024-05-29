import { test } from "../lib/steps.factory";

test("As a caseworker set a Case to Dormant", async ({ sendToDormantSteps }) => {
    await sendToDormantSteps.performSendToDormant();
});