import { test } from "../../lib/steps.factory";
import createCaseBasedOnCaseType from "../../api/client/sscs/factory/appeal.type.factory";
import performAppealDormantOnCase from "../../api/client/sscs/appeal.event";


test.describe.serial('WA - Review postponement request - TCW task initiation and reviewing tests', {
    tag: '@work-allocation'
}, async () => {

    let caseId: string;

    test.beforeAll("Create case", async () => {
        caseId = await createCaseBasedOnCaseType('PIP');
    });

    test("TCW with Legal-caseworker role, create and review 'Review postponement request' task", async ({
        reviewPostponementRequestTaskSteps }) => {

        test.slow();
        await reviewPostponementRequestTaskSteps.createPostponementRequestTask(caseId);
        await reviewPostponementRequestTaskSteps.checkPostponementRequestTaskManageOptions(caseId);
    })

    test("TCW without Legal-caseworker role, check manage options for the 'Review postponement request' task", async ({
        reviewPostponementRequestTaskSteps }) => {

        test.slow();
        await reviewPostponementRequestTaskSteps.checkManageOptionsWithoutRoleReviewPostponementTask(caseId);
    })

    test("TCW with Legal-caseworker role, assign & reassign 'Review postponement request' task", async ({
        reviewPostponementRequestTaskSteps }) => {
        
        test.slow();
        await reviewPostponementRequestTaskSteps.assignReviewPostponementTask(caseId);
    })

    test.afterAll("Case has to be set to Dormant", async () => {
        await performAppealDormantOnCase(caseId);
    });
})

// COMPLETION and CANCELLATION scenarios are on HOLD since a bug was found where the completed/cancelled task doesn't disappear 
// from the case, issue raise on SSCSSI-369

// test.describe.serial('WA - Review postponement request - TCW task cancellation tests', {
//     tag: '@wip'
// }, async () => {

//     let caseId: string;

//     test.beforeAll("Create case", async () => {
//         caseId = await createCaseBasedOnCaseType('PIP');
//     });

//     test("TCW with Legal-caseworker role, cancel 'Review postponement request' task via event", async ({
//         reviewPostponementRequestTaskSteps }) => {

//         test.slow();
//         await reviewPostponementRequestTaskSteps.cancelByEventReviewPostponementTask(caseId);
//     })

//     test.afterAll("Case has to be set to Dormant", async () => {
//         await performAppealDormantOnCase(caseId);
//     });
// })

// test.describe.serial('WA - Review postponement request - TCW task completion tests', {
//     tag: '@wip'
// }, async () => {

//     let caseId: string;

//     test.beforeAll("Create case", async () => {
//         caseId = await createCaseBasedOnCaseType('PIP');
//     });

//     test("TCW with Legal-caseworker role, completes 'Review postponement request' task via event", async ({
//         reviewPostponementRequestTaskSteps }) => {

//         test.slow();
//         await reviewPostponementRequestTaskSteps.completeByEventReviewPostponementTask(caseId);
//     })

//     test.afterAll("Case has to be set to Dormant", async () => {
//         await performAppealDormantOnCase(caseId);
//     });
// })