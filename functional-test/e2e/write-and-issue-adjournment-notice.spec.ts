import {test} from "../lib/steps.factory";
import createCaseBasedOnCaseType from "../api/client/sscs/factory/appeal.type.factory";
import performAppealDormantOnCase from "../api/client/sscs/appeal.event";
import {write} from "node:fs";

let caseId: string;

test.describe('Write and Issue Adjournment Notice', {tag: '@pipeline'},  async () => {

    test.only("Write and Issue Adjournment Notice",
        async ({writeAndIssueAdjournmentNoticeSteps}) => {
            test.slow();
            let pipCaseId = await createCaseBasedOnCaseType('PIP');
            await writeAndIssueAdjournmentNoticeSteps.performWriteAndIssueAdjournmentAdjournmentNotice(pipCaseId);
            await writeAndIssueAdjournmentNoticeSteps.performIssueAdjournmentForAnAppeal();
            await writeAndIssueAdjournmentNoticeSteps.verifyOverrideListingRequirementsForAnAppeal();
            await performAppealDormantOnCase(pipCaseId);

        });


})
