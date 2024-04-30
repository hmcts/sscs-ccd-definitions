import { Page } from '@playwright/test';
import { HomePage } from '../../pages/common/homePage';
import { AddNotePage } from '../../pages/addNotePage';
import { LoginPage } from '../../pages/common/loginPage';
import { EventNameEventDescriptionPage } from '../../pages/common/event.name.event.description';
import createCaseBasedOnCaseType from "../../api/client/appealTypeFactory";
import { NotePadTab } from '../../pages/tabs/NotePadTab';
import eventTestData from "../../pages/content/event.name.event.description_en.json"



export class Note {
    
  readonly page : Page;
  

   constructor(page: Page) {
       this.page = page;
   }

    async performAddANote() {

        let loginPage = new LoginPage(this.page);
        let homePage = new HomePage(this.page);
        let addNotePage = new AddNotePage(this.page);
        let notePadTab = new NotePadTab(this.page);
        let eventNameAndDescriptionPage = new EventNameEventDescriptionPage(this.page);

        var pipCaseId = await createCaseBasedOnCaseType("PIP");
        await loginPage.goToLoginPage();
        await loginPage.verifySuccessfulLoginForCaseworker();

        await homePage.goToHomePage(pipCaseId);
        await homePage.chooseEvent('Add a note');

        await addNotePage.verifyPageContent();
        await addNotePage.inputData();
        await addNotePage.confirmSubmission();

        await eventNameAndDescriptionPage.verifyPageContent();
        //Params are passed to this page as this is a common page to be reused.
        await eventNameAndDescriptionPage.inputData(eventTestData["event-summary-input"], eventTestData["event-description-input"]);
        await eventNameAndDescriptionPage.confirmSubmission();

        await homePage.navigateToTab();
        //await notePadTab.verifyPageContentByKeyValue('Note','Playwright test note');
    }

    
}
