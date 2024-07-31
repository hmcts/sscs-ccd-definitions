import {expect, Page} from "@playwright/test";
import {WebAction} from "../common/web.action";

let webAction: WebAction;

export class ListingRequirementPage {

    readonly page

    constructor(page: Page) {
        this.page = page;
        webAction = new WebAction(this.page)
    }

    async updateHearingValues() {
        await webAction.typeField('#overrideFields_duration', '120');
        await webAction.clickElementById('#overrideFields_appellantInterpreter_isInterpreterWanted_Yes');
        await webAction.chooseOptionByLabel('#overrideFields_appellantInterpreter_interpreterLanguage', 'Dutch');
        await webAction.clickButton('Continue');
    }

    async submitUpdatedValues() {
        await webAction.clickElementById('#amendReasons-adminreq');
        await webAction.clickSubmitButton();
        await webAction.clickSubmitButton();
    }
    // async verifyPageContent(caseReference: string) {
    //     await webAction.verifyPageLabel('.govuk-heading-l', linkCaseTestData.linkCaseHeading);
    //     await webAction.verifyPageLabel('.heading-h2', linkCaseTestData.linkCaseHeading2);
    // }

    // async linkCase(caseNumber: string): Promise<void> {
    //     await webAction.clickButton("Add new");
    //     await expect(this.page.locator('input#linkedCase_0_0')).toBeVisible();
    //     await this.page.locator('input#linkedCase_0_0').pressSequentially(caseNumber);
    //     await this.page.locator('div#linkedCase.form-group').click();
    //     await webAction.clickButton("Submit");
    // }

    // async removeLink() {
    //     await webAction.clickButton("Remove");
    //     await webAction.clickButton("Remove");
    // }

    // async verifyCaseCannotLinkToItself() {
    //     let errorMessageText = (await this.page.locator('ul#errors li.ng-star-inserted').textContent()).trim();
    //     expect(errorMessageText).toEqual(`You can’t link the case to itself, please correct`);
    // }

    // async verifyCannotLinkFakeCase(caseNumber: string){
    //     let errorMessageText = (await this.page.locator('div span.error-message').textContent()).trim();
    //     expect(errorMessageText).toEqual(`${caseNumber} does not correspond to an existing CCD case.`);
    // }

    // async cancelEvent(): Promise<void> {
    //     await webAction.clickLink("Cancel");
    // }

    // async confirmSubmission():Promise<void>{
    //     await webAction.clickSubmitButton();
    // }


}