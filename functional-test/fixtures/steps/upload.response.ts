import { Page } from '@playwright/test';
import { BaseStep } from './base';
const responseReviewedTestData = require('../../pages/content/response.reviewed_en.json');
const uploadResponseTestdata = require('../../pages/content/upload.response_en.json');

export class UploadResponse extends BaseStep {
    
   private static caseId: string;
   readonly page : Page;

   public expLinks:string[] = ['Upload response','Ready to list', 'Update to case data', 'Add a hearing'];
   
   constructor(page: Page) {
       super(page);
       this.page = page;
   }


    async performUploadResponseWithFurtherInfoOnAPIP() {

        let pipCaseId = await this.loginAsDWPUser("PIP");

        await this.homePage.chooseEvent('Upload response');
        await this.uploadResponsePage.uploadDocs();
        await this.uploadResponsePage.selectIssueCode(uploadResponseTestdata.pipIssueCode);
        await this.uploadResponsePage.chooseAssistOption('Yes');
        await this.uploadResponsePage.continueSubmission();

        await this.checkYourAnswersPage.verifyCYAPageContent("Upload response", uploadResponseTestdata.pipBenefitCode, uploadResponseTestdata.pipIssueCode);
        await this.checkYourAnswersPage.confirmSubmission();

        await this.loginAsCaseworkerUserWithCaseId(pipCaseId);
        await this.homePage.navigateToTab("History");
        await this.historyTab.verifyPageContentByKeyValue('End state', 'Response received');

        await this.homePage.chooseEvent('Response reviewed');
        await this.responseReviewedPage.verifyPageContent(responseReviewedTestData.captionValue, responseReviewedTestData.headingValue);
        await this.responseReviewedPage.chooseInterlocOption('No');
        await this.responseReviewedPage.confirmSubmission();

        await this.homePage.delay(6000);
        await this.homePage.reloadPage();
        this.expLinks.forEach(async testData => {
            await this.verifyHistoryTabLink(testData);
        });
        await this.verifyHistoryTabDetails('Ready to list');
        await this.verifyAppealDetailsTab('Sent to FTA state', 'Sent to FTA');

    }

    async performUploadResponseWithoutFurtherInfoOnATaxCredit() {

        let taxCaseId = await this.loginAsHMRCUser("TAX CREDIT");

        await this.homePage.chooseEvent('Upload response');
        await this.uploadResponsePage.uploadDocs();
        await this.uploadResponsePage.selectIssueCode(uploadResponseTestdata.taxIssueCode);
        await this.uploadResponsePage.chooseAssistOption('No');
        await this.uploadResponsePage.continueSubmission();

        await this.checkYourAnswersPage.verifyCYAPageContent("Upload response", uploadResponseTestdata.taxBenefitCode, uploadResponseTestdata.taxIssueCode);
        await this.checkYourAnswersPage.confirmSubmission();

        await this.loginAsCaseworkerUserWithCaseId(taxCaseId);
        await this.homePage.delay(6000);
        await this.homePage.reloadPage();
        this.expLinks.forEach(async testData => {
            await this.verifyHistoryTabLink(testData);
        });
        await this.verifyHistoryTabDetails('Ready to list');
        await this.verifyAppealDetailsTab('Sent to FTA state', 'Sent to FTA');
    }

    async performUploadResponseOnAUniversalCredit() {

        let ucCaseId = await this.loginAsDWPUser("UC");


        await this.homePage.chooseEvent('Upload response');
        await this.uploadResponsePage.uploadDocs();
        await this.uploadResponsePage.chooseAssistOption('No');
        await this.uploadResponsePage.continueSubmission();

        await this.uploadResponsePage.selectElementDisputed('childElement');
        await this.uploadResponsePage.continueSubmission();

        await this.uploadResponsePage.clickAddNewButton();
        await this.uploadResponsePage.selectUcIssueCode(uploadResponseTestdata.ucIssueCode);
        await this.uploadResponsePage.continueSubmission();

        await this.uploadResponsePage.chooseDisputeOption(uploadResponseTestdata.ucDisputeOption);
        await this.uploadResponsePage.continueSubmission();

        await this.uploadResponsePage.isJPOnTheCase(uploadResponseTestdata.ucJointPartyOnCase);
        await this.uploadResponsePage.continueSubmission();

        await this.checkYourAnswersPage.verifyCYAPageContent("Upload response", null, null, "UC");
        await this.checkYourAnswersPage.confirmSubmission();

        await this.loginAsCaseworkerUserWithCaseId(ucCaseId);
        await this.homePage.delay(6000);
        await this.homePage.reloadPage();
        this.expLinks.forEach(async testData => {
            await this.verifyHistoryTabLink(testData);
        });
        await this.verifyHistoryTabDetails('Ready to list');
        await this.verifyAppealDetailsTab('Sent to FTA state', 'Sent to FTA');
    }

    async verifyErrorsScenariosInUploadResponse() {

        let pipErrorCaseId = await this.loginAsDWPUser("PIP");
        UploadResponse.caseId = pipErrorCaseId;

        await this.homePage.chooseEvent('Upload response');
        await this.uploadResponsePage.uploadPartialDocs();
        await this.uploadResponsePage.selectIssueCode(uploadResponseTestdata.pipIssueCode);
        await this.uploadResponsePage.chooseAssistOption('Yes');
        await this.uploadResponsePage.continueSubmission();
        await this.uploadResponsePage.verifyDocMissingErrorMsg();
    }

    async verifyPHMEErrorsScenariosInUploadResponse() {

        await this.loginPage.goToLoginPage();
        await this.loginPage.verifySuccessfulLoginForDWPResponseWriter();
        await this.homePage.goToHomePage(UploadResponse.caseId);

        await this.homePage.chooseEvent('Upload response');
        await this.uploadResponsePage.uploadDocs();
        await this.uploadResponsePage.selectEvidenceReason('Potentially harmful evidence');
        await this.uploadResponsePage.selectIssueCode(uploadResponseTestdata.pipIssueCode);
        await this.uploadResponsePage.chooseAssistOption('Yes');
        await this.uploadResponsePage.continueSubmission();

        await this.checkYourAnswersPage.confirmSubmission();
        await this.checkYourAnswersPage.verifyPHMEErrorMsg();
    }

    async verifyIssueCodeErrorsScenariosInUploadResponse() {

        await this.loginPage.goToLoginPage();
        await this.loginPage.verifySuccessfulLoginForDWPResponseWriter();
        await this.homePage.goToHomePage(UploadResponse.caseId);

        await this.homePage.chooseEvent('Upload response');
        await this.uploadResponsePage.uploadDocs();
        await this.uploadResponsePage.selectIssueCode('DD');
        await this.uploadResponsePage.chooseAssistOption('Yes');
        await this.uploadResponsePage.continueSubmission();

        await this.checkYourAnswersPage.confirmSubmission();
        await this.checkYourAnswersPage.verifyIssueCodeErrorMsg();
    }
}