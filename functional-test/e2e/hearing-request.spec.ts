import { test } from "../lib/steps.factory";
import createCaseBasedOnCaseType from "../api/client/sscs/factory/appeal.type.factory";
import performAppealDormantOnCase from "../api/client/sscs/appeal.event";

let caseId : string;


test.describe("Create a new hearing for an List assist case", {tag: '@master-pipeline'}, async() => {
    
    test("Trigger a new hearing & cancellation for DLA case", {tag: '@wip-test'}, async ({ uploadResponseSteps, hearingSteps }) => {
        caseId = await createCaseBasedOnCaseType('DLASANDL');
        await uploadResponseSteps.performUploadResponse(caseId, 'dla');
        await hearingSteps.verifyHearingIsTriggered(caseId, 'dla');
        await hearingSteps.verifyManualHearingCancellation();
    });

    test("Trigger a new hearing for UC case", {tag: '@wip-test'}, async ({ uploadResponseSteps, hearingSteps }) => {
        caseId = await createCaseBasedOnCaseType('UCSANDL');
        await uploadResponseSteps.performUploadResponseOnAUniversalCredit(caseId);
        await hearingSteps.verifyHearingIsTriggeredForUCCase();
    });

    test("Trigger a new hearing for PIP case",{tag: '@wip-test'}, async ({ uploadResponseSteps, hearingSteps, voidCaseSteps }) => {
        caseId = await createCaseBasedOnCaseType('PIPREPSANDL');
        await uploadResponseSteps.performUploadResponse(caseId, 'pip');
        await hearingSteps.verifyHearingIsTriggered(caseId, 'pip');
        await voidCaseSteps.performVoidCase(caseId, false);
        await hearingSteps.verifyAutoHearingCancellation();
    });

    test("Manually Update an hearing for DLA case", {tag: '@wip-test'}, async ({ uploadResponseSteps, hearingSteps }) => {
        caseId = await createCaseBasedOnCaseType('DLASANDL');
        await uploadResponseSteps.performUploadResponse(caseId, 'dla');
        await hearingSteps.verifyHearingIsTriggered(caseId, 'dla');
        await hearingSteps.updateHearingLengthManually();
        await hearingSteps.verifyUpdatedHearingStatus();
    });

    test("Auto Update an hearing for DLA case",{tag: '@wip-test'},  async ({ uploadResponseSteps, hearingSteps }) => {
        caseId = await createCaseBasedOnCaseType('DLASANDL');
        await uploadResponseSteps.performUploadResponse(caseId, 'dla');
        await hearingSteps.verifyHearingIsTriggered(caseId, 'dla');
        await hearingSteps.updateHearingViaEvent();
        await hearingSteps.verifyUpdatedHearingStatusViaEvent();
    });
    
});