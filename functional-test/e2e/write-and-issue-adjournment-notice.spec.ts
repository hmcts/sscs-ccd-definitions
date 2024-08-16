import {test} from "../lib/steps.factory";
import createCaseBasedOnCaseType from "../api/client/sscs/factory/appeal.type.factory";
import performAppealDormantOnCase from "../api/client/sscs/appeal.event";
import {write} from "node:fs";
import {credentials} from "../config/config";

let caseId: string;

test.describe('Write and Issue Adjournment Notice', {tag: '@pipeline'}, async () => {

    test("Write and Issue Adjournment Notice",
        async ({writeAndIssueAdjournmentNoticeSteps, hearingSteps}) => {
            test.slow();
            let pipCaseId = await createCaseBasedOnCaseType('PIP');
            await writeAndIssueAdjournmentNoticeSteps.performAnUploadResponseOnTheCase(pipCaseId);
            await writeAndIssueAdjournmentNoticeSteps.performLoginAndNavigateToCase(credentials.hmcCaseOfficer, pipCaseId);
            await writeAndIssueAdjournmentNoticeSteps.performNavigateToHistoryTab();
            await hearingSteps.verifyManualHearingCancellation();
            await writeAndIssueAdjournmentNoticeSteps.signOut();
            await writeAndIssueAdjournmentNoticeSteps.performLoginAndNavigateToCase(credentials.caseWorker, pipCaseId);
            await writeAndIssueAdjournmentNoticeSteps.performWriteAdjournmentNotice();
            await writeAndIssueAdjournmentNoticeSteps.performIssueAdjournmentForAnAppeal();
            await writeAndIssueAdjournmentNoticeSteps.verifyOverrideListingRequirementsForAnAppeal();
            await writeAndIssueAdjournmentNoticeSteps.verifyHearingsTabForTheActiveHearing();
            //await performAppealDormantOnCase(pipCaseId);
        });


})
