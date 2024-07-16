import {test} from "../lib/steps.factory";
import createCaseBasedOnCaseType from "../api/client/sscs/factory/appeal.type.factory";
import performAppealDormantOnCase from "../api/client/sscs/appeal.event";

let caseId: string;

test.describe('Issue Final Decision - PIP Appeal Type', async () => {

    test("Issue Final Decision - Upload Response with Further Information as No - Simple Decision Notice - 'Yes' notice generated. - No Award Given",
        async ({issueFinalDecisionSteps}) => {
            test.slow();
            let pipCaseId = await createCaseBasedOnCaseType('PIP');
            await issueFinalDecisionSteps.performWriteFinalDecisionForAPIPAppealNoAwardAndNoticeGenerated(pipCaseId);
            await issueFinalDecisionSteps.performIssueFinalDecisionForAPIPAppeal(pipCaseId);
            await performAppealDormantOnCase(pipCaseId);
        });

    test("Issue Final Decision - Upload Response with Further Information as No - Simple Decision Notice - 'Yes' notice generated. - Yes Award is Given",
        async ({issueFinalDecisionSteps}) => {
            test.slow();
            let pipCaseId = await createCaseBasedOnCaseType('PIP');
            await issueFinalDecisionSteps.performWriteFinalDecisionForAPIPAppealAwardAndNoticeGenerated(pipCaseId);
            //await issueFinalDecisionSteps.performIssueFinalDecisionForAPIPAppeal(pipCaseId);
            await performAppealDormantOnCase(pipCaseId);
        });

})
