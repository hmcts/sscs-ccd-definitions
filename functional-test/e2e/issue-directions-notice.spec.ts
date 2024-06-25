import {test} from "../lib/steps.factory";
import createCaseBasedOnCaseType from "../api/client/sscs/factory/appeal.type.factory";
import performAppealDormantOnCase from "../api/client/sscs/appeal.event";

let caseId: string;
test.only("Issue Direction Notice - Pre Hearing - Normal Tax Credit Application - Appeal to Proceed",
    async ({issueDirectionsNoticeSteps}) => {
    test.slow();
    await issueDirectionsNoticeSteps.performIssueDirectionNoticePreHearingAppealToProceed();
});
