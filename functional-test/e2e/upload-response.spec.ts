import { test } from "../lib/steps.factory";

test.describe('Upload response tests', () => {
    test("As a caseworker review response submitted with any further info", async ({ uploadResponseSteps }) => {
        await uploadResponseSteps.performUploadResponseWithFurtherInfoOnAPIP();
    });
    
    test("As a caseworker review response submitted without any further info", async ({ uploadResponseSteps }) => {
        await uploadResponseSteps.performUploadResponseWithoutFurtherInfoOnATaxCredit();
    });
    
    test("As a caseworker review response submitted for an UC case", async({ uploadResponseSteps }) => {
        await uploadResponseSteps.performUploadResponseOnAUniversalCredit();
    });
    
    test("Verify Upload response error scenario", async({ uploadResponseSteps }) => {
        await uploadResponseSteps.verifyErrorsScenariosInUploadResponse();
    });
    
    test("Verify Upload response PHME error scenario",async({ uploadResponseSteps }) => {
        await uploadResponseSteps.verifyPHMEErrorsScenariosInUploadResponse();
    });
    
    test("Verify Upload response Issue code error scenario", async({ uploadResponseSteps }) => {
        await uploadResponseSteps.verifyIssueCodeErrorsScenariosInUploadResponse();
    });
})
