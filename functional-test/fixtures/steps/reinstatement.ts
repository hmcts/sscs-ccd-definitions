import { BaseStep } from "./base";
import { Page } from '@playwright/test';
import {credentials} from "../../config/config";

const actionFurtherEvidenceTestdata = require('../../pages/content/action.further.evidence_en.json');
const issueDirectionTestdata = require('../../pages/content/issue.direction_en.json');


export class Reinstatement extends BaseStep {

    readonly page: Page;

    constructor(page){
        super(page);
        this.page = page;
    }

    async requestAndGrantAnReinstatement(caseId: string) {
        
        await this.loginUserWithCaseId(credentials.amCaseWorker, false, caseId);
        await this.homePage.reloadPage();
        await this.homePage.chooseEvent(actionFurtherEvidenceTestdata.eventName);
        await this.actionFurtherEvidencePage.submitActionFurtherEvidence(
            actionFurtherEvidenceTestdata.sender, 
            actionFurtherEvidenceTestdata.reinstatementDocType, 
            actionFurtherEvidenceTestdata.testfileone
        );
        await this.eventNameAndDescriptionPage.verifyPageContent(actionFurtherEvidenceTestdata.eventName);
        await this.eventNameAndDescriptionPage.confirmSubmission();
        await this.eventNameAndDescriptionPage.confirmSubmission();

        await this.homePage.navigateToTab("Appeal Details");
        await this.appealDetailsTab.verifydueDates('Reinstatement Registered');
        await this.appealDetailsTab.verifyAppealDetailsPageContentByKeyValue('Reinstatement Outcome', 'In progress');
        await this.verifyHistoryTabDetails('With FTA', 'Issue further evidence');
        await this.historyTab.verifyPageContentByKeyValue('Interlocutory review state', 'Review by Judge');
        await this.homePage.reloadPage();

        await this.loginUserWithCaseId(credentials.judge, true, caseId);
        await this.homePage.chooseEvent(issueDirectionTestdata.eventNameCaptor);

        await this.issueDirectionPage.submitIssueDirection(
            issueDirectionTestdata.preHearingType,
            issueDirectionTestdata.grantReinstatementOption, 
            issueDirectionTestdata.docTitle
        );
        await this.eventNameAndDescriptionPage.verifyPageContent(issueDirectionTestdata.eventNameCaptor);
        await this.eventNameAndDescriptionPage.confirmSubmission();

        await this.homePage.navigateToTab("Appeal Details");
        await this.appealDetailsTab.verifydueDates('Reinstatement Registered');
        await this.appealDetailsTab.verifyAppealDetailsPageContentByKeyValue('Reinstatement Outcome', 'Granted');
        
        await this.verifyHistoryTabDetails('With FTA', 'Issue directions notice');
        await this.historyTab.verifyPageContentByKeyValue('Interlocutory review state', 'Awaiting Admin Action');
    }

    async requestAndRefuseAnReinstatement(caseId: string) {
        
        await this.loginUserWithCaseId(credentials.amCaseWorker, false, caseId);
        await this.homePage.reloadPage();
        await this.homePage.chooseEvent(actionFurtherEvidenceTestdata.eventName);
        await this.actionFurtherEvidencePage.submitActionFurtherEvidence(
            actionFurtherEvidenceTestdata.sender, 
            actionFurtherEvidenceTestdata.reinstatementDocType, 
            actionFurtherEvidenceTestdata.testfileone
        );

        await this.eventNameAndDescriptionPage.verifyPageContent(actionFurtherEvidenceTestdata.eventName);
        await this.eventNameAndDescriptionPage.confirmSubmission();
        await this.eventNameAndDescriptionPage.confirmSubmission();

        await this.homePage.navigateToTab("Appeal Details");
        await this.appealDetailsTab.verifydueDates('Reinstatement Registered');
        await this.appealDetailsTab.verifyAppealDetailsPageContentByKeyValue('Reinstatement Outcome', 'In progress');
        await this.verifyHistoryTabDetails('With FTA', 'Issue further evidence');
        await this.historyTab.verifyPageContentByKeyValue('Interlocutory review state', 'Review by Judge');
        await this.homePage.reloadPage();

        await this.loginUserWithCaseId(credentials.judge, true, caseId);
        await this.homePage.chooseEvent(issueDirectionTestdata.eventNameCaptor);

        await this.issueDirectionPage.submitIssueDirection(
            issueDirectionTestdata.preHearingType,
            issueDirectionTestdata.refuseReinstatementOption, 
            issueDirectionTestdata.docTitle
        );
        await this.eventNameAndDescriptionPage.verifyPageContent(issueDirectionTestdata.eventNameCaptor);
        await this.eventNameAndDescriptionPage.confirmSubmission();

        await this.homePage.navigateToTab("Appeal Details");
        await this.appealDetailsTab.verifydueDates('Reinstatement Registered');
        await this.appealDetailsTab.verifyAppealDetailsPageContentByKeyValue('Reinstatement Outcome', 'Refused');
        await this.verifyHistoryTabDetails('With FTA', 'Issue directions notice');
    }
}
