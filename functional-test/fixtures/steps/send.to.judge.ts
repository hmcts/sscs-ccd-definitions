import {Page} from '@playwright/test';
import {HomePage} from '../../pages/common/homePage';
import {LoginPage} from '../../pages/common/loginPage';
import createCaseBasedOnCaseType from "../../api/client/appeal.type.factory";
import {History} from '../../pages/tabs/history';
import eventTestData from "../../pages/content/event.name.event.description_en.json";
import {EventNameEventDescriptionPage} from "../../pages/common/event.name.event.description";
import { SendToJudgePage } from '../../pages/send.to.judge.page';


export class SendToJudge {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async createCase() {
        var taxCreditCaseId = await createCaseBasedOnCaseType("TAX CREDIT");
        return taxCreditCaseId;
    }

    async performSendToJudge(caseId: string) {

        let loginPage = new LoginPage(this.page);
        let homePage = new HomePage(this.page);
        let sendToJudgePage = new SendToJudgePage(this.page);
        let eventNameAndDescriptionPage = new EventNameEventDescriptionPage(this.page);
        let historyTab = new History(this.page);

        await loginPage.goToLoginPage();
        await loginPage.verifySuccessfulLoginForCaseworker();

        await homePage.goToHomePage(caseId);
        await homePage.chooseEvent('Send to Judge');

        await sendToJudgePage.verifyPageContent();
        await sendToJudgePage.selectHearingType();
        await sendToJudgePage.inputData();
        await sendToJudgePage.selectInterlocutoryReviewState();
        await sendToJudgePage.confirmSubmission();

        //Params are passed to this page as this is a common page to be reused.
        await eventNameAndDescriptionPage.verifyPageContent('Send to Judge');
        await eventNameAndDescriptionPage.inputData(eventTestData["event-summary-input"],
            eventTestData["event-description-input"]);
        await eventNameAndDescriptionPage.confirmSubmission();

        await homePage.navigateToTab("History");
        await historyTab.verifyPageContentByKeyValue('Event', 'Send to Judge');
        await historyTab.verifyPageContentByKeyValue('Summary', 'Event Summary for Automation');
        await historyTab.verifyPageContentByKeyValue('Comment', 'Event Description for Automation Verification');
        await historyTab.verifyEventCompleted("Send to Judge");
    }
}
