import { AnyCcdPage } from '../../pages/any-ccd.page';
import { When } from '@cucumber/cucumber';

const anyCcdPage = new AnyCcdPage();

When('I click submit withdrawal {string}', async function (action) {
  await anyCcdPage.clickContinue();
});
