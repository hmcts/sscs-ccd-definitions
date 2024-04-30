import { Page } from '@playwright/test';
import { HomePage } from '../../pages/common/homePage';
import { AddNotePage } from '../../pages/addNotePage';
import { LoginPage } from '../../pages/common/loginPage';
import { EventNameEventDescriptionPage } from '../../pages/event.name.event.description';
import createCaseBasedOnCaseType from "../../api/client/appealTypeFactory";
import { NotePadTab } from '../../pages/tabs/NotePadTab';



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
        await eventNameAndDescriptionPage.inputData();
        await eventNameAndDescriptionPage.confirmSubmission();

        await homePage.navigateToTab();
        //await notePadTab.verifyPageContentByKeyValue('Note','Playwright test note');
    }

    
}
