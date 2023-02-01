import { browser, by, element } from 'protractor';
import { AnyPage } from './any.page';

export class FurtherEvidencePage extends AnyPage {
  async enterFileName(inputElement: string, fileName: string) {
    await element(by.id(inputElement)).sendKeys(fileName);
  }

  async enterScannedDate(date: string, month: string, year: string) {
    await element(by.id('scannedDate-day')).sendKeys(date);
    await browser.driver.sleep(1000);
    await element(by.id('scannedDate-month')).sendKeys(month);
    await browser.driver.sleep(1000);
    await element(by.id('scannedDate-year')).sendKeys(year);
  }
}
