/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { browser, by, element } from 'protractor';
import { AnyPage } from './any.page';
import { expect } from 'chai';
import { AnyCcdPage } from './any-ccd.page';
import { Wait } from '../enums/wait';

const anyCcdPage = new AnyCcdPage();
const hearingStatus = 'WAITING TO BE LISTED ';
export class HearingDetailsPage extends AnyPage {
  async requestManualHearing() {
    await browser.manage().window().maximize();
    await anyCcdPage.clickTab('Hearings');
    await browser.sleep(1000);
    expect(await anyCcdPage.contentContains('Request a hearing')).to.equal(true);
    await anyCcdPage.clickButton('Request a hearing');
    await browser.sleep(500);
    await anyCcdPage.clickButton('Continue');
    await browser.sleep(500);
    await this.doYouRequireAdditionalFacilities('No');
    await anyCcdPage.clickButton('Continue');
    await browser.sleep(500);
    await anyCcdPage.clickButton('Continue');
    await anyCcdPage.clickButton('Continue');
    await browser.sleep(500);
    await element(by.id('inputLocationSearch')).sendKeys('CARDIFF CIVIL AND FAMILY JUSTICE CENTRE');
    await anyCcdPage.clickButton('Add location');
    await browser.sleep(500);
    await anyCcdPage.clickButton('Continue');
    await anyCcdPage.clickButton('Continue');
    await browser.sleep(500);
    await this.doYouWantSpecificJudge('No');
    await anyCcdPage.clickButton('Tribunal Judge');
    await anyCcdPage.clickButton('Continue');
    await browser.sleep(500);
    await anyCcdPage.clickButton('Continue');
    await browser.sleep(500);
    await anyCcdPage.clickButton('Continue');
    await browser.sleep(500);
    await anyCcdPage.clickButton('Continue');
    await browser.sleep(500);
    await anyCcdPage.clickButton('Continue');
    await browser.sleep(500);
    await anyCcdPage.clickButton('Submit request');
    await browser.sleep(2000);
    expect(await anyCcdPage.pageHeadingContains('Hearing request submitted')).to.equal(true);
    await anyCcdPage.clickElementByCss('.govuk-body .govuk-link');
    await browser.sleep(2000);
  }

  async verifyHearingStatusSummary() {
    await anyCcdPage.reloadPage();
    await browser.sleep(5000);
    await element(by.xpath('//exui-case-hearings-list[1]/table/tbody/tr/td[3]/strong'))
      .getText()
      .then(async (expText) => {
        console.log(`Actual text is #######${expText} #######`);
        expect(expText).to.equal(hearingStatus);
      });

    expect(await anyCcdPage.contentContains('Substantive')).to.equal(true);
  }

  async doYouWantSpecificJudge(yesOrNo: string) {
    await anyCcdPage.clickElementById(`specific-judge-selection${yesOrNo}`);
  }

  async doYouRequireAdditionalFacilities(yesOrNo: string) {
    await anyCcdPage.clickElementById(`addition-security-confirmation${yesOrNo}`);
  }

  async requestAutoHearing() {
    await browser.manage().window().maximize();
    await anyCcdPage.clickTab('Hearings');
    // expect(await anyCcdPage.contentContains('Request a hearing')).to.equal(true);
  }

  async viewHearingDetails() {
    await anyCcdPage.clickElementByCss('a[id*="link-view-or-edit"]');
    await browser.sleep(5000);
  }

  async verifyHearingVenue(venueName: string) {
    expect(await anyCcdPage.contentContains(venueName)).to.equal(true);
  }

  async verifyHearingDuration(hearingDuration: string) {
    expect(await anyCcdPage.contentContains(hearingDuration)).to.equal(true);
  }

  async verifyHearingDate(hearingStartDate: string) {
    await element(by.xpath('//exui-hearing-summary/div[11]/div/div[2]/div[2]/div[2]/div'))
      .getText()
      .then(async (actDate) => {
        console.log(`date fetched is #### ${actDate}`);
        expect(actDate).to.include(hearingStartDate);
      });
  }

  async updateHearingDetails(hearingDuration: string) {
    await anyCcdPage.clickElementById('hearingLength');
    expect(await anyCcdPage.contentContains('Length, date and priority level of hearing')).to.equal(true);
    await browser.sleep(Wait.short);
    await element(by.css('#durationhours')).clear();
    await element(by.css('#durationhours')).sendKeys(Number(hearingDuration));
    await browser.sleep(Wait.min);
    await anyCcdPage.clickButton('Continue');
    await browser.sleep(Wait.min);
    await anyCcdPage.clickButton('Submit updated request');
    await browser.sleep(Wait.min);
    await anyCcdPage.clickElementById('adminreq');
    await browser.sleep(Wait.min);
    await anyCcdPage.clickButton('Submit change request');
    await browser.sleep(Wait.min);
    await anyCcdPage.clickLink('view the status of this hearing in the hearings tab');
  }

  async verifyHearingStatus(statusHearing: string) {
    await browser.sleep(1500);
    await browser.manage().window().maximize();
    await anyCcdPage.clickTab('Hearings');
    await browser.sleep(Wait.short);
    const actText = await element(by.xpath('//table/tbody/tr/td[3]/strong')).getText();
    expect(actText.trim()).to.equal(statusHearing);
  }

  async verifyHearingChannel(hearingChannel: string) {
    await browser.sleep(500);
    await anyCcdPage.chooseOption('overrideFields_appellantHearingChannel', hearingChannel);
    await browser.sleep(500);
  }

  async verifyAttendingOfficer(AttendingOfficer: string) {
    await browser.sleep(500);
    await anyCcdPage.clickElementById('overrideFields_poToAttend_Yes');
    await browser.sleep(500);
  }

  async verifyAmendReasonForUpdate() {
    await browser.sleep(500);
    await anyCcdPage.clickButton('Continue');
    await browser.sleep(500);
    await anyCcdPage.clickElementById('amendReasons-judgereq');
    await browser.sleep(500);
    await anyCcdPage.clickButton('Continue');
    await browser.sleep(500);
    await anyCcdPage.clickButton('Submit');
    await browser.sleep(500);
  }

  async verifyCancelHearingStatus(hearingStats: string) {
    expect(await anyCcdPage.contentContains(hearingStats.toUpperCase())).to.equal(true);
  }
}
