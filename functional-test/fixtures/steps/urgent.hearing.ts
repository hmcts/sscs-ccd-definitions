import { BaseStep } from "./base";
import { Page } from '@playwright/test';
import {credentials} from "../../config/config";

const actionFurtherEvidenceTestdata = require('../../pages/content/action.further.evidence_en.json');
const issueDirectionTestdata = require('../../pages/content/issue.direction_en.json');


export class UrgentHearing extends BaseStep {

    readonly page: Page;

    constructor(page){
        
        super(page);
        this.page = page;
    }

    async requestAndGrantAnUrgentHearing(caseId: string) {
        
        await this.loginUserWithCaseId(credentials.amCaseWorker, false, caseId);
        await this.homePage.reloadPage();
        await this.homePage.chooseEvent(actionFurtherEvidenceTestdata.eventName);
        await this.actionFurtherEvidencePage.submitActionFurtherEvidence(
            actionFurtherEvidenceTestdata.sender, 
            actionFurtherEvidenceTestdata.urgentDocType,
            actionFurtherEvidenceTestdata.testfileone
        );
        await this.eventNameAndDescriptionPage.verifyPageContent(actionFurtherEvidenceTestdata.eventName);
        await this.eventNameAndDescriptionPage.confirmSubmission();
        await this.eventNameAndDescriptionPage.confirmSubmission();


        await this.summaryTab.verifyPageContentByKeyValue('Urgent case', 'Yes');

        await this.homePage.navigateToTab("Appeal Details");
        await this.appealDetailsTab.verifydueDates('Urgent hearing registered');
        await this.appealDetailsTab.verifyAppealDetailsPageContentByKeyValue('Urgent hearing outcome', 'In progress');
        await this.verifyHistoryTabDetails('With FTA', 'Mark case as urgent');
        await this.historyTab.verifyPageContentByKeyValue('Interlocutory review state', 'Review by Judge');
        await this.homePage.reloadPage();

        await this.loginUserWithCaseId(credentials.judge, true, caseId);
        await this.homePage.chooseEvent(issueDirectionTestdata.eventNameCaptor);

        await this.issueDirectionPage.submitIssueDirection(
            issueDirectionTestdata.preHearingType,
            issueDirectionTestdata.grantHearingOption, 
            issueDirectionTestdata.docTitle
        );
        await this.eventNameAndDescriptionPage.verifyPageContent(issueDirectionTestdata.eventNameCaptor);
        await this.eventNameAndDescriptionPage.confirmSubmission();

        await this.summaryTab.verifyPageContentByKeyValue('Urgent case', 'Yes');
        await this.homePage.navigateToTab("Appeal Details");
        await this.appealDetailsTab.verifydueDates('Urgent hearing registered');
        await this.appealDetailsTab.verifyAppealDetailsPageContentByKeyValue('Urgent hearing outcome', 'Granted');
        await this.verifyHistoryTabDetails('With FTA', 'Issue directions notice');
        await this.historyTab.verifyPageContentByKeyValue('Interlocutory review state', 'Awaiting Admin Action');
    }

    async requestAndRefuseAnUrgentHearing(caseId: string) {
        
        await this.loginUserWithCaseId(credentials.amCaseWorker, false, caseId);
        await this.homePage.reloadPage();
        await this.homePage.chooseEvent(actionFurtherEvidenceTestdata.eventName);
        await this.actionFurtherEvidencePage.submitActionFurtherEvidence(
            actionFurtherEvidenceTestdata.sender, 
            actionFurtherEvidenceTestdata.urgentDocType,
            actionFurtherEvidenceTestdata.testfileone
        );

        await this.eventNameAndDescriptionPage.verifyPageContent(actionFurtherEvidenceTestdata.eventName);
        await this.eventNameAndDescriptionPage.confirmSubmission();
        await this.eventNameAndDescriptionPage.confirmSubmission();


        await this.summaryTab.verifyPageContentByKeyValue('Urgent case', 'Yes');

        await this.homePage.navigateToTab("Appeal Details");
        await this.appealDetailsTab.verifydueDates('Urgent hearing registered');
        await this.appealDetailsTab.verifyAppealDetailsPageContentByKeyValue('Urgent hearing outcome', 'In progress');
        await this.verifyHistoryTabDetails('With FTA', 'Mark case as urgent');
        await this.historyTab.verifyPageContentByKeyValue('Interlocutory review state', 'Review by Judge');
        await this.homePage.reloadPage();

        await this.loginUserWithCaseId(credentials.judge, true, caseId);
        await this.homePage.chooseEvent(issueDirectionTestdata.eventNameCaptor);

        await this.issueDirectionPage.submitIssueDirection(
            issueDirectionTestdata.preHearingType,
            issueDirectionTestdata.refuseHearingOption, 
            issueDirectionTestdata.docTitle
        );
        await this.eventNameAndDescriptionPage.verifyPageContent(issueDirectionTestdata.eventNameCaptor);
        await this.eventNameAndDescriptionPage.confirmSubmission();

        await this.summaryTab.verifyPageContentByKeyValue('Urgent case', 'No');
        await this.homePage.navigateToTab("Appeal Details");
        await this.appealDetailsTab.verifydueDates('Urgent hearing registered');
        await this.appealDetailsTab.verifyAppealDetailsPageContentByKeyValue('Urgent hearing outcome', 'Refused');
        await this.verifyHistoryTabDetails('With FTA', 'Issue directions notice');
        await this.historyTab.verifyPageContentByKeyValue('Interlocutory review state', 'N/A');
    }

    async uploadEncryptedFiles(caseId: string) {

        await this.loginUserWithCaseId(credentials.amCaseWorker, false, caseId);
        await this.homePage.reloadPage();
        await this.homePage.chooseEvent(actionFurtherEvidenceTestdata.eventName);
        await this.actionFurtherEvidencePage.submitActionFurtherEvidence(
            actionFurtherEvidenceTestdata.sender,
            actionFurtherEvidenceTestdata.docType,
            actionFurtherEvidenceTestdata.encrytpedFile
        );
        await this.actionFurtherEvidencePage.verifyEncryptedFileErrorMsg();

        await this.actionFurtherEvidencePage.uploadDocs(actionFurtherEvidenceTestdata.corruptedFile);
        await this.actionFurtherEvidencePage.verifyEncryptedFileErrorMsg();
    }

}
