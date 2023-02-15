import { by, element } from 'protractor';
import { expect } from 'chai';
import { AnyPage } from './any.page';
import { AnyCcdPage } from './any-ccd.page';

const anyCcdPage = new AnyCcdPage();

export class PostponementRequestPage extends AnyPage {
  async enterPostponementRequestDetails() {
    await element(by.id('postponementRequestDetails')).sendKeys(
      'We would like to delay the hearing, since the Judge cannot attend this day.'
    );
    await anyCcdPage.clickContinue();
    await anyCcdPage.clickContinue();
    await anyCcdPage.clickSubmit();
  }

  async actionPostponementRequest(action: string) {
    await anyCcdPage.chooseOptionContainingText('actionPostponementRequestSelected', action);
    if (action === 'Send to Judge') {
      await element(by.id('postponementRequestDetails')).sendKeys(
        'We would like to delay the hearing, since the Judge cannot attend this day.'
      );
    } else {
      await element(by.id('bodyContent')).sendKeys(
        'We would like to delay the hearing, since the Judge cannot attend this day.'
      );
      await element(by.id('reserveTo.reservedJudge')).sendKeys('Reserve to judge');
      await element(by.id('signedBy')).sendKeys('Mr Penworthy');
      await element(by.id('signedRole')).sendKeys('CTSC');
      if (action === 'Grant Postponement') {
        await anyCcdPage.chooseOptionContainingText('listingOption', 'Ready to List');
      }
      await anyCcdPage.clickContinue();
      await anyCcdPage.waitForElement(by.xpath('//span[contains(text(),"Preview Document")]'));
    }
    await anyCcdPage.clickContinue();
    await anyCcdPage.clickSubmit();
  }

  async verifyInterlocStatus(action: string) {
    if (action === 'Send to Judge') {
      await anyCcdPage.clickTab('History');
      expect(await anyCcdPage.contentContains('Review by Judge')).to.equal(true);
    }
  }
}
