import { Page } from '@playwright/test';
import { HomePage } from '../../pages/common/homePage';
import { AddNotePage } from '../../pages/addNotePage';
import { LoginPage } from '../../pages/common/loginPage';
import { EventNameEventDescriptionPage } from '../../pages/event.name.event.description';
import createCaseBasedOnCaseType from  "../../helpers/dataSetUpHelper";
import addNoteTestData from "../../pages/content/add.note_en.json";
import eventTestData from "../../pages/content/event.name.event.description_en.json";


export class Note {
    
  readonly page : Page;
  

   constructor(page: Page) {
       this.page = page;
   }

    async submitNoteSuccessfully() {
        let loginPage = new LoginPage(this.page);
        let homePage = new HomePage(this.page);
        let addNotePage = new AddNotePage(this.page);
        let eventNameAndDescriptionPage = new EventNameEventDescriptionPage(this.page);

        var pipCaseId = await createCaseBasedOnCaseType("PIP");
        await loginPage.goToLoginPage();
        await loginPage.verifySuccessfulLoginForCaseworker('Case list');

        await homePage.goToHomePage(pipCaseId);
        await homePage.chooseEvent(eventTestData.addNoteEvent);

        await addNotePage.verifyPageContent();
        await addNotePage.inputData(addNoteTestData.noteSummaryValue);
        await addNotePage.confirmSubmission();

        await eventNameAndDescriptionPage.verifyPageContent();
        await eventNameAndDescriptionPage.inputData();
        await eventNameAndDescriptionPage.confirmSubmission();

        await homePage.verifyTabContent(addNoteTestData.noteFieldValue, addNoteTestData.noteSummaryValue);
    }

    
}
