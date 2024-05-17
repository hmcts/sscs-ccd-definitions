import { test } from "../lib/steps.factory";

test("Send to admin",{tag: '@wip'}, async ({ sendToAdminSteps }) => {
    await sendToAdminSteps.performSendToAdmin()
});
