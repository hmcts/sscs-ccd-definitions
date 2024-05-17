import { test } from "../lib/steps.factory";

test("Send to Judge", async ({ sendToJudgeSteps }) => {
    let caseReference = await sendToJudgeSteps.createCase();
    await sendToJudgeSteps.performSendToJudge(caseReference);
});
