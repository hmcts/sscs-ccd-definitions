import { AuthenticationFlow } from '../../flows/authentication.flow';
import { AnyCcdPage } from '../../pages/any-ccd.page';
import { Given } from '@cucumber/cucumber';
import { browser } from 'protractor';

const anyCcdPage = new AnyCcdPage();
const authenticationFlow = new AuthenticationFlow();

Given('I am signed in as a Case Officer', async function () {
  await authenticationFlow.signInAsCaseOfficer();
  await anyCcdPage.waitUntilLoaded();
});

Given('I am signed in as a DWPResponse Writer', async function () {
  await authenticationFlow.signInAsDWPResponseWriter();
  await anyCcdPage.waitUntilLoaded();
});

Given('I am signed in as a Clerk', async function () {
  await authenticationFlow.signInAsClerk();
  await anyCcdPage.waitUntilLoaded();
});

Given('I switch to be a DWPResponse Writer', async function () {
  const currentUrl = await browser.driver.getCurrentUrl();
  await authenticationFlow.signInAsDWPResponseWriter();
  await anyCcdPage.waitUntilLoaded();
  await anyCcdPage.get(currentUrl);
});

Given('I switch to be a Case Officer', async function () {
  const currentUrl = await browser.driver.getCurrentUrl();
  await authenticationFlow.signInAsCaseOfficer();
  await anyCcdPage.waitUntilLoaded();
  await anyCcdPage.get(currentUrl);
});

Given('I switch to be a Judge', async function () {
  const currentUrl = await browser.driver.getCurrentUrl();
  await authenticationFlow.signInAsJudge();
  await anyCcdPage.waitUntilLoaded();
  await anyCcdPage.get(currentUrl);
});
