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

Given('I am signed in as a Hearing Case Officer', async function () {
  await authenticationFlow.signInAsHearingCaseOfficer();
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
  await browser.sleep(100);
  const currentUrl = await browser.driver.getCurrentUrl();
  await authenticationFlow.signInAsDWPResponseWriter();
  await browser.sleep(100);
  await anyCcdPage.waitUntilLoaded();
  await anyCcdPage.get(currentUrl);
});

Given('I switch to be a Case Officer', async function () {
  await browser.sleep(100);
  const currentUrl = await browser.driver.getCurrentUrl();
  await authenticationFlow.signInAsCaseOfficer();
  await browser.sleep(100);
  await anyCcdPage.waitUntilLoaded();
  await anyCcdPage.get(currentUrl);
});

Given('I switch to be a Judge', async function () {
  await browser.sleep(100);
  const currentUrl = await browser.driver.getCurrentUrl();
  await authenticationFlow.signInAsJudge();
  await browser.sleep(100);
  await anyCcdPage.waitUntilLoaded();
  await anyCcdPage.get(currentUrl);
  await browser.sleep(5000);
});
