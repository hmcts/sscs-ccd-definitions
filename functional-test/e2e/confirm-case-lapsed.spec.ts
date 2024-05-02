import { test } from "../lib/steps.factory";

test("Test that the Case can be lapsed", async ({ confirmCaseLapsedSteps }) => {
    await confirmCaseLapsedSteps.performConfirmCaseLapsed();
});
