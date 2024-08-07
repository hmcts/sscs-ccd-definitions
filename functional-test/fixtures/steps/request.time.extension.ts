import { Page } from '@playwright/test';
import { BaseStep } from './base';
import { credentials } from "../../config/config";

const reqTimeExtData = require("../../pages/content/request.time.extension_en.json");


export class RequestTimeExtension extends BaseStep {

    readonly page: Page;

    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    async performAndVerifyRequestTimeExtension(caseId: string) {

        await this.loginUserWithCaseId(credentials.dwpResponseWriter,false, caseId);
        await this.homePage.reloadPage();
        await this.homePage.chooseEvent(reqTimeExtData.eventNameCaptor);

        await this.requestTimeExtensionPage.verifyPageContent();
        await this.requestTimeExtensionPage.uploadTimeExtensionDoc();
        await this.requestTimeExtensionPage.confirmSubmission();
 
        await this.loginUserWithCaseId(credentials.amCaseWorker,true, caseId);
        await this.homePage.navigateToTab('History');
        await this.historyTab.verifyHistoryPageEventLink(reqTimeExtData.eventName);

        await this.homePage.navigateToTab('Appeal Details');
        await this.appealDetailsTab.verifyAppealDetailsPageContentByKeyValue(reqTimeExtData.stateField, reqTimeExtData.stateValue);
        await this.appealDetailsTab.verifyAppealDetailsPageContentByKeyValue(reqTimeExtData.reasonField, reqTimeExtData.reasonValue);
    }

}
