import {expect, Page} from "@playwright/test";
import {WebAction} from "../common/web.action";
import linkCaseTestData from "./content/link.case_en.json";

let webAction: WebAction;

export class LinkCasePage {

    readonly page

    constructor(page: Page) {
        this.page = page;
        webAction = new WebAction(this.page)
    }

    async verifyPageContent(caseReference: string) {
        await webAction.verifyPageLabel('.govuk-heading-l', linkCaseTestData.linkCaseHeading);
        await webAction.verifyPageLabel('.heading-h2', linkCaseTestData.linkCaseHeading2);
    }

    async linkCase(caseNumber: string): Promise<void> {
        await webAction.clickButton("Add new");
        await webAction.inputField('.form-control', caseNumber);
        await webAction.clickButton("Submit");
    }

    async removeLink() {
        await webAction.clickButton("Remove");
        await webAction.clickButton("Remove");
    }


    async verifyCaseCannotLinkToItself() {
        let errorMessageText = (await this.page.locator("//li[@class='ng-star-inserted']").textContent()).trim();
        expect(errorMessageText).toEqual(`You can’t link the case to itself, please correct`);
    }

    async verifyCannotLinkFakeCase(caseNumber: string){
        let errorMessageText = (await this.page.locator("//span[@class='error-message ng-star-inserted']").textContent()).trim();
        expect(errorMessageText).toEqual(`${caseNumber} does not correspond to an existing CCD case.`);
    }

    async cancelEvent(): Promise<void> {
        await webAction.clickLink("Cancel");
    }

    async confirmSubmission():Promise<void>{
        await webAction.clickSubmitButton();
    }


}