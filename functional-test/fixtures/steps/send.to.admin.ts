import {Page} from '@playwright/test';
import {HomePage} from '../../pages/common/homePage';
import {LoginPage} from '../../pages/common/loginPage';
import createCaseBasedOnCaseType from "../../api/client/appeal.type.factory";
import sendToAdminData from "../../pages/content/send.to.admin_en.json"
import {History} from '../../pages/tabs/history';
import {TextAreaPage} from "../../pages/common/text.area.page";
import eventTestData from "../../pages/content/event.name.event.description_en.json";
import {EventNameEventDescriptionPage} from "../../pages/common/event.name.event.description";


export class SendToAdmin {

    readonly page: Page;


    constructor(page: Page) {
        this.page = page;
    }

    async performSendToAdmin() {

        let loginPage = new LoginPage(this.page);
        let homePage = new HomePage(this.page);
        let textAreaPage = new TextAreaPage(this.page);
        let eventNameAndDescriptionPage = new EventNameEventDescriptionPage(this.page);
        let historyTab = new History(this.page);

        var taxCreditCaseId = await createCaseBasedOnCaseType("TAX CREDIT");
        await loginPage.goToLoginPage();
        await loginPage.verifySuccessfulLoginForJudge();

        await homePage.goToHomePage(taxCreditCaseId);
        await homePage.delay(40000);
        await homePage.chooseEvent('Send to admin');

        //Params are passed to this page as this is a common page to be reused.
        await textAreaPage.verifyPageContent(sendToAdminData["send-to-admin-caption"],
            sendToAdminData["send-to-admin-heading"],
            sendToAdminData["send-to-admin-field-label"]);
        await textAreaPage.inputData(sendToAdminData["send-to-admin-input"]);
        await textAreaPage.confirmSubmission();

        //Params are passed to this page as this is a common page to be reused.
        await eventNameAndDescriptionPage.verifyPageContent('Send to admin',true,
            sendToAdminData["send-to-admin-field-label"], sendToAdminData["send-to-admin-input"]);
        await eventNameAndDescriptionPage.inputData(eventTestData["event-summary-input"],
            eventTestData["event-description-input"]);
        await eventNameAndDescriptionPage.confirmSubmission();

        await homePage.navigateToTab("History");
        await historyTab.verifyPageContentByKeyValue('Event', 'Send to admin');
        await historyTab.verifyPageContentByKeyValue('Summary', 'Event Summary for Automation');
        await historyTab.verifyPageContentByKeyValue('Comment', 'Event Description for Automation Verification');
        await historyTab.verifyEventCompleted("Send to admin");
    }

}
