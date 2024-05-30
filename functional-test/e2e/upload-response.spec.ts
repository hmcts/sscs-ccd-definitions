import { test } from "../lib/steps.factory";

test.describe('Upload response tests', async() => {
    test("As a caseworker review response submitted with any further info",{tag: '@wip2'}, async ({ uploadResponseSteps }) => {
        test.slow();
        await uploadResponseSteps.performUploadResponseWithFurtherInfoOnAPIP();
    });
    
    test("As a caseworker review response submitted without any further info", {tag: '@wip2'},async ({ uploadResponseSteps }) => {
        await uploadResponseSteps.performUploadResponseWithoutFurtherInfoOnATaxCredit();
    });
    
    test("As a caseworker review response submitted for an UC case", {tag: '@wip2'},async({ uploadResponseSteps }) => {
        await uploadResponseSteps.performUploadResponseOnAUniversalCredit();
    });
})

test.describe.serial('Error scenarios', async () => {

    test("Verify Upload response error scenario", async({ uploadResponseSteps }) => {
        await uploadResponseSteps.verifyErrorsScenariosInUploadResponse();
    });

    test("Verify Upload response PHME error scenario", async({ uploadResponseSteps }) => {
        await uploadResponseSteps.verifyPHMEErrorsScenariosInUploadResponse();
    });

    test("Verify Upload response Issue code error scenario", async({ uploadResponseSteps }) => {
        await uploadResponseSteps.verifyIssueCodeErrorsScenariosInUploadResponse();
    });
})
