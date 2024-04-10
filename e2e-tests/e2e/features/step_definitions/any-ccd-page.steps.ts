import { AnyCcdPage } from '../../pages/any-ccd.page';
import { Given, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import { browser } from 'protractor';
import { Logger } from '@hmcts/nodejs-logging';
import { Wait } from '../../enums/wait';

const logger = Logger.getLogger('any-ccd-page.steps');

const anyCcdPage = new AnyCcdPage();

Given('I wait {string} seconds', async function (number) {
  await browser.sleep(number * 1000);
});

Then('I should see {string} as a case field', async function (value: string) {
  await anyCcdPage.clickTab('Summary');
  const titleVal = await anyCcdPage.getTitleAttribute();
  logger.info(titleVal);
  expect(titleVal).to.contain(value);
});

Then('the {string} tab is seen with {string} content', async function (tabName: string, tabContent: string) {
  await browser.manage().window().maximize();
  await anyCcdPage.clickTab(tabName);
  expect(await anyCcdPage.contentContains(tabContent)).to.equal(true);
});

Then('I should see uploaded file within Unprocessed correspondence tab', async function () {
  await anyCcdPage.reloadPage();
  await anyCcdPage.clickTab('Unprocessed Correspondence');
  await browser.sleep(Wait.short);
  await anyCcdPage.verifyTextOnPageUsingXpath('//div/ccd-read-fixed-list-field/span', 'Other');
  await anyCcdPage.verifyTextOnPageUsingXpath('//div/ccd-read-document-field/a', 'issue1.pdf');
});
