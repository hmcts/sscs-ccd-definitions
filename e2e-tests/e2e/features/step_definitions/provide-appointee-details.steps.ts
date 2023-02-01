import { Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import { AnyCcdPage } from '../../pages/any-ccd.page';

const anyCcdPage = new AnyCcdPage();

Then('the case appointee details should be listed in {string} tab', async function (tabName) {
  await anyCcdPage.clickTab(tabName);
  expect(await anyCcdPage.contentContains('AppointeeFirstName')).to.equal(true);
  expect(await anyCcdPage.contentContains('AppointeeLastName')).to.equal(true);
  expect(await anyCcdPage.contentContains('KL335252C')).to.equal(true);
});
