import { AnyCcdFormPage } from '../../pages/any-ccd-form.page';
import { When, Then } from '@cucumber/cucumber';
import { expect, assert } from 'chai';
import { CaseDetailsPage } from '../../pages/case-details.page';

const anyCcdFormPage = new AnyCcdFormPage();
const caseDetailsPage = new CaseDetailsPage();

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

When('I select {string} to include a financial panel member for hearing', async function (action) {
  await anyCcdFormPage.clickElementById(`isFqpmRequired_${action}`);
  await anyCcdFormPage.clickSubmit();
  expect(await anyCcdFormPage.pageHeadingContains('Confirm panel composition')).to.equal(true);
  await anyCcdFormPage.scrollBar("//button[@type='submit']");
});

Then('{string} tab should contain {string} value for {string} field', async function (tabName, fieldValue, fieldName) {
  await anyCcdFormPage.clickTab(tabName);
  await delay(10000);
  await caseDetailsPage.getFieldValue(fieldName).then(function (actText) {
    assert.equal(actText, fieldValue);
  });
});
