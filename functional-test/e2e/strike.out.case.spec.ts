import { test } from "../lib/steps.factory";

test("As a caseworker Strike out case", async ({ strikeOutCaseSteps }) => {
    await strikeOutCaseSteps.performStrikeOutCase();
});