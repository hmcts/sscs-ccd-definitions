import { browser, by, element } from 'protractor';
import { AnyPage } from './any.page';
import { AnyCcdPage } from './any-ccd.page';

import * as remote from 'selenium-webdriver/remote';

const anyCcdPage = new AnyCcdPage();
export class AdjournmentPage extends AnyPage {
  async uploadAdjournmentNotice() {
    await browser.waitForAngular();
    browser.setFileDetector(new remote.FileDetector());
    await anyCcdPage.uploadFile('adjournCasePreviewDocument', 'issue1.pdf');
  }

  async addVenue(day: string, month: string, year: string) {
    await element(by.id('hearings_0_venue_name')).sendKeys('Fox Court');
    await element(by.id('hearings_0_venue_address_line1')).sendKeys('Fox Court');
    await element(by.id('hearings_0_venue_address_line2')).sendKeys('4th Floor');
    await element(by.id('hearings_0_venue_address_line3')).sendKeys('30 Brooke Street');

    await element(by.id('hearings_0_venue_address_town')).sendKeys('Town');
    await element(by.id('hearings_0_venue_address_county')).sendKeys('County');
    await element(by.id('hearings_0_venue_address_postcode')).sendKeys('EC1N 7RS');
    await element(by.id('hearings_0_venue_address_country')).sendKeys('UK');
    await element(by.id('hearings_0_venue_googleMapLink')).sendKeys(
      'https://www.google.com/maps/place/4th+Floor+30+Brooke+Street+EC1N+7RS/@51.518706,-0.110348'
    );
    await element(by.id('hearings_0_judge')).sendKeys('Judge');
    await element(by.id('hearingDate-day')).sendKeys(day);
    await element(by.id('hearingDate-month')).sendKeys(month);
    await element(by.id('hearingDate-year')).sendKeys(year);
    await element(by.id('hearings_0_time')).sendKeys('13:00');

    await element(by.id('postponedDate-day')).sendKeys('20');
    await element(by.id('postponedDate-month')).sendKeys('10');
    await element(by.id('postponedDate-year')).sendKeys('2021');
    await anyCcdPage.clickElementById('hearings_0_adjourned_Yes');

    await element(by.id('adjournedDate-day')).sendKeys('20');
    await element(by.id('adjournedDate-month')).sendKeys('10');
    await element(by.id('adjournedDate-year')).sendKeys('2021');

    await element(by.id('hearings_0_hearingId')).sendKeys('12345');

    await element(by.id('eventDate-day')).sendKeys('20');
    await element(by.id('eventDate-month')).sendKeys('02');
    await element(by.id('eventDate-year')).sendKeys('2022');

    await element(by.id('hearings_0_venueId')).sendKeys('142');

    await element(by.id('hearingRequested-day')).sendKeys('21');
    await element(by.id('hearingRequested-month')).sendKeys('02');
    await element(by.id('hearingRequested-year')).sendKeys('2022');

    await element(by.id('hearings_0_versionNumber')).sendKeys('123');
    await anyCcdPage.chooseOptionContainingText('hearings_0_hearingStatus', 'Hearing has been Listed');

    await element(by.id('start-day')).sendKeys('22');
    await element(by.id('start-month')).sendKeys('02');
    await element(by.id('start-year')).sendKeys('2022');

    await element(by.id('end-day')).sendKeys('22');
    await element(by.id('end-month')).sendKeys('02');
    await element(by.id('end-year')).sendKeys('2022');

    await element(by.id('hearings_0_epimsId')).sendKeys('372653');

    await anyCcdPage.clickContinue();
    await anyCcdPage.clickSubmit();
  }

  async addPanelMembers() {
    await element(by.id('adjournCaseDisabilityQualifiedPanelMemberName')).sendKeys('Disability Member');
    await element(by.id('adjournCaseMedicallyQualifiedPanelMemberName')).sendKeys('Medically Member');
  }

  async addReasons() {
    await anyCcdPage.clickAddNew();
    await element(by.id('adjournCaseReasons_0')).sendKeys('Appellant not available');
  }

  async setAdjournCaseReasonsText() {
    await anyCcdPage.clickAddNew();
    await anyCcdPage.setText("//textarea[@rows='3']", 'I am very busy so i cannot');
  }
}
