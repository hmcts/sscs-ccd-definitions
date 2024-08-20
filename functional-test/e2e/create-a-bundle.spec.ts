import {test} from "../lib/steps.factory";
import createCaseBasedOnCaseType from "../api/client/sscs/factory/appeal.type.factory";
import performAppealDormantOnCase from "../api/client/sscs/appeal.event";


let caseId: string;
test.beforeAll("Case has to be Created", async () => {
    caseId = await createCaseBasedOnCaseType('PIP');
});

<<<<<<< HEAD
test("As a caseworker create a bundle", async ({createBundleSteps}) => {
=======
test("As a caseworker create a bundle", {tag: '@master-pipeline'}, async ({createBundleSteps}) => {
>>>>>>> automation-test-release-3
    test.slow();
    await createBundleSteps.performUploadBundleResponse(caseId);
});