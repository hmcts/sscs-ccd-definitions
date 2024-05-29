import { test } from "../lib/steps.factory";

test("As a caseworker Void a case", async ({ voidCaseSteps }) => {
    await voidCaseSteps.performVoidCase();
});