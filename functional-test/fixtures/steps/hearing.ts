import { Page } from '@playwright/test';
import { BaseStep } from './base';
import {credentials} from "../../config/config";
import logger from '../../utils/loggerUtil';

const hearingTestData = require("../../pages/content/hearing.details_en.json");

export class Hearing extends BaseStep {
    
  readonly page : Page;
  

   constructor(page: Page) {
       super(page);
       this.page = page;
   }

    async verifyHearingIsTriggered(caseId :string, caseType :string) {


        await this.loginUserWithCaseId(credentials.amCaseWorker, false, caseId);
        await this.homePage.navigateToTab("Summary");
        await this.summaryTab.verifyPresenceOfText("Ready to list");

        await this.homePage.navigateToTab(hearingTestData.tabName);
        await this.hearingsTab.verifyHearingStatusSummary();
        await this.hearingsTab.clickHearingDetails();

        if(caseType === 'pip') {
            await this.hearingsTab.verifyPageContentByKeyValue(hearingTestData.hearingLengthKey, hearingTestData.pipHearingLengthValue);
            await this.hearingsTab.verifyVenueListForPaperCase(hearingTestData.hearingVenueKey, 37);
        } else if(caseType === 'dla') {
            await this.hearingsTab.verifyPageContentByKeyValue(hearingTestData.hearingLengthKey, hearingTestData.hearingLengthValue);
            await this.hearingsTab.verifyPageContentByKeyValue(hearingTestData.hearingVenueKey, hearingTestData.hearingVenueValue);
            await this.hearingsTab.verifyPageContentByKeyValue(hearingTestData.hearingAttendanceKey, hearingTestData.hearingAttendanceValue);
        } else {
            logger.info('No case type passed');
        }

        await this.hearingsTab.verifyPageContentByKeyValue(hearingTestData.hearingPriorityKey, hearingTestData.hearingPriorityValue);
        await this.hearingsTab.verifyExpHearingDateIsGenerated('31');
        await this.hearingsTab.clickBackLink();
    }

    async verifyHearingIsTriggeredForUCCase() {

        await this.homePage.navigateToTab(hearingTestData.tabName);
        await this.hearingsTab.verifyHearingStatusSummary();
        await this.hearingsTab.clickHearingDetails();
        await this.hearingsTab.verifyPageContentByKeyValue(hearingTestData.hearingLengthKey, hearingTestData.ucHearingLengthValue);
        await this.hearingsTab.verifyPageContentByKeyValue(hearingTestData.hearingVenueKey, hearingTestData.hearingVenueValue);
        await this.hearingsTab.verifyPageContentByKeyValue(hearingTestData.hearingPriorityKey, hearingTestData.hearingPriorityValue);
        await this.hearingsTab.verifyPageContentByKeyValue(hearingTestData.hearingAttendanceKey, hearingTestData.hearingAttendanceValue);
        await this.hearingsTab.verifyExpHearingDateIsGenerated('31');
    }

    async verifyHearingCancellation() {
        await this.hearingsTab.clickCancelLink();
        await this.hearingsTab.submitCancellationReason();
        await this.hearingsTab.verifyCancellationStatusSummary();
    }
}
