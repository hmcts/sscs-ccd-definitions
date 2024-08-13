import { BaseStep } from "./base";
import { Page, expect } from '@playwright/test';
import {credentials} from "../../config/config";

const reviewPHETestdata = require('../../pages/content/review.phe_en.json');
const bundleTestData = require('../../pages/content/create.a.bundle_en.json');


export class ReviewPHE extends BaseStep {

    readonly page: Page;

    constructor(page){
        
        super(page);
        this.page = page;
    }

    async grantAnPHERequest(caseId: string) {
        
        await this.loginUserWithCaseId(credentials.judge, false, caseId);
        await this.homePage.chooseEvent(reviewPHETestdata.eventNameCaptor);

        await this.reviewPHEPage.verifyPageContent();
        await this.reviewPHEPage.selectGrantPermission();
        await this.reviewPHEPage.confirmSubmission();

        await this.eventNameAndDescriptionPage.verifyPageContent(reviewPHETestdata.eventNameCaptor);
        await this.eventNameAndDescriptionPage.confirmSubmission();

       
        await this.summaryTab.verifyPresenceOfTitle(reviewPHETestdata.pheGrantedText);
        await this.verifyHistoryTabDetails(reviewPHETestdata.eventNameCaptor);
        await this.historyTab.verifyPresenceOfTitle(reviewPHETestdata.pheGrantedText);
        await this.homePage.clickSignOut();

        await this.loginUserWithCaseId(credentials.amCaseWorker, false, caseId);
        await this.homePage.navigateToTab("Appeal Details");
        await this.appealDetailsTab.verifyAppealDetailsPageContentByKeyValue('FTA State', 'PHE granted');
        await this.verifyBundleForPHE();
    }

    async verifyBundleForPHE(){
        
        await this.homePage.chooseEvent("Create a bundle");
        await this.createBundlePage.verifyPageContent();
        await this.createBundlePage.confirmSubmission();
        await expect(this.homePage.summaryTab).toBeVisible();

        await this.homePage.delay(15000);
        await this.homePage.reloadPage();
        await this.homePage.navigateToTab("Bundles");
        await this.bundlesTab.verifyBundlesTabContentByKeyValueForASpan(`${bundleTestData.stitchStatusLabel}`, `${bundleTestData.stitchStatusDone}`);
        await this.bundlesTab.verifyBundlesTabContentByKeyValueForASpanRegEx(`${bundleTestData.stitchDocLabel}`, `\\d+-${bundleTestData.stitchVal}\\.pdf`);
        await this.bundlesTab.verifyBundlesTabContentByKeyValueForASpan(`${bundleTestData.configUsed}`, `${bundleTestData.configUsedDefaultVal}`);
        await this.bundlesTab.verifyBundlesTabContentByKeyValueForASpan(`${bundleTestData.configUsed}`, `${bundleTestData.configUsedEditedVal}`);
    }


    async refuseAnPHERequest(caseId: string) {
        
        await this.homePage.clickSignOut();
        await this.loginUserWithCaseId(credentials.judge, false, caseId);
        await this.homePage.chooseEvent(reviewPHETestdata.eventNameCaptor);

        await this.reviewPHEPage.verifyPageContent();
        await this.reviewPHEPage.selectRefusePermission();
        await this.reviewPHEPage.confirmSubmission();

        await this.eventNameAndDescriptionPage.verifyPageContent(reviewPHETestdata.eventNameCaptor);
        await this.eventNameAndDescriptionPage.confirmSubmission();

       
        await this.summaryTab.verifyTitleNotPresent(reviewPHETestdata.pheGrantedText);
        await this.verifyHistoryTabDetails(reviewPHETestdata.eventNameCaptor);
        await this.homePage.clickSignOut();

        await this.loginUserWithCaseId(credentials.amCaseWorker, false, caseId);
        await this.homePage.navigateToTab("Appeal Details");
        await this.appealDetailsTab.verifyAppealDetailsPageContentByKeyValue('FTA State', 'PHE refused');
    }
}