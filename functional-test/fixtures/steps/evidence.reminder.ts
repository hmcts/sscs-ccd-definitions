import { Page } from '@playwright/test';
import { HomePage } from '../../pages/common/homePage';
import { EvidenceReminderPage } from '../../pages/evidenceReminderPage';
import { LoginPage } from '../../pages/common/loginPage';
import { EventNameEventDescriptionPage } from '../../pages/common/event.name.event.description';
import createCaseBasedOnCaseType from "../../api/client/appeal.type.factory";
import { NotePad } from '../../pages/tabs/note.pad';
import eventTestData from "../../pages/content/event.name.event.description_en.json"
import {History} from "../../pages/tabs/history";
import {StringUtilsComponent} from "../../utils/StringUtilsComponent";



export class EvidenceReminder {
    
  readonly page : Page;
  

   constructor(page: Page) {
       this.page = page;
   }

    async performEvidenceReminder() {
        let loginPage = new LoginPage(this.page);
        let homePage = new HomePage(this.page);
        let evidenceReminderPage = new EvidenceReminderPage(this.page);
        let notePadTab = new NotePad(this.page);
        let historyTab = new History(this.page);
        let eventNameAndDescriptionPage = new EventNameEventDescriptionPage(this.page);

        var pipCaseId = await createCaseBasedOnCaseType("PIP");
        await loginPage.goToLoginPage();
        await loginPage.verifySuccessfulLoginForCaseworker();

        await homePage.goToHomePage(pipCaseId);
        await homePage.chooseEvent('Evidence reminder');

        await evidenceReminderPage.verifyPageContent();
    }
}