import { expect, Page } from '@playwright/test';
import { WebAction } from '../common/web.action';
import { listenerCount } from 'process';
import { Browser } from 'puppeteer';
//import addUpdateSubscriptionData from "./content/update.subscription.data_en.json";


let webAction: WebAction;

export class SearchFilterPage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        webAction = new WebAction(this.page);
    }
       
    async checkCaseList(): Promise<void> {
        await expect(this.page.getByText('Your cases')).toBeVisible();
        await expect(this.page.getByText('Filters')).toBeVisible();
    }
    
    async performSearch(): Promise<void> {
        await this.page.locator('#wb-jurisdiction').selectOption({ label: 'Tribunals' });
        await this.page.locator('#wb-case-type').selectOption({ label: 'SSCS Case 6.4.9 AAT' });
        await this.page.locator('#wb-case-state').selectOption({ label: 'Appeal Created' });
        await this.page.locator('#benefitCode').selectOption({ label: '002' });
        await this.page.locator('#issueCode').selectOption({ label: 'DD' });
        await this.page.getByRole('button', { name: 'Apply' }).click();
        await this.page.waitForLoadState();
        await this.page.pause();
        await expect(this.page.locator('#search-result-summary__text')).toContainText('results');
        await this.page.waitForTimeout;
    }

    async validateSearchResults(caseId: number) {
        const tot = await this.page.locator('ccd - search - result: nth - child(1) > table: nth - child(1) > tbody: nth - child(3) > tr').count();
        await expect(tot).toEqual(caseId);
    }
}