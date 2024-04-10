import { Then, When } from '@cucumber/cucumber';
import { AnyCcdPage } from '../../pages/any-ccd.page';
import { expect } from 'chai';
const anyCcdPage = new AnyCcdPage();

When('resend only to appellant and not to representative', async function () {
  await anyCcdPage.clickElementById('resendToAppellant_Yes');
  await anyCcdPage.clickElementById('resendToRepresentative_No');
  await anyCcdPage.clickSubmit();
});

Then('the reissue document event should be seen in “History” tab', async function () {
  const events = await anyCcdPage.getHistoryEvents();
  expect(events).to.include('Reissue document');
});
