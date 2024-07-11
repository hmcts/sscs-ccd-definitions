import { BaseStep } from "./base";
import { Page, expect } from '@playwright/test';
import {credentials} from "../../config/config";

const reviewPHETestdata = require('../../pages/content/review.phe_en.json');
const bundleTestData = require('../../pages/content/create.a.bundle_en.json');


export class ReviewPHE extends BaseStep {

    readonly page: Page;

    constructor(page){
        
        super(page);
        this.page = page;
    }

    async grantAnPHERequest(caseId: string) {
        
        await this.loginUserWithCaseId(credentials.judge, false, caseId);
        await this.homePage.chooseEvent(reviewPHETestdata.eventNameCaptor);

        await this.reviewPHEPage.verifyPageContent();
        await this.reviewPHEPage.selectGrantPermission();
        await this.reviewPHEPage.confirmSubmission();

        await this.eventNameAndDescriptionPage.verifyPageContent('Review PHE request');
        await this.eventNameAndDescriptionPage.confirmSubmission();

       
        await this.summaryTab.verifyPresenceOfTitle("PHE on this case: Granted");
        await this.verifyHistoryTabDetails('Review PHE request');
        await this.historyTab.verifyPresenceOfTitle("PHE on this case: Granted");
        await this.homePage.clickSignOut();

        await this.loginUserWithCaseId(credentials.amCaseWorker, false, caseId);
        await this.homePage.navigateToTab("Appeal Details");
        await this.appealDetailsTab.verifyAppealDetailsPageContentByKeyValue('FTA State', 'PHE granted');
        await this.verifyBundleForPHE();
    }

    async verifyBundleForPHE(){
        
        await this.homePage.chooseEvent("Create a bundle");
        await this.createBundlePage.verifyPageContent();
        await this.createBundlePage.confirmSubmission();
        await expect(this.homePage.summaryTab).toBeVisible();

        await this.homePage.delay(15000);
        await this.homePage.reloadPage();
        await this.homePage.navigateToTab("Bundles");
        await this.bundlesTab.verifyBundlesTabContentByKeyValueForASpan(`${bundleTestData.stitchStatusLabel}`, `${bundleTestData.stitchStatusDone}`);
        await this.bundlesTab.verifyBundlesTabContentByKeyValueForASpanRegEx(`${bundleTestData.stitchDocLabel}`, `\\d+-${bundleTestData.stitchVal}\\.pdf`);
        await this.bundlesTab.verifyBundlesTabContentByKeyValueForASpan(`${bundleTestData.configUsed}`, `${bundleTestData.configUsedDefaultVal}`);
        await this.bundlesTab.verifyBundlesTabContentByKeyValueForASpan(`${bundleTestData.configUsed}`, `${bundleTestData.configUsedEditedVal}`);
    }


    async refuseAnPHERequest(caseId: string) {
        
        await this.homePage.clickSignOut();
        await this.loginUserWithCaseId(credentials.judge, false, caseId);
        await this.homePage.chooseEvent(reviewPHETestdata.eventNameCaptor);

        await this.reviewPHEPage.verifyPageContent();
        await this.reviewPHEPage.selectRefusePermission();
        await this.reviewPHEPage.confirmSubmission();

        await this.eventNameAndDescriptionPage.verifyPageContent('Review PHE request');
        await this.eventNameAndDescriptionPage.confirmSubmission();

       
        await this.summaryTab.verifyTitleNotPresent("PHE on this case: Granted");
        await this.verifyHistoryTabDetails('Review PHE request');
        await this.homePage.clickSignOut();

        await this.loginUserWithCaseId(credentials.amCaseWorker, false, caseId);
        await this.homePage.navigateToTab("Appeal Details");
        await this.appealDetailsTab.verifyAppealDetailsPageContentByKeyValue('FTA State', 'PHE refused');
    }

    // async requestAndRefuseAnUrgentHearing(caseId: string) {
        
    //     await this.loginUserWithCaseId(credentials.amCaseWorker, false, caseId);
    //     await this.homePage.reloadPage();
    //     await this.homePage.chooseEvent(actionFurtherEvidenceTestdata.eventName);
    //     await this.actionFurtherEvidencePage.submitActionFurtherEvidence(
    //         actionFurtherEvidenceTestdata.sender, 
    //         actionFurtherEvidenceTestdata.urgentDocType, 
    //         actionFurtherEvidenceTestdata.testfileone
    //     );

    //     await this.eventNameAndDescriptionPage.verifyPageContent(actionFurtherEvidenceTestdata.eventName);
    //     await this.eventNameAndDescriptionPage.confirmSubmission();
    //     await this.eventNameAndDescriptionPage.confirmSubmission();


    //     await this.summaryTab.verifyPageContentByKeyValue('Urgent case', 'Yes');

    //     await this.homePage.navigateToTab("Appeal Details");
    //     await this.appealDetailsTab.verifydueDates('Urgent hearing registered');
    //     await this.appealDetailsTab.verifyAppealDetailsPageContentByKeyValue('Urgent hearing outcome', 'In progress');
    //     await this.verifyHistoryTabDetails('With FTA', 'Mark case as urgent');
    //     await this.historyTab.verifyPageContentByKeyValue('Interlocutory review state', 'Review by Judge');
    //     await this.homePage.reloadPage();

    //     await this.loginUserWithCaseId(credentials.judge, true, caseId);
    //     await this.homePage.chooseEvent(issueDirectionTestdata.eventName);

    //     await this.issueDirectionPage.submitIssueDirection(
    //         issueDirectionTestdata.hearingType, 
    //         issueDirectionTestdata.refuseHearingOption, 
    //         issueDirectionTestdata.docTitle
    //     );
    //     await this.eventNameAndDescriptionPage.verifyPageContent(issueDirectionTestdata.eventName);
    //     await this.eventNameAndDescriptionPage.confirmSubmission();

    //     await this.summaryTab.verifyPageContentByKeyValue('Urgent case', 'No');
    //     await this.homePage.navigateToTab("Appeal Details");
    //     await this.appealDetailsTab.verifydueDates('Urgent hearing registered');
    //     await this.appealDetailsTab.verifyAppealDetailsPageContentByKeyValue('Urgent hearing outcome', 'Refused');
    //     await this.verifyHistoryTabDetails('With FTA', 'Issue directions notice');
    //     await this.historyTab.verifyPageContentByKeyValue('Interlocutory review state', 'N/A');
    // }

    // async uploadEncryptedFiles(caseId: string) {
        
    //     await this.loginUserWithCaseId(credentials.amCaseWorker, false, caseId);
    //     await this.homePage.reloadPage();
    //     await this.homePage.chooseEvent(actionFurtherEvidenceTestdata.eventName);
    //     await this.actionFurtherEvidencePage.submitActionFurtherEvidence(
    //         actionFurtherEvidenceTestdata.sender, 
    //         actionFurtherEvidenceTestdata.docType, 
    //         actionFurtherEvidenceTestdata.encrytpedFile
    //     );
    //     await this,this.actionFurtherEvidencePage.verifyEncryptedFileErrorMsg();
    
    //     await this.actionFurtherEvidencePage.uploadDocs(actionFurtherEvidenceTestdata.corruptedFile);
    //     await this,this.actionFurtherEvidencePage.verifyEncryptedFileErrorMsg();
    // }

}