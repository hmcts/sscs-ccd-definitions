import { test } from "../lib/steps.factory";

test("Send to Judge", async ({ sendToJudgeSteps }) => {
    await sendToJudgeSteps.performSendToJudge();
});
