import { Page } from '@playwright/test';
import { HomePage } from '../../pages/common/homePage';
import { LoginPage } from '../../pages/common/loginPage';
import { UploadResponsePage } from '../../pages/upload.response.page';
import { CheckYourAnswersPage } from '../../pages/common/check.your.answers.page';
import { ResponseReviewedPage } from '../../pages/response.reviewed.page';
import { AssociateCasePage } from '../../pages/associate.case.page';
import { TextAreaPage } from "../../pages/common/text.area.page";
import createCaseBasedOnCaseType from "../../api/client/appeal.type.factory";
import { History } from "../../pages/tabs/history";
import { AppealDetails } from "../../pages/tabs/appealDetails";
import { AddNote } from '../../pages/add.note';
import { EventNameEventDescriptionPage } from '../../pages/common/event.name.event.description';
import { NotePad } from '../../pages/tabs/note.pad';
import { Summary } from "../../pages/tabs/summary";
import { Tasks } from "../../pages/tabs/tasks";
import { exit } from 'process';
import { InformationReceivedPage } from '../../pages/information.received.page';


export abstract class BaseStep {
    
  readonly page : Page;
  protected loginPage: LoginPage;
  protected homePage: HomePage;
  protected uploadResponsePage: UploadResponsePage;
  protected checkYourAnswersPage: CheckYourAnswersPage;
  protected responseReviewedPage: ResponseReviewedPage;
  protected addNotePage: AddNote;
  protected notePadTab: NotePad;
  protected eventNameAndDescriptionPage: EventNameEventDescriptionPage;
  protected associateCasePage: AssociateCasePage;
  protected informationReceivedPage: InformationReceivedPage;
  protected textAreaPage: TextAreaPage;
  protected historyTab: History;
  protected appealDetailsTab: AppealDetails;
  protected summaryTab: Summary;
  protected tasksTab: Tasks;


   constructor(page: Page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.homePage = new HomePage(this.page);
        this.uploadResponsePage = new UploadResponsePage(this.page);
        this.checkYourAnswersPage = new CheckYourAnswersPage(this.page);
        this.responseReviewedPage = new ResponseReviewedPage(this.page);
        this.eventNameAndDescriptionPage = new EventNameEventDescriptionPage(this.page);
        this.historyTab = new History(this.page);
        this.appealDetailsTab = new AppealDetails(this.page);
        this.addNotePage = new AddNote(this.page);
        this.notePadTab =  new NotePad(this.page);
        this.associateCasePage = new AssociateCasePage(this.page);
        this.informationReceivedPage = new InformationReceivedPage(this.page);
        this.summaryTab = new Summary(this.page);
        this.textAreaPage = new TextAreaPage(this.page);
        this.tasksTab = new Tasks(this.page);
   }

   async loginAsDWPUser(caseType: string){
        var caseId = await createCaseBasedOnCaseType(caseType);
        await this.loginPage.goToLoginPage();
        await this.loginPage.verifySuccessfulLoginForDWPResponseWriter(true);
        await this.homePage.goToHomePage(caseId);
        return caseId;
   }

   async loginAsCaseworkerUserWithoutCaseId(caseId?: string, caseType?: string){
        var caseId = await createCaseBasedOnCaseType(caseType);
        await this.loginPage.goToLoginPage();
        await this.loginPage.verifySuccessfulLoginForAMCaseworker(true);
        await this.homePage.goToHomePage(caseId);
   }

   async loginAsCaseworkerUserWithCaseId(caseId?: string){
      await this.loginPage.goToLoginPage();
      await this.loginPage.verifySuccessfulLoginForAMCaseworker(true);
      await this.homePage.goToHomePage(caseId);
   }

   async loginAsHMRCUser(caseType: string){
      var caseId = await createCaseBasedOnCaseType(caseType);
      await this.loginPage.goToLoginPage();
      await this.loginPage.verifySuccessfulLoginForHMRCUser(true);
      await this.homePage.goToHomePage(caseId);
      return caseId;
   }

   async loginAsJudgeUserWithoutCaseId(caseType: string) {
      var caseId = await createCaseBasedOnCaseType(caseType);
      await this.loginPage.goToLoginPage();
      await this.loginPage.verifySuccessfulLoginForJudge(true);
      await this.homePage.goToHomePage(caseId);
      return caseId;
   }

   async loginAsJudgeUserWithCaseId(caseId: string) {
      await this.loginPage.goToLoginPage();
      await this.loginPage.verifySuccessfulLoginForJudge(true);
      await this.homePage.goToHomePage(caseId);
      return caseId;
   }

   async loginAsCtscAdministratorCaseAllocatorWithCaseId(caseId: string) {
     await this.loginPage.goToLoginPage();
     await this.loginPage.verifySuccessfulLoginForCtscAdministratorCaseAllocator(true);
     await this.homePage.goToHomePage(caseId);
     return caseId;
   }

   async verifyHistoryTabDetails(state?: string, event?: string, comment?: string ) {
        await this.homePage.navigateToTab("History");
        if(state) await this.historyTab.verifyHistoryPageContentByKeyValue('End state', state);
        if(event) await this.historyTab.verifyHistoryPageContentByKeyValue('Event', event);
        if(comment) await this.historyTab.verifyHistoryPageContentByKeyValue('Comment', comment);
        if(event) await this.historyTab.verifyEventCompleted(event);
   }

   async verifyHistoryTabLink(linkLabel: string) {
      await this.homePage.navigateToTab("History");
      await this.historyTab.verifyHistoryPageEventLink(linkLabel);
   }

   async verifyAppealDetailsTab(state: string, value: string) {
        await this.homePage.navigateToTab("Appeal Details");
        await this.appealDetailsTab.verifyAppealDetailsPageContentByKeyValue(state, value);
        await this.appealDetailsTab.verifyFTADueDateOnAppealDetails();
   }
}