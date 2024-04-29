import { expect, Locator, Page } from '@playwright/test';
import { HomePage } from '../../pages/homePage';
import { AddNotePage } from '../../pages/addNotePage';
import { LoginPage } from '../../pages/loginPage';
import createCaseBasedOnCaseType from  "../../helpers/dataSetUpHelper";
const addNoteTestConfig = require('../../data/uiJsonTestData/add-note.json');
const eventTestConfig = require('../../data/uiJsonTestData/event-name.json'); 


export class Note {
    
  readonly page : Page;
  

   constructor(page: Page) {
       this.page = page;
   }

    async submitNoteSuccessfully() {
        let loginPage = new LoginPage(this.page);
        let homePage = new HomePage(this.page);
        let addNotePage = new AddNotePage(this.page);

        var pipCaseId = await createCaseBasedOnCaseType("PIP");
        await loginPage.goToLoginPage();
        await loginPage.verifySuccessfulLoginForCaseworker('Case list');

        await homePage.goToHomePage(pipCaseId);
        await homePage.chooseEvent(eventTestConfig.addNoteEvent);

        await addNotePage.verifyPageContent();
        await addNotePage.inputData(addNoteTestConfig.noteSummaryValue);
        await addNotePage.confirmSubmission();
        await addNotePage.confirmSubmission();

        await homePage.verifyTabContent(addNoteTestConfig.noteFieldValue, addNoteTestConfig.noteSummaryValue);
    }

    
}
