import { Page } from '@playwright/test';
import { HomePage } from '../../pages/common/homePage';
import { AssociateCasePage } from '../../pages/associate.case.page';
import { LoginPage } from '../../pages/common/loginPage';
import createCaseBasedOnCaseType from "../../api/client/sscs/factory/appeal.type.factory";
import { StringUtilsComponent } from "../../utils/StringUtilsComponent";
import { History } from "../../pages/tabs/history";
import { Summary } from "../../pages/tabs/summary";
import associateCaseTestData from "../../pages/content/associate.case_en.json";

export class AssociateCase {

  readonly page : Page;

   constructor(page: Page) {
       this.page = page;
   }

    async associateCaseSuccessfully() {
        let homePage = new HomePage(this.page);
        let historyTab = new History(this.page);
        let summaryTab = new Summary(this.page);
        let associateCasePage = new AssociateCasePage(this.page);

        var firstPipCaseId = await createCaseBasedOnCaseType("PIP");
        var secondPipCaseId = await createCaseBasedOnCaseType("PIP");
        let hyphenatedSecondCaseId = StringUtilsComponent.formatClaimReferenceToAUIDisplayFormat(secondPipCaseId).replace(/\s/g, '-');
        await this.goToAssociateCasePage(this.page, firstPipCaseId);

        await associateCasePage.associateCase(secondPipCaseId);
        await associateCasePage.confirmSubmission();

        await homePage.navigateToTab("Summary");
        await summaryTab.verifyPageContentLinkTextByKeyValue('Related appeal(s)', hyphenatedSecondCaseId);
        await homePage.navigateToTab("History");
        await historyTab.verifyPageContentByKeyValue('End state', 'With FTA');
        await historyTab.verifyPageContentByKeyValue('Event', 'Associate case');
        await historyTab.verifyEventCompleted('Associate case');
    }

    async associateNonExistentCase() {
        let homePage = new HomePage(this.page);
        let historyTab = new History(this.page);
        let summaryTab = new Summary(this.page);
        let associateCasePage = new AssociateCasePage(this.page);

        var pipCaseId = await createCaseBasedOnCaseType("PIP");
        await this.goToAssociateCasePage(this.page, pipCaseId);

        await associateCasePage.associateCase(associateCaseTestData['associate-case-non-existent-case']);
        await associateCasePage.verifyInputErrorMessage(associateCaseTestData['associate-case-non-existent-case']);
        await associateCasePage.cancelEvent();

        await homePage.navigateToTab("Summary");
        await summaryTab.verifyFieldHiddenInPageContent('Related appeal(s)');
        await homePage.navigateToTab("History");
        await historyTab.verifyPageContentByKeyValue('End state', 'With FTA');
    }

    async selfAssociateACase() {
        let homePage = new HomePage(this.page);
        let historyTab = new History(this.page);
        let summaryTab = new Summary(this.page);
        let associateCasePage = new AssociateCasePage(this.page);

        var pipCaseId = await createCaseBasedOnCaseType("PIP");
        await this.goToAssociateCasePage(this.page, pipCaseId);

        await associateCasePage.associateCase(pipCaseId);
        /* TODO: user is able to continue next page when same caseId is used to associate
           instead of displaying error message. Below method needs to be updated when the
           relevant bug is fixed.
        */
        await associateCasePage.verifyInputErrorMessage(associateCaseTestData['associate-case-non-existent-case']);
        await associateCasePage.cancelEvent();

        await homePage.navigateToTab("Summary");
        await summaryTab.verifyFieldHiddenInPageContent('Related appeal(s)');
        await homePage.navigateToTab("History");
        await historyTab.verifyPageContentByKeyValue('End state', 'With FTA');
    }

    private async goToAssociateCasePage(page: Page, caseId: string) {
        let loginPage = new LoginPage(page);
        let homePage = new HomePage(page);
        await loginPage.goToLoginPage();
        await loginPage.verifySuccessfulLoginForCaseworker();
        await homePage.goToHomePage(caseId);
        await homePage.chooseEvent("Associate case");
    }
}
