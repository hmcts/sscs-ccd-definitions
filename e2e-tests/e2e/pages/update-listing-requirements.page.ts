import { browser } from 'protractor';
import { AnyPage } from './any.page';
import { expect } from 'chai';
import { AnyCcdPage } from './any-ccd.page';

const anyCcdPage = new AnyCcdPage();

export class UpdateListingRequirementsPage extends AnyPage {
  async updateHearingChannel(video: string) {
    await browser.sleep(1500);
    expect(await anyCcdPage.pageHeadingContains('Update Listing Requirements')).to.equal(true);
    await browser.sleep(1500);
    await anyCcdPage.chooseOptionContainingText('overrideFields_appellantHearingChannel', video);
    await browser.sleep(1500);
    await anyCcdPage.clickContinue();
  }

  async updatePOOfficerAttending(yes: string) {
    await browser.sleep(1500);
    await anyCcdPage.clickElementById(`overrideFields_poToAttend_${yes}`);
    await browser.sleep(1500);
    await anyCcdPage.clickContinue();
  }

  async amendReasonForUpdate() {
    expect(await anyCcdPage.pageHeadingContains('Amend Reason')).to.equal(true);
    await browser.sleep(1500);
    await anyCcdPage.clickElementById('amendReasons-judgereq');
    await browser.sleep(1500);
    await anyCcdPage.clickSubmit();
    await browser.sleep(1500);
    await anyCcdPage.clickSubmit();
  }
}
