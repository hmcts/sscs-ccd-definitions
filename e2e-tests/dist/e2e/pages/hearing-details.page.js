"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HearingDetailsPage = void 0;
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
const protractor_1 = require("protractor");
const any_page_1 = require("./any.page");
const chai_1 = require("chai");
const any_ccd_page_1 = require("./any-ccd.page");
const wait_1 = require("../enums/wait");
const anyCcdPage = new any_ccd_page_1.AnyCcdPage();
const hearingStatus = 'WAITING TO BE LISTED ';
class HearingDetailsPage extends any_page_1.AnyPage {
    async requestManualHearing() {
        await protractor_1.browser.manage().window().maximize();
        await anyCcdPage.clickTab('Hearings');
        await protractor_1.browser.sleep(1000);
        (0, chai_1.expect)(await anyCcdPage.contentContains('Request a hearing')).to.equal(true);
        await anyCcdPage.clickButton('Request a hearing');
        await protractor_1.browser.sleep(500);
        await anyCcdPage.clickButton('Continue');
        await protractor_1.browser.sleep(500);
        await this.doYouRequireAdditionalFacilities('No');
        await anyCcdPage.clickButton('Continue');
        await protractor_1.browser.sleep(500);
        await anyCcdPage.clickButton('Continue');
        await anyCcdPage.clickButton('Continue');
        await protractor_1.browser.sleep(500);
        await (0, protractor_1.element)(protractor_1.by.id('inputLocationSearch')).sendKeys('CARDIFF CIVIL AND FAMILY JUSTICE CENTRE');
        await anyCcdPage.clickButton('Add location');
        await protractor_1.browser.sleep(500);
        await anyCcdPage.clickButton('Continue');
        await anyCcdPage.clickButton('Continue');
        await protractor_1.browser.sleep(500);
        await this.doYouWantSpecificJudge('No');
        await anyCcdPage.clickButton('Tribunal Judge');
        await anyCcdPage.clickButton('Continue');
        await protractor_1.browser.sleep(500);
        await anyCcdPage.clickButton('Continue');
        await protractor_1.browser.sleep(500);
        await anyCcdPage.clickButton('Continue');
        await protractor_1.browser.sleep(500);
        await anyCcdPage.clickButton('Continue');
        await protractor_1.browser.sleep(500);
        await anyCcdPage.clickButton('Continue');
        await protractor_1.browser.sleep(500);
        await anyCcdPage.clickButton('Submit request');
        await protractor_1.browser.sleep(2000);
        (0, chai_1.expect)(await anyCcdPage.pageHeadingContains('Hearing request submitted')).to.equal(true);
        await anyCcdPage.clickElementByCss('.govuk-body .govuk-link');
        await protractor_1.browser.sleep(2000);
    }
    async verifyHearingStatusSummary() {
        await anyCcdPage.reloadPage();
        await protractor_1.browser.sleep(5000);
        await (0, protractor_1.element)(protractor_1.by.xpath('//exui-case-hearings-list[1]/table/tbody/tr/td[3]/strong'))
            .getText()
            .then(async (expText) => {
            console.log(`Actual text is #######${expText} #######`);
            (0, chai_1.expect)(expText).to.equal(hearingStatus);
        });
        (0, chai_1.expect)(await anyCcdPage.contentContains('Substantive')).to.equal(true);
    }
    async doYouWantSpecificJudge(yesOrNo) {
        await anyCcdPage.clickElementById(`specific-judge-selection${yesOrNo}`);
    }
    async doYouRequireAdditionalFacilities(yesOrNo) {
        await anyCcdPage.clickElementById(`addition-security-confirmation${yesOrNo}`);
    }
    async requestAutoHearing() {
        await protractor_1.browser.manage().window().maximize();
        await anyCcdPage.clickTab('Hearings');
        // expect(await anyCcdPage.contentContains('Request a hearing')).to.equal(true);
    }
    async viewHearingDetails() {
        await anyCcdPage.clickElementByCss('a[id*="link-view-or-edit"]');
        await protractor_1.browser.sleep(5000);
    }
    async verifyHearingVenue(venueName) {
        (0, chai_1.expect)(await anyCcdPage.contentContains(venueName)).to.equal(true);
    }
    async verifyHearingDuration(hearingDuration) {
        (0, chai_1.expect)(await anyCcdPage.contentContains(hearingDuration)).to.equal(true);
    }
    async verifyHearingDate(hearingStartDate) {
        await (0, protractor_1.element)(protractor_1.by.xpath('//exui-hearing-summary/div[11]/div/div[2]/div[2]/div[2]/div'))
            .getText()
            .then(async (actDate) => {
            console.log(`date fetched is #### ${actDate}`);
            (0, chai_1.expect)(actDate).to.include(hearingStartDate);
        });
    }
    async updateHearingDetails(hearingDuration) {
        await anyCcdPage.clickElementById('hearingLength');
        (0, chai_1.expect)(await anyCcdPage.contentContains('Length, date and priority level of hearing')).to.equal(true);
        await protractor_1.browser.sleep(wait_1.Wait.short);
        await (0, protractor_1.element)(protractor_1.by.css('#durationhours')).clear();
        await (0, protractor_1.element)(protractor_1.by.css('#durationhours')).sendKeys(Number(hearingDuration));
        await protractor_1.browser.sleep(wait_1.Wait.min);
        await anyCcdPage.clickButton('Continue');
        await protractor_1.browser.sleep(wait_1.Wait.min);
        await anyCcdPage.clickButton('Submit updated request');
        await protractor_1.browser.sleep(wait_1.Wait.min);
        await anyCcdPage.clickElementById('adminreq');
        await protractor_1.browser.sleep(wait_1.Wait.min);
        await anyCcdPage.clickButton('Submit change request');
        await protractor_1.browser.sleep(wait_1.Wait.min);
        await anyCcdPage.clickLink('view the status of this hearing in the hearings tab');
    }
    async verifyHearingStatus(statusHearing) {
        await protractor_1.browser.sleep(1500);
        await protractor_1.browser.manage().window().maximize();
        await anyCcdPage.clickTab('Hearings');
        await protractor_1.browser.sleep(wait_1.Wait.short);
        const actText = await (0, protractor_1.element)(protractor_1.by.xpath('//table/tbody/tr/td[3]/strong')).getText();
        (0, chai_1.expect)(actText.trim()).to.equal(statusHearing);
    }
    async verifyHearingChannel(hearingChannel) {
        await protractor_1.browser.sleep(500);
        await anyCcdPage.chooseOption('overrideFields_appellantHearingChannel', hearingChannel);
        await protractor_1.browser.sleep(500);
    }
    async verifyAttendingOfficer(AttendingOfficer) {
        await protractor_1.browser.sleep(500);
        await anyCcdPage.clickElementById('overrideFields_poToAttend_Yes');
        await protractor_1.browser.sleep(500);
    }
    async verifyAmendReasonForUpdate() {
        await protractor_1.browser.sleep(500);
        await anyCcdPage.clickButton('Continue');
        await protractor_1.browser.sleep(500);
        await anyCcdPage.clickElementById('amendReasons-judgereq');
        await protractor_1.browser.sleep(500);
        await anyCcdPage.clickButton('Continue');
        await protractor_1.browser.sleep(500);
        await anyCcdPage.clickButton('Submit');
        await protractor_1.browser.sleep(500);
    }
    async verifyCancelHearingStatus(hearingStats) {
        (0, chai_1.expect)(await anyCcdPage.contentContains(hearingStats.toUpperCase())).to.equal(true);
    }
}
exports.HearingDetailsPage = HearingDetailsPage;
//# sourceMappingURL=hearing-details.page.js.map