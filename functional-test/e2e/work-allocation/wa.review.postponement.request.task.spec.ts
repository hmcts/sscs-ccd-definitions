import { test } from "../../lib/steps.factory";
import createCaseBasedOnCaseType from "../../api/client/sscs/factory/appeal.type.factory";
import performAppealDormantOnCase from "../../api/client/sscs/appeal.event";


//CHANGE TAG BEFORE PUSHING
test.describe.serial('WA - Review postponement request - TCW task initiation, cancelletion and completion tests', {
    tag: '@wip'
}, async () => {

    let caseId: string;

    test.beforeAll("Create case", async () => {
        caseId = await createCaseBasedOnCaseType('PIP');
    });

    test("TCW with Legal-caseworker role, view 'Review postponement request' task and check manage options", async ({
        reviewPostponementRequestTaskSteps }) => {

        test.slow();
        await reviewPostponementRequestTaskSteps.createPostponementRequestTask(caseId);
        await reviewPostponementRequestTaskSteps.checkPostponementRequestTaskManageOptions(caseId);
    })

    test("TCW with Legal-caseworker role, assign 'Review postponement request' task", async ({
        reviewPostponementRequestTaskSteps }) => {
        
        test.slow();
        await reviewPostponementRequestTaskSteps.createPostponementRequestTask(caseId);
        await reviewPostponementRequestTaskSteps.assignReviewPostponementTask(caseId);
    })
    
    test("TCW with Legal-caseworker role, check reassign 'Review postponement request'", async ({
        reviewPostponementRequestTaskSteps }) => {

        test.slow();
        await reviewPostponementRequestTaskSteps.createPostponementRequestTask(caseId);
        await reviewPostponementRequestTaskSteps.checkReassignReviewPostponementTask(caseId);
    })
    
    test("TCW without Legal-caseworker role, check manage options for the 'Review postponement request' task", async ({
        reviewPostponementRequestTaskSteps }) => {

        test.slow();
        await reviewPostponementRequestTaskSteps.createPostponementRequestTask(caseId);
        await reviewPostponementRequestTaskSteps.checkManageOptionsWithoutRoleReviewPostponementTask(caseId);
    })
    
    test("TCW with Legal-caseworker role, cancel 'Review postponement request' task via cancel link", async ({
        reviewPostponementRequestTaskSteps }) => {

        test.slow();
        await reviewPostponementRequestTaskSteps.createPostponementRequestTask(caseId);
        await reviewPostponementRequestTaskSteps.cancelByLinkReviewPostponementTask(caseId);
    })
    
    test("TCW with Legal-caseworker role, cancel 'Review postponement request' task via event", async ({
        reviewPostponementRequestTaskSteps }) => {

        test.slow();
        await reviewPostponementRequestTaskSteps.createPostponementRequestTask(caseId);
        await reviewPostponementRequestTaskSteps.cancelByEventReviewPostponementTask(caseId);
    })
    
    test("TCW with Legal-caseworker role, completes 'Review postponement request' task via mark as done link", async ({
        reviewPostponementRequestTaskSteps }) => {

        test.slow();
        await reviewPostponementRequestTaskSteps.createPostponementRequestTask(caseId);
        await reviewPostponementRequestTaskSteps.completeByLinkReviewPostponementTask(caseId);
    })

    test("TCW with Legal-caseworker role, completes 'Review postponement request' task via event", async ({
        reviewPostponementRequestTaskSteps }) => {

        test.slow();
        await reviewPostponementRequestTaskSteps.createPostponementRequestTask(caseId);
        await reviewPostponementRequestTaskSteps.completeByEventReviewPostponementTask(caseId);
    })

    test.afterAll("Case has to be set to Dormant", async () => {
        await performAppealDormantOnCase(caseId);
    });
})


    
    // extra 2 scenarios for the priority check?