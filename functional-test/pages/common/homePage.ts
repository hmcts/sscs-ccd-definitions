import { expect, Locator, Page } from '@playwright/test';
import { WebAction } from '../../common/web.action';
import logger from '../../utils/loggerUtil';

let webActions: WebAction;

export class HomePage {

    readonly page: Page;
    readonly summaryTab: Locator;
    readonly notePadTab: Locator;
    readonly historyTab: Locator;
    readonly appealDetailsTab: Locator;
    readonly submitNextStepButton: string;
    readonly nextStepDropDown: string;
    readonly eventTitle: Locator;
    readonly beforeTabBtn: Locator;


    constructor(page: Page) {
        this.page = page;
        this.notePadTab = page.locator('//div[contains(text(), "Notepad")]');
        this.summaryTab = page.locator('//div[contains(text(), "Summary")]');
        this.historyTab = page.locator('//div[@role="tab"]//div[text()="History"]');
        //this.historyTab = page.locator('//div[contains(text(), "History")]');
        //this.historyTab = page.getByText('History', {exact: true});
        this.appealDetailsTab = page.getByText('Appeal Details', {exact: true});
        this.nextStepDropDown = '#next-step';
        this.submitNextStepButton = '//button[@class="submit"]';
        this.eventTitle = page.locator('h1.govuk-heading-l');
        this.beforeTabBtn = page.locator('//html/body/exui-root/exui-case-home/div/exui-case-details-home/exui-case-viewer-container/ccd-case-viewer/div/ccd-case-full-access-view/div[2]/div/mat-tab-group/mat-tab-header/button[1]/div');


        webActions = new WebAction(this.page);

    }

    async delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }

    async reloadPage() {
        await this.page.reload({timeout:10000, waitUntil:'load'});
    }

    async goToHomePage(caseId: string): Promise<void> {
        await this.page.goto(`/cases/case-details/${caseId}`);
        await expect(this.summaryTab)
            .toBeVisible()
            .catch((error) => {
                logger.error(`Element to verify assertion is not present: ${error}`);
            });
    }

    async chooseEvent(eventName: string): Promise<void> {

        await webActions.chooseOptionByLabel(this.nextStepDropDown, eventName);
        //await webActions.clickNextStepButton(this.submitNextStepButton);
        await webActions.clickButton('Go');
    }

    async clickBeforeTabBtn(): Promise<void> {
        await this.beforeTabBtn.click();
    }

    async navigateToTab(tabName : string): Promise<void> {
        switch(tabName) {
            case "Notepad": {
                await this.notePadTab.click();
                break;
            }
            case "History": {
                await this.historyTab.click();
                break;
            }
            case "Summary": {
                await this.summaryTab.click();
                break;
            }
            case "Appeal Details": {
                await expect(this.appealDetailsTab).toBeVisible();
                await this.appealDetailsTab.click();
                break;
            }
            default: {
                //statements;
                break;
            }
        }
    }
}
