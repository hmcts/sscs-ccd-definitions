import {test} from "../lib/steps.factory";
import createCaseBasedOnCaseType from "../api/client/sscs/factory/appeal.type.factory";
import performAppealDormantOnCase from "../api/client/sscs/appeal.event";

let caseId: string;

test.describe('Write and Issue Adjournment Notice', {tag: '@pipeline'},  async () => {

    test.only("Write and Issue Adjournment Notice",
        async ({writeAndIssueAdjournmentNoticeSteps}) => {
            test.slow();
            let pipCaseId = await createCaseBasedOnCaseType('PIP');
            await writeAndIssueAdjournmentNoticeSteps.performWriteAndIssueAdjournmentAdjournmentNotice(pipCaseId);
            /*await issueFinalDecisionSteps.performWriteFinalDecisionForAPIPAppealNoAwardAndNoticeGenerated(pipCaseId);
            await issueFinalDecisionSteps.performIssueFinalDecisionForAnAppeal();
            await performAppealDormantOnCase(pipCaseId);*/
        });


})
