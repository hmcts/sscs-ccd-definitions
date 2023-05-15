import { browser, by, element } from 'protractor';
import { AnyPage } from './any.page';
import { expect } from 'chai';
import { AnyCcdPage } from './any-ccd.page';

const anyCcdPage = new AnyCcdPage();

const sleepAmount = 500;

export class HearingDetailsPage extends AnyPage {
  async requestHearing() {
    await browser.sleep(sleepAmount);
    await anyCcdPage.clickTab('Hearings');
    await anyCcdPage.clickButton('Request a hearing');
    await browser.sleep(sleepAmount);
    await anyCcdPage.clickContinue();
    await this.doYouRequireAdditionalFacilities('No');
    await anyCcdPage.clickContinue();
    await anyCcdPage.clickContinue();
    await anyCcdPage.clickContinue();
    await element(by.id('inputLocationSearch')).sendKeys('CARDIFF CIVIL AND FAMILY JUSTICE CENTRE');
    await anyCcdPage.clickButton('Add location');
    await browser.sleep(sleepAmount);
    await anyCcdPage.clickContinue();
    await anyCcdPage.clickContinue();
    await this.doYouWantSpecificJudge('No');
    await anyCcdPage.clickButton('Tribunal Judge');
    await anyCcdPage.clickContinue();
    await anyCcdPage.clickContinue();
    await anyCcdPage.clickContinue();
    await anyCcdPage.clickContinue();
    await anyCcdPage.clickContinue();
    await anyCcdPage.clickButton('Submit request');
    expect(await anyCcdPage.pageHeadingContains('Hearing request submitted')).to.equal(true);
  }

  async doYouWantSpecificJudge(yesOrNo: string) {
    await anyCcdPage.clickElementById(`specific-judge-selection${yesOrNo}`);
  }

  async doYouRequireAdditionalFacilities(yesOrNo: string) {
    await anyCcdPage.clickElementById(`addition-security-confirmation${yesOrNo}`);
  }
}
