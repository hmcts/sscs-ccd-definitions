import { test } from "../lib/steps.factory";
import { credentials } from '../config/config';

test("Send to admin", async ({ sendToAdminSteps }) => {
    let caseReference = await sendToAdminSteps.createCase("TAX CREDIT");
    await sendToAdminSteps.performSendToAdmin(caseReference, credentials.caseWorker);
});
