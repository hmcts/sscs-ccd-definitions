import { Page } from '@playwright/test';
import { HomePage } from '../../pages/common/homePage';
import { LoginPage } from '../../pages/common/loginPage';
import { EventNameEventDescriptionPage } from '../../pages/common/event.name.event.description';
import createCaseBasedOnCaseType from "../../api/client/appeal.type.factory";
import eventTestData from "../../pages/content/event.name.event.description_en.json"
import {History} from "../../pages/tabs/history";



export class EvidenceReminder {
    
  readonly page : Page;
  

   constructor(page: Page) {
       this.page = page;
   }

    async performEvidenceReminder() {
        let loginPage = new LoginPage(this.page);
        let homePage = new HomePage(this.page);
        let historyTab = new History(this.page);
        let eventNameAndDescriptionPage = new EventNameEventDescriptionPage(this.page);

        var pipCaseId = await createCaseBasedOnCaseType("PIP");
        await loginPage.goToLoginPage();
        await loginPage.verifySuccessfulLoginForCaseworker();
        await homePage.goToHomePage(pipCaseId);

        await homePage.chooseEvent('Evidence reminder');
        await eventNameAndDescriptionPage.verifyPageContent("Evidence reminder");
        await eventNameAndDescriptionPage.inputData(eventTestData["event-summary-input"],
            eventTestData["event-description-input"]);
        await eventNameAndDescriptionPage.confirmSubmission();

        await homePage.navigateToTab("History");
        await historyTab.verifyPageContentByKeyValue('Event', 'Evidence reminder');
        await historyTab.verifyPageContentByKeyValue('Summary', 'Event Summary for Automation');
        await historyTab.verifyPageContentByKeyValue('Comment', 'Event Description for Automation Verification');
        await historyTab.verifyPageContentByKeyValue('End state', 'With FTA');
        await historyTab.verifyEventCompleted("Evidence reminder");
    }
}