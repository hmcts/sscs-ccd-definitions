import { expect, Locator, Page } from '@playwright/test';
import { WebAction } from '../../common/web.action';
import logger from '../../utils/loggerUtil';

let webActions: WebAction;

export class HomePage {

    readonly page: Page;
    readonly summaryTab: Locator;
    readonly notePadTab: Locator;
    readonly historyTab: Locator;
    readonly rolesAndAccessTab: Locator;
    readonly tasksTab: Locator;
    readonly welshTab: Locator;
    readonly appealDetailsTab: Locator;
    readonly bundlesTab: Locator;
    readonly submitNextStepButton: string;
    readonly nextStepDropDown: string;
    readonly eventTitle: Locator;
    readonly beforeTabBtn: Locator;
    readonly hearingRecordingsTab: Locator;
    readonly documentsTab: Locator;
    readonly listingRequirementsTab: Locator;
    readonly subscriptionsTab: Locator;
    readonly audioVideoEvidenceTab: Locator;
    readonly ftaDocumentsTab: Locator;
    readonly otherPartyDetailsTab: Locator;


    constructor(page: Page) {
        this.page = page;
        this.notePadTab = page.locator('//div[contains(text(), "Notepad")]');
        this.summaryTab = page.locator('//div[contains(text(), "Summary")]');
        this.historyTab = page.getByRole('tab', { name: 'History', exact: true });
        this.tasksTab = page.getByRole('tab', { name: 'Tasks', exact: true });
        this.welshTab = page.getByRole('tab', { name: 'Welsh', exact: true });
        this.rolesAndAccessTab = page.getByRole('tab', { name: 'Roles and access', exact: true });
        this.appealDetailsTab = page.getByText('Appeal Details', {exact: true});
        this.bundlesTab = page.getByText('Bundles', {exact: true});
        this.nextStepDropDown = '#next-step';
        this.submitNextStepButton = '//button[@class="submit"]';
        this.eventTitle = page.locator('h1.govuk-heading-l');
        this.hearingRecordingsTab = page.getByRole('tab', { name: 'Hearing Recordings', exact: true });
        this.documentsTab = page.getByRole('tab', { name: 'Documents', exact: true });
        this.listingRequirementsTab = page.getByRole('tab', { name: 'Listing Requirements', exact: true });
        this.audioVideoEvidenceTab = page.getByRole('tab', { name: 'Audio/Video evidence', exact: true });
        this.beforeTabBtn = page.locator('//html/body/exui-root/exui-case-home/div/exui-case-details-home/exui-case-viewer-container/ccd-case-viewer/div/ccd-case-full-access-view/div[2]/div/mat-tab-group/mat-tab-header/button[1]/div');
        this.subscriptionsTab = page.getByRole('tab', { name: 'Subscriptions', exact: true });
        this.ftaDocumentsTab = page.getByRole('tab', { name: 'FTA Documents', exact: true });
        this.otherPartyDetailsTab = page.getByRole('tab', { name: 'Other Party Details', exact: true });

        webActions = new WebAction(this.page);

    }

    async delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }

    async reloadPage() {
        await this.page.reload({timeout:13000, waitUntil:'load'});
    }

    async signOut(): Promise<void> {
        await webActions.clickElementById("//a[contains(.,'Sign out')]");
    }

    async goToHomePage(caseId: string): Promise<void> {
        // await this.page.goto(`/cases/case-details/${caseId}`);
        await this.selectToViewTasksAndCasesIfRequired();
        await webActions.inputField('#caseReference', caseId);
        await this.delay(1000);
        await webActions.clickFindButton();
        await this.delay(3000);
        await expect(this.summaryTab)
            .toBeVisible()
            .catch((error) => {
                logger.error(`Element to verify assertion is not present: ${error}`);
            });
    }

    async goToCaseList(): Promise<void> {
        //await this.page.goto(`/cases`);
        await this.selectToViewTasksAndCasesIfRequired();
        await this.page.getByRole('link', { name: 'Case list' }).waitFor();
        await this.page.getByRole('link', { name: 'Case list' }).click();
        await this.delay(3000);
        await expect(this.page.getByText('Filters')).toBeVisible();
    }

    async chooseEvent(eventName: string): Promise<void> {
        await this.delay(2000);
        await webActions.chooseOptionByLabel(this.nextStepDropDown, eventName);
        await expect(this.page.getByRole('button', { name: 'Go', exact: true })).toBeEnabled();
        await this.delay(2000);
        await webActions.clickSubmitButton();
        // await webActions.clickNextStepButton(this.submitNextStepButton);
        // await webActions.clickGoButton('Go');
    }

    async clickBeforeTabBtn(): Promise<void> {
        await this.beforeTabBtn.click();
    }

    async waitForLoadState() {
        await this.page.waitForLoadState('networkidle');
    }

    async clickSignOut() {
        await webActions.clickElementById('li a.hmcts-header__navigation-link');
    }

    async selectToViewTasksAndCasesIfRequired() {
        expect(await this.page.locator('h1').count()).toBeGreaterThanOrEqual(1);
        let headerText = await this.page.locator('h1').first().textContent();
        if(headerText.toLowerCase().includes('work access')) {
            await this.page.getByRole('radio', { name: 'View tasks and cases' }).click();
            await this.page.getByRole('button', { name: 'Continue' }).click();
        }
    }

    async navigateToTab(tabName : string): Promise<void> {
        switch(tabName) {
            case "Notepad": {
                await this.notePadTab.click();
                break;
            }
            case "History": {
                await expect(this.historyTab).toBeVisible();
                await this.historyTab.click();
                break;
            }
            case "Summary": {
                await expect(this.summaryTab).toBeVisible();
                await this.summaryTab.click();
                break;
            }
            case "Tasks": {
                await expect(this.tasksTab).toBeVisible();
                await this.tasksTab.click();
                break;
            }
            case "Welsh": {
                await expect(this.welshTab).toBeVisible();
                await this.welshTab.click();
                break;
            }
            case "Roles and access": {
                await expect(this.rolesAndAccessTab).toBeVisible();
                await this.rolesAndAccessTab.click();
                break;
            }
            case "Appeal Details": {
                await expect(this.appealDetailsTab).toBeVisible();
                await this.appealDetailsTab.click();
                break;
            }
            case "Bundles": {
                await expect(this.bundlesTab).toBeVisible();
                await this.bundlesTab.click();
                break;
            }
            case "Hearing Recordings": {
                await expect(this.hearingRecordingsTab).toBeVisible({ timeout: 8000});
                await this.hearingRecordingsTab.click();
                break;
            }
            case "Documents": {
                await expect(this.documentsTab).toBeVisible();
                await this.documentsTab.click();
                break;
            }
            case "Listing Requirements": {
                await expect(this.listingRequirementsTab).toBeVisible();
                await this.listingRequirementsTab.click();
                break;
            }
            case "Audio/Video Evidence": {
                await expect(this.audioVideoEvidenceTab).toBeVisible();
                await this.audioVideoEvidenceTab.click();
                break;
            }
            case "FTA Documents": {
                await expect(this.ftaDocumentsTab).toBeVisible();
                await this.ftaDocumentsTab.click();
                break;
            }
            case "Subscriptions": {
                await this.subscriptionsTab.click();
                break;
            }
            case "Other Party Details": {
                await this.otherPartyDetailsTab.click();
                break;
            }
            default: {
                //statements;
                break;
            }
        }
    }
}
