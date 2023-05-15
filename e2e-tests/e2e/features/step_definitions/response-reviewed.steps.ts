import { AnyCcdPage } from '../../pages/any-ccd.page';
import { When } from '@cucumber/cucumber';
import { expect } from 'chai';
import { ResponseReviewedPage } from '../../pages/response-reviewed.page';
const anyCcdPage = new AnyCcdPage();
const responseReviewedPage = new ResponseReviewedPage();

When('I choose Requires Interlocutory Review No {string}', async function (action) {
  await anyCcdPage.scrollBar('//input[@id="isInterlocRequired_No"]');
  await anyCcdPage.clickContinue();
});

When('I submit {string}', async function (action) {
  // await anyCcdPage.clickContinue();
  expect(await anyCcdPage.pageHeadingContains(action)).to.equal(true);
  await anyCcdPage.clickSubmit();
  await anyCcdPage.waitForTabsToLoad();
});

When('I review the UC received Response', async function () {
  await responseReviewedPage.reviewUCResponse();
});
