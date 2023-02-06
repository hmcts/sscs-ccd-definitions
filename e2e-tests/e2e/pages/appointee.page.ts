import { by, element } from 'protractor';
import { AnyCcdPage } from './any-ccd.page';

export class AppointeePage extends AnyCcdPage {
  async addAppointeeDetails() {
    await element(by.id('appeal_appellant_appointee_name_title')).sendKeys('Mr');
    await element(by.id('appeal_appellant_appointee_name_firstName')).sendKeys('AppointeeFirstName');
    await element(by.id('appeal_appellant_appointee_name_lastName')).sendKeys('AppointeeLastName');

    await element(by.id('dob-day')).sendKeys('1');
    await element(by.id('dob-month')).sendKeys('1');
    await element(by.id('dob-year')).sendKeys('1990');

    await element(by.id('appeal_appellant_appointee_identity_nino')).sendKeys('KL335252C');

    await element(by.id('appeal_appellant_appointee_address_line1')).sendKeys('line1');
    await element(by.id('appeal_appellant_appointee_address_line2')).sendKeys('line2');
    await element(by.id('appeal_appellant_appointee_address_town')).sendKeys('town');
    await element(by.id('appeal_appellant_appointee_address_county')).sendKeys('UK');
    await element(by.id('appeal_appellant_appointee_address_postcode')).sendKeys('TS1 1ST');

    await element(by.id('appeal_appellant_appointee_contact_phone')).sendKeys('0123456789');
    await element(by.id('appeal_appellant_appointee_contact_mobile')).sendKeys('0123456789');
    await element(by.id('appeal_appellant_appointee_contact_email')).sendKeys('abc@abcxyz.com');
  }
}
