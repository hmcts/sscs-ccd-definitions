import { AnyCcdPage } from '../../pages/any-ccd.page';
import { AnyCcdFormPage } from '../../pages/any-ccd-form.page';
import { CaseDetailsPage } from '../../pages/case-details.page';
import { Given, When } from '@cucumber/cucumber';
import { expect } from 'chai';

const anyCcdPage = new AnyCcdPage();
const anyCcdFormPage = new AnyCcdFormPage();
const caseDetailsPage = new CaseDetailsPage();

Given('I add other party data', async function () {
  await anyCcdPage.clickAddNew();
  await anyCcdFormPage.fillValues('otherParties_0_name_title', 'Mr');
  await anyCcdFormPage.fillValues('otherParties_0_name_firstName', 'Other');
  await anyCcdFormPage.fillValues('otherParties_0_name_lastName', 'Tester');
  await anyCcdFormPage.fillValues('otherParties_0_address_line1', '101, test');
  await anyCcdFormPage.fillValues('otherParties_0_address_town', 'test');
  await anyCcdFormPage.fillValues('otherParties_0_address_postcode', 'TS2 2ST');
  await anyCcdFormPage.chooseOptionContainingText('otherParties_0_role_name', 'Paying parent');
  await anyCcdFormPage.clickElementById('otherParties_0_confidentialityRequired_No');
  await anyCcdFormPage.clickElementById('otherParties_0_unacceptableCustomerBehaviour_No');
  await anyCcdFormPage.clickElementById('otherParties_0_hearingSubtype_wantsHearingTypeFaceToFace_Yes');
  await anyCcdFormPage.clickElementById('otherParties_0_isAppointee_No');
  await anyCcdFormPage.clickElementById('otherParties_0_rep_hasRepresentative_No');
  await anyCcdPage.clickSubmit();
  await anyCcdPage.clickSubmit();
  await caseDetailsPage.reloadPage();
});

Given('I add taxCredit other party data', async function () {
  await anyCcdPage.clickAddNew();
  await anyCcdFormPage.fillValues('otherParties_0_name_title', 'Mr');
  await anyCcdFormPage.fillValues('otherParties_0_name_firstName', 'Other');
  await anyCcdFormPage.fillValues('otherParties_0_name_lastName', 'Tester');
  await anyCcdFormPage.fillValues('otherParties_0_address_line1', '101, test');
  await anyCcdFormPage.fillValues('otherParties_0_address_town', 'test');
  await anyCcdFormPage.fillValues('otherParties_0_address_postcode', 'TS2 2ST');
  await anyCcdFormPage.clickElementById('otherParties_0_confidentialityRequired_No');
  await anyCcdFormPage.clickElementById('otherParties_0_unacceptableCustomerBehaviour_No');
  await anyCcdFormPage.clickElementById('otherParties_0_hearingSubtype_wantsHearingTypeFaceToFace_Yes');
  await anyCcdFormPage.clickElementById('otherParties_0_isAppointee_No');
  await anyCcdFormPage.clickElementById('otherParties_0_rep_hasRepresentative_No');
  await anyCcdPage.clickSubmit();
  await anyCcdPage.clickSubmit();
  await caseDetailsPage.reloadPage();
});

When('I select Confidentiality Status as {word}', async function (confidentialityStatus: string) {
  await anyCcdPage.clickElementById(`appeal_appellant_confidentialityRequired_${confidentialityStatus}`);
  await anyCcdPage.fillValues('appeal_mrnDetails_dwpIssuingOffice', 'Tax Credit Office');
  await anyCcdPage.clickSubmit();
  await anyCcdPage.clickSubmit();
  const errors = await anyCcdPage.numberOfCcdErrorMessages();
  expect(errors).to.equal(0);
});
