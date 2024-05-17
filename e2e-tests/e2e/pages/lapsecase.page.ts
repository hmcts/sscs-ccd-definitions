import { browser } from 'protractor';
import { AnyPage } from './any.page';
import { AnyCcdPage } from './any-ccd.page';
import { expect } from 'chai';
import * as remote from 'selenium-webdriver/remote';

const anyCcdPage = new AnyCcdPage();
export class LapseCasePage extends AnyPage {
  async uploadResponse(action: string) {
    expect(await anyCcdPage.pageHeadingContains('Lapse appeal')).to.equal(true);
    await browser.waitForAngular();

    browser.setFileDetector(new remote.FileDetector());
    await anyCcdPage.uploadFile('dwpLT203_documentLink', 'issue1.pdf');
    await anyCcdPage.uploadFile('dwpLapseLetter_documentLink', 'issue2.pdf');

    await anyCcdPage.chooseOptionContainingText('dwpState', 'No action');
    await anyCcdPage.chooseOptionContainingText('interlocReviewState', 'N/A');
    await anyCcdPage.clickContinue();
  }
}
