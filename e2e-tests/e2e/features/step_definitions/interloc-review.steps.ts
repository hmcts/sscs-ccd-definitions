import { AnyCcdPage } from '../../pages/any-ccd.page';
import { When } from '@cucumber/cucumber';

const anyCcdPage = new AnyCcdPage();

When('I choose Requires Interlocutory Review Yes {string}', async function (action) {
  await anyCcdPage.clickElementById('isInterlocRequired_Yes');
  await anyCcdPage.chooseOptionContainingText('dwpOriginatingOffice', 'DWP PIP (1)');
  await anyCcdPage.chooseOptionContainingText('dwpPresentingOffice', 'DWP PIP (1)');
  await anyCcdPage.chooseOptionContainingText('selectWhoReviewsCase', 'Review by Judge');
  await anyCcdPage.chooseOptionContainingText('interlocReferralReason', 'Complex Case');
  await anyCcdPage.fillNote();
  await anyCcdPage.clickSubmit();
});

When('I set FTA State to No action {string}', async function (action) {
  await anyCcdPage.chooseOptionContainingText('dwpState', 'No action');
  await anyCcdPage.clickSubmit();
});
