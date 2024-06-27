import {test} from "../lib/steps.factory";
import createCaseBasedOnCaseType from "../api/client/sscs/factory/appeal.type.factory";
import performAppealDormantOnCase from "../api/client/sscs/appeal.event";

// test.describe('Provide Appointee Details to a Non Dormant Case', async() => {
//     let caseId: string;
//     test.beforeAll("A non Dormant case has to be Created", async () => {
//         caseId = await createCaseBasedOnCaseType('PIP');
//     });

//     test("As a Caseworker verify Provide Appointee Details is not visible", async ({ provideAppointeeDetailsSteps }) => {
//         await provideAppointeeDetailsSteps.performProvideAppointeeDetails(caseId);
//     });
// });

test.describe('Provide Appointee Details on a Dormant Case', async() => {
    let caseId: string;
    test.beforeAll("Case has to be Created", async () => {
        caseId = await createCaseBasedOnCaseType('PIP');
    });

    test.beforeAll("Case has to be set to Dormant",async () => {
        await performAppealDormantOnCase(caseId);
    });

    test("As a Caseworker Provide Appointee Details on a Dormant Case", async ({ provideAppointeeDetailsSteps }) => {
        await provideAppointeeDetailsSteps.performProvideAppointeeDetails(caseId);
    });
});