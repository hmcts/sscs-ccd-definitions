import { AnyCcdPage } from '../../pages/any-ccd.page';
import { AnyCcdFormPage } from '../../pages/any-ccd-form.page';
import { Then } from '@cucumber/cucumber';

const anyCcdPage = new AnyCcdPage();
const anyCcdFormPage = new AnyCcdFormPage();

Then('I should update case with a valid nino', async function () {
  await anyCcdFormPage.setTextFiledValueNull('appeal_appellant_identity_nino');
  await anyCcdFormPage.setValueByElementId('appeal_appellant_identity_nino', 'SK982165A');

  await anyCcdPage.clickSubmit();
  await anyCcdPage.clickSubmit();
});

Then('I should update case with a valid nino and confidentiality option', async function () {
  await anyCcdFormPage.setTextFiledValueNull('appeal_mrnDetails_dwpIssuingOffice');
  await anyCcdFormPage.setValueByElementId('appeal_mrnDetails_dwpIssuingOffice', 'Tax Credit Office');
  await anyCcdFormPage.setTextFiledValueNull('appeal_appellant_identity_nino');
  await anyCcdFormPage.setValueByElementId('appeal_appellant_identity_nino', 'SK982165A');
  await anyCcdFormPage.clickElementById('appeal_appellant_confidentialityRequired_No');

  await anyCcdPage.clickContinue();
  await anyCcdPage.clickSubmit();
});
