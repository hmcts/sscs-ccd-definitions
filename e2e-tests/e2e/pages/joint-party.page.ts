import { by, element } from 'protractor';
import { AnyCcdPage } from './any-ccd.page';

export class JointPartyPage extends AnyCcdPage {
  async addJointPartyDetails() {
    await element(by.id('jointPartyName_title')).sendKeys('Mr');
    await element(by.id('jointPartyName_firstName')).sendKeys('JPFirstName');
    await element(by.id('jointPartyName_lastName')).sendKeys('JPLastName');
    await element(by.id('jointPartyAddressSameAsAppellant-No')).click();
    await element(by.id('jointPartyAddress_line1')).sendKeys('Jp Address line1');
    await element(by.id('jointPartyAddress_line2')).sendKeys('Jp Address line2');
    await element(by.id('jointPartyAddress_town')).sendKeys('Jp Town');
    await element(by.id('jointPartyAddress_county')).sendKeys('Jp County');
    await element(by.id('jointPartyAddress_postcode')).sendKeys('TS1 1ST');

    await element(by.id('jointPartyIdentity_nino')).sendKeys('KL335252C');
    await element(by.xpath('//button[2]')).click();
  }
}
