import {test} from "../lib/steps.factory";
import createCaseBasedOnCaseType from "../api/client/sscs/factory/appeal.type.factory";
import performAppealDormantOnCase from "../api/client/sscs/appeal.event";

let caseId: string;

test.only("Issue Final Decision - Upload Response with Further Information as No - Simple Decision Notice - 'Yes' notice generated.",
    async ({issueFinalDecisionSteps}) => {
        test.slow();
        let pipCaseId = await createCaseBasedOnCaseType('PIP');
        await issueFinalDecisionSteps.performWriteFinalDecisionForAPIPAppeal(pipCaseId);
        await issueFinalDecisionSteps.performIssueFinalDecisionForAPIPAppeal(pipCaseId);
        await performAppealDormantOnCase(pipCaseId);
    });

