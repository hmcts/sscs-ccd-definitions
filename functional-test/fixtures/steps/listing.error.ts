import {Page} from '@playwright/test';
import {HomePage} from '../../pages/common/homePage';
import {LoginPage} from '../../pages/common/loginPage';
import {EventNameEventDescriptionPage} from '../../pages/common/event.name.event.description';
import createCaseBasedOnCaseType from "../../api/client/sscs/factory/appeal.type.factory";
import eventTestData from "../../pages/content/event.name.event.description_en.json"
import {History} from '../../pages/tabs/history';
import {WebAction} from '../../common/web.action';


export class ListingError {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async performListingErrorEvent() {
        let loginPage = new LoginPage(this.page);
        let homePage = new HomePage(this.page);
        let eventNameAndDescriptionPage = new EventNameEventDescriptionPage(this.page);
        let historyTab = new History(this.page);
        let webActions = new WebAction(this.page);

        //Create Case
        var pipCaseId = await createCaseBasedOnCaseType("PIP");
        await loginPage.goToLoginPage();
        await loginPage.verifySuccessfulLoginForAMCaseworker();

        //Navigate to Listing Error Event
        await homePage.goToHomePage(pipCaseId);
        await homePage.reloadPage();
        await homePage.chooseEvent('Listing Error');

        //Enter details in event and submit
        await eventNameAndDescriptionPage.verifyPageContent('Listing Error');
        await eventNameAndDescriptionPage.inputData(eventTestData["event-summary-input"],
            eventTestData["event-description-input"]);
        await eventNameAndDescriptionPage.confirmSubmission();

        //Navigate to History Tab and Verify event is listed
        await homePage.navigateToTab("History");
        await historyTab.verifyEventCompleted("Listing Error");

        //Verify End State after performing the event.
        await webActions.verifyPageLabel('//*[@id="case-viewer-field-read--caseHistory"]/span/ccd-field-read/div/ccd-field-read-label/div/ccd-case-history-viewer-field/ccd-event-log/div/div[2]/div/ccd-event-log-details/table/tbody/tr[3]/th/span', "End state");
        await webActions.verifyPageLabel('//*[@id="case-viewer-field-read--caseHistory"]/span/ccd-field-read/div/ccd-field-read-label/div/ccd-case-history-viewer-field/ccd-event-log/div/div[2]/div/ccd-event-log-details/table/tbody/tr[3]/td/span', "Listing Error");

    }
}
