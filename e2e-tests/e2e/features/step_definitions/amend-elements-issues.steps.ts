import { When, Then } from '@cucumber/cucumber';
import { AnyCcdFormPage } from '../../pages/any-ccd-form.page';
import { expect } from 'chai';

const anyCcdPage = new AnyCcdFormPage();

When('I select {string} and {string} Elements', async function (string, string2) {
  await anyCcdPage.clickElementById('elementsDisputedList-housing');
  await anyCcdPage.clickElementById('elementsDisputedList-childcare');
  await anyCcdPage.clickContinue();
});

When('I add issue codes for respective elements', async function () {
  expect(await anyCcdPage.pageHeadingContains('Issue codes')).to.equal(true);
  await anyCcdPage.addNewCollectionItem('Housing');
  await anyCcdPage.selectHousingIssueCode();
  await anyCcdPage.addNewCollectionItem('Childcare');
  await anyCcdPage.selectChildcareIssueCode();
  await anyCcdPage.clickContinue();
});

Then('the Amend elements event should be seen in "History" tab', async function () {
  const events = await anyCcdPage.getHistoryEvents();
  expect(events).to.include('Amend elements/issues');
});

Then('I should see the choose elements and issue code within "Elements and issues" tab', async function () {
  await anyCcdPage.clickTab('Elements and issues');
  expect(await anyCcdPage.contentContains('Housing')).to.equal(true);
  expect(await anyCcdPage.contentContains('Childcare')).to.equal(true);
});
