import { test } from "../lib/steps.factory";

test.skip("As a caseworker create an Evidence Reminder", async ({ evidenceReminderSteps }) => {
    await evidenceReminderSteps.performEvidenceReminder();
});