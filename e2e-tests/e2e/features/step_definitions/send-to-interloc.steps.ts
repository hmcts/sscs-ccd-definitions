import { When } from '@cucumber/cucumber';
import { AnyCcdPage } from '../../pages/any-ccd.page';

const anyCcdPage = new AnyCcdPage();

When('I submit the interloc reason', async function () {
  await anyCcdPage.chooseOptionContainingText('interlocReferralReason', 'Other');
  await anyCcdPage.clickContinue();
  await anyCcdPage.fillNote();
  await anyCcdPage.clickSubmit();
  await anyCcdPage.clickSubmit();
});
