import { browser, by, element } from 'protractor';
import { AnyPage } from './any.page';
import { Wait } from '../enums/wait';
import { AnyCcdPage } from './any-ccd.page';

import * as remote from 'selenium-webdriver/remote';

const anyCcdPage = new AnyCcdPage();

export class HearingRecordingPage extends AnyPage {
  async addHearingRecording() {
    await element(by.id('hearingRecording_recordings'))
      .element(by.xpath('//*[@id="hearingRecording_recordings"]/div/button[1]'))
      .click();
    await browser.waitForAngular();
    browser.setFileDetector(new remote.FileDetector());
    await anyCcdPage.uploadFile('hearingRecording_recordings_value', 'test_av.mp3');
  }

  async uploadHearingRecording() {
    await anyCcdPage.clickElementById('hearingRecording_hearingType-final');
    await this.addHearingRecording();
    await anyCcdPage.clickContinue();
    await browser.sleep(Wait.long);
    await anyCcdPage.clickSubmit();
    await browser.manage().window().maximize();
  }

  async selectHearing() {
    await element(by.id('selectHearingDetails')).element(by.xpath('//*[@id="selectHearingDetails"]/option[2]')).click();
  }

  async requestDwpHearingRecording() {
    await element(by.id('requestableHearingDetails'))
      .element(by.xpath('//*[@id="requestableHearingDetails"]/option[2]'))
      .click();
  }

  async refuseAppellantHearingRecording(permissionType: string) {
    await anyCcdPage.chooseOptionContainingText('processHearingRecordingRequest_appellant', permissionType);
  }

  async grantRequestDwpHearingRecording(permissionType: string) {
    await anyCcdPage.chooseOptionContainingText('processHearingRecordingRequest_dwp', permissionType);
  }
}
