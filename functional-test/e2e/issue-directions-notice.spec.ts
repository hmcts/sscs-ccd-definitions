import {test} from "../lib/steps.factory";
import createCaseBasedOnCaseType from "../api/client/sscs/factory/appeal.type.factory";
import performAppealDormantOnCase from "../api/client/sscs/appeal.event";

let caseId: string;
test("Issue Direction Notice - Pre Hearing - Normal Tax Credit Application - Appeal to Proceed",
    async ({issueDirectionsNoticeSteps}) => {
        test.slow();
        await issueDirectionsNoticeSteps.performIssueDirectionNoticePreHearingAppealToProceed();
});

test("Issue Direction Notice - Post Hearing - Employment Support Application - Provide Information",
    async ({issueDirectionsNoticeSteps}) => {
        test.slow();
        await issueDirectionsNoticeSteps.performIssueDirectionNoticePostHearingESAAppealToProceed();
});

test("Issue Direction Notice - Post Hearing - Disability Living Allowance Application - Provide Information",
    async ({issueDirectionsNoticeSteps}) => {
        test.slow();
        await issueDirectionsNoticeSteps.performIssueDirectionNoticePostHearingDLAAppealToProceed();
    });

test.only("Issue Direction Notice - Error Messages Test",
    async ({issueDirectionsNoticeSteps}) => {
            test.slow();
            await issueDirectionsNoticeSteps.performIssueDirectionErrorMessages();
    });
