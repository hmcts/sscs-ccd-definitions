import { Page, expect } from '@playwright/test';
import { BaseStep } from './base';
import { credentials } from "../../config/config";

export class SearchFilter extends BaseStep {

    readonly page: Page;


    constructor(page: Page) {
        super(page);
        this.page = page;
    }

   async performSearchSteps(caseId : number) {
        await this.loginUserWithoutCaseId(credentials.amCaseWorker, false);
        await this.searchFilterPage.checkCaseList();
        await this.searchFilterPage.performSearch();
        await this.searchFilterPage.validateSearchResults(caseId);
   }
}