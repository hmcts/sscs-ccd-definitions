import {Page} from '@playwright/test';
import {HomePage} from '../../pages/common/homePage';
import {LoginPage} from '../../pages/common/loginPage';
import {EventNameEventDescriptionPage} from '../../pages/common/event.name.event.description';
import createCaseBasedOnCaseType from "../../api/client/sscs/factory/appeal.type.factory";
import {History} from '../../pages/tabs/history';
import {WebAction} from '../../common/web.action';
import { BaseStep } from './base';
const eventTestData = require("../../pages/content/event.name.event.description_en.json");


export class ListingError extends BaseStep {

    readonly page: Page;

    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    async performListingErrorEvent() {
        let webActions = new WebAction(this.page);

        //Create Case
        await this.loginAsCaseworkerUserWithoutCaseId(undefined, 'PIP');
        await this.homePage.reloadPage();
        await this.homePage.chooseEvent('Listing Error');

        //Enter details in event and submit
        await this.eventNameAndDescriptionPage.verifyPageContent('Listing Error');
        await this.eventNameAndDescriptionPage.inputData(eventTestData.eventSummaryInput,
            eventTestData.eventDescriptionInput);
        await this.eventNameAndDescriptionPage.confirmSubmission();

        //Navigate to History Tab and Verify event is listed
        await this.homePage.navigateToTab("History");
        await this.historyTab.verifyEventCompleted("Listing Error");

        //Verify End State after performing the event.
        await webActions.verifyPageLabel('//*[@id="case-viewer-field-read--caseHistory"]/span/ccd-field-read/div/ccd-field-read-label/div/ccd-case-history-viewer-field/ccd-event-log/div/div[2]/div/ccd-event-log-details/table/tbody/tr[3]/th/span', "End state");
        await webActions.verifyPageLabel('//*[@id="case-viewer-field-read--caseHistory"]/span/ccd-field-read/div/ccd-field-read-label/div/ccd-case-history-viewer-field/ccd-event-log/div/div[2]/div/ccd-event-log-details/table/tbody/tr[3]/td/span', "Listing Error");

    }
}
