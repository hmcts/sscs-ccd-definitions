import { test } from "../lib/steps.factory";

test("Send to admin", async ({ sendToAdminSteps }) => {
    await sendToAdminSteps.performSendToAdmin();
});
