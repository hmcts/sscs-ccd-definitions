import {Page} from '@playwright/test';
import {HomePage} from '../../pages/common/homePage';
import {LoginPage} from '../../pages/common/loginPage';
import {EventNameEventDescriptionPage} from '../../pages/common/event.name.event.description';
import createCaseBasedOnCaseType from "../../api/client/appeal.type.factory";
import eventTestData from "../../pages/content/event.name.event.description_en.json"
import {History} from '../../pages/tabs/history';


export class ConfirmCaseLapsed {

    readonly page: Page;


    constructor(page: Page) {
        this.page = page;
    }

    async performConfirmCaseLapsed() {

        let loginPage = new LoginPage(this.page);
        let homePage = new HomePage(this.page);
        let eventNameAndDescriptionPage = new EventNameEventDescriptionPage(this.page);
        let historyTab = new History(this.page);

        var pipCaseId = await createCaseBasedOnCaseType("CHILDSUPPORT");
        await loginPage.goToLoginPage();
        await loginPage.verifySuccessfulLoginForAMCaseworker();

        await homePage.goToHomePage(pipCaseId);
        await homePage.reloadPage();
        await homePage.chooseEvent('Confirm lapsed');

        //Params are passed to this page as this is a common page to be reused.
        await eventNameAndDescriptionPage.verifyPageContent('Confirm lapsed',false, null, null);
        await eventNameAndDescriptionPage.inputData(eventTestData["event-summary-input"],
            eventTestData["event-description-input"]);
        await eventNameAndDescriptionPage.confirmSubmission();

        await homePage.navigateToTab("History");
        await historyTab.verifyPageContentByKeyValue('Event', 'Confirm lapsed');
        await historyTab.verifyPageContentByKeyValue('Summary', 'Event Summary for Automation');
        await historyTab.verifyPageContentByKeyValue('Comment', 'Event Description for Automation Verification');
        await historyTab.verifyEventCompleted("Confirm lapsed");
    }

}
