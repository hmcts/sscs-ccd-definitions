import { BaseStep } from "./base";
import { expect, Page } from '@playwright/test';
import { credentials } from "../../config/config";
import task from '../../pages/content/review.urgent.hearing.request.task_en.json';
import sendCaseToTcwData from '../../pages/content/send.case.to.tcw_en.json';
import amendInterlocReviewStateData from "../../pages/content/amend.interloc.review.state_en.json";
import dateUtilsComponent from '../../utils/DateUtilsComponent';
import { SendToAdmin } from "./send.to.admin";
import { VoidCase } from "./void.case";
import { runInThisContext } from "vm";

const actionFurtherEvidenceTestdata = require('../../pages/content/action.further.evidence_en.json');
const reviewConfidentialityTestdata = require('../../pages/content/review.confidentiality_en.json');
const supplementaryResponseData = require('../../pages/content/supplementary.response_en.json');


export class EnhancedConfidentiality extends BaseStep {

    readonly page: Page;

    constructor(page){
        
        super(page);
        this.page = page;
    }

    async requestForConfidentiality() {

        await this.homePage.chooseEvent(actionFurtherEvidenceTestdata.eventName);
        await this.actionFurtherEvidencePage.submitActionFurtherEvidenceForConfRequest(
            actionFurtherEvidenceTestdata.sender, 
            actionFurtherEvidenceTestdata.confDocType,
            actionFurtherEvidenceTestdata.testfileone
        );
        await this.eventNameAndDescriptionPage.verifyPageContent(actionFurtherEvidenceTestdata.eventName);
        await this.eventNameAndDescriptionPage.confirmSubmission();
        await this.homePage.clickSignOut();
    }

    async grantConfidentiality(caseId: string) {
        await this.loginUserWithCaseId(credentials.judge, false, caseId);
        await this.homePage.chooseEvent(reviewConfidentialityTestdata.eventNameCaptor);
        await this.reviewConfidentialityPage.verifyPageContentForReviewConfPage();
        await this.reviewConfidentialityPage.selectGrantConfidentiality();
        await this.reviewConfidentialityPage.confirmSubmission();
    }

    async verifyConfidentialityFlag() {
        await this.summaryTab.verifyAttributeValue('Is case confidential? Yes');
        await this.summaryTab.verifyPageContentByKeyValue('Request outcome', 'Granted');
        await this.summaryTab.verifydueDates('Request date');
        await this.homePage.clickSignOut();
    }

    async uploadSupplementaryCorrespondence(caseId: string) {
        await this.loginUserWithCaseId(credentials.superUser, false, caseId);
        await this.homePage.reloadPage();
        await this.homePage.delay(3000);
        await this.homePage.chooseEvent("Supplementary response");
        await this.supplementaryResponsePage.verifyPageContent();
        await this.supplementaryResponsePage.uploadSupplementaryResponseDoc(supplementaryResponseData.testfileone);
        await this.supplementaryResponsePage.continueSubmission();
        await this.supplementaryResponsePage.confirmSubmission();
    }

    async requestForEvidenceConfidentiality() {

        await this.homePage.chooseEvent(actionFurtherEvidenceTestdata.eventName);
        await this.actionFurtherEvidencePage.submitActionFurtherEvidenceForRequest(
            actionFurtherEvidenceTestdata.sender,
            actionFurtherEvidenceTestdata.redactedTestFile
        );
        await this.eventNameAndDescriptionPage.verifyPageContent(actionFurtherEvidenceTestdata.eventName);
        await this.eventNameAndDescriptionPage.confirmSubmission();
        await this.eventNameAndDescriptionPage.confirmSubmission();
    }

    async verifyRedactedContent() {

        await this.homePage.navigateToTab('Documents');
        await this.documentsTab.verifyPageContentByKeyValue('Original document URL', actionFurtherEvidenceTestdata.testfileone);
        await this.documentsTab.verifyPageContentByKeyValue('Edited document URL', actionFurtherEvidenceTestdata.redactedTestFile);
        await this.documentsTab.verifydueDates('Date added');
    }

}
