import { AnyCcdPage } from '../../pages/any-ccd.page';
import { Then } from '@cucumber/cucumber';
import { assert } from 'chai';

const anyCcdPage = new AnyCcdPage();

Then(
  '{string} tab should contain {string} value for case management {string} field',
  async function (tabName, fieldValue, fieldName) {
    await anyCcdPage.clickTab(tabName);
    await anyCcdPage.getFieldValue(fieldName).then(function (actText) {
      assert.equal(actText, fieldValue);
    });
  }
);
