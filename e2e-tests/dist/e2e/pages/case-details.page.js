"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaseDetailsPage = void 0;
const protractor_1 = require("protractor");
const any_ccd_page_1 = require("./any-ccd.page");
const any_ccd_form_page_1 = require("./any-ccd-form.page");
const ordinal_to_cardinal_1 = require("../helpers/ordinal-to-cardinal");
const anyCcdFormPage = new any_ccd_form_page_1.AnyCcdFormPage();
class CaseDetailsPage extends any_ccd_page_1.AnyCcdPage {
    async doNextStep(actionItem) {
        const locator = protractor_1.by.xpath('.//label[@class="form-label" and normalize-space()="Next step"]/ancestor::ccd-event-trigger');
        await this.waitForElement(locator);
        await anyCcdFormPage.setFieldValueWithinContainer((0, protractor_1.element)(locator), actionItem);
    }
    async isCollectionItemFieldValueDisplayed(collectionLabel, collectionItemNumber, fieldLabel, fieldValue) {
        try {
            const collectionItemContainer = await this.findCollectionItemContainer(collectionLabel, collectionItemNumber);
            if ((await collectionItemContainer.getTagName()) === 'ccd-read-complex-field-table') {
                const fieldContainer = await collectionItemContainer
                    .all(protractor_1.by.xpath(`.//th/span[normalize-space()="${fieldLabel}"]/../..`))
                    .first();
                return await fieldContainer.element(protractor_1.by.xpath(`.//td/span[normalize-space()="${fieldValue}"]`)).isDisplayed();
            }
            return await collectionItemContainer
                .all(protractor_1.by.xpath(`.//*[normalize-space()="${fieldValue}"]`))
                .last()
                .isDisplayed();
        }
        catch (error) {
            return false;
        }
    }
    async addEnvelopeDataItems(journeyClassification, poBox, poBoxJurisdiction, envelopeId) {
        await (0, protractor_1.element)(protractor_1.by.id('journeyClassification')).sendKeys(journeyClassification);
        await (0, protractor_1.element)(protractor_1.by.id('poBox')).sendKeys(poBox);
        await (0, protractor_1.element)(protractor_1.by.id('poBoxJurisdiction')).sendKeys(poBoxJurisdiction);
        await (0, protractor_1.element)(protractor_1.by.id('envelopeId')).sendKeys(envelopeId);
    }
    async addDateItems(dateType) {
        await protractor_1.browser.driver.sleep(100);
        const today = new Date();
        await (0, protractor_1.element)(protractor_1.by.id(`${dateType}-day`)).sendKeys(today.getDay() + 1);
        await (0, protractor_1.element)(protractor_1.by.id(`${dateType}-month`)).sendKeys(today.getMonth() + 1);
        await (0, protractor_1.element)(protractor_1.by.id(`${dateType}-year`)).sendKeys(today.getFullYear() - 10);
        await (0, protractor_1.element)(protractor_1.by.id(`${dateType}-hour`)).sendKeys(today.getHours());
        await (0, protractor_1.element)(protractor_1.by.id(`${dateType}-minute`)).sendKeys(today.getMinutes());
        await (0, protractor_1.element)(protractor_1.by.id(`${dateType}-second`)).sendKeys(today.getSeconds());
        await protractor_1.browser.driver.sleep(100);
    }
    async addReasonAndDate(dateType) {
        await (0, protractor_1.element)(protractor_1.by.id('notListableProvideReasons')).sendKeys('reason for not listable goes here');
        await this.clickContinue();
        await this.addFutureDate(dateType);
    }
    async addFutureDate(dateType) {
        const tomorrow = new Date();
        tomorrow.setDate(new Date().getDate() + 1);
        await this.addDate(dateType, tomorrow);
        await this.clickContinue();
    }
    async addPastDate(dateType) {
        const tomorrow = new Date();
        tomorrow.setDate(new Date().getDate() - 1);
        await this.addDate(dateType, tomorrow);
    }
    async addDate(dateType, tomorrow) {
        await protractor_1.browser.sleep(1000);
        await (0, protractor_1.element)(protractor_1.by.id(`${dateType}-day`)).sendKeys(tomorrow.getDate());
        await (0, protractor_1.element)(protractor_1.by.id(`${dateType}-month`)).sendKeys(tomorrow.getMonth() + 1);
        await (0, protractor_1.element)(protractor_1.by.id(`${dateType}-year`)).sendKeys(tomorrow.getFullYear());
    }
    async addDayItems(dateType) {
        await protractor_1.browser.driver.sleep(100);
        const today = new Date();
        today.setDate(new Date().getDate() - 1);
        await (0, protractor_1.element)(protractor_1.by.id(`${dateType}-day`)).clear();
        await (0, protractor_1.element)(protractor_1.by.id(`${dateType}-day`)).sendKeys(today.getDate());
        await (0, protractor_1.element)(protractor_1.by.id(`${dateType}-month`)).clear();
        await (0, protractor_1.element)(protractor_1.by.id(`${dateType}-month`)).sendKeys(today.getMonth() + 1);
        if (dateType === 'writeFinalDecisionEndDate') {
            await (0, protractor_1.element)(protractor_1.by.id(`${dateType}-year`)).clear();
            await (0, protractor_1.element)(protractor_1.by.id(`${dateType}-year`)).sendKeys(today.getFullYear() + 1);
        }
        else {
            await (0, protractor_1.element)(protractor_1.by.id(`${dateType}-year`)).clear();
            await (0, protractor_1.element)(protractor_1.by.id(`${dateType}-year`)).sendKeys(today.getFullYear());
        }
        await protractor_1.browser.driver.sleep(100);
    }
    async addFormType(formType) {
        await (0, protractor_1.element)(protractor_1.by.id('formType')).sendKeys(formType);
    }
    async findCollectionContainer(collectionLabel) {
        return protractor_1.element
            .all(protractor_1.by.xpath(`//div[normalize-space()="${collectionLabel}"]/../..//table[@class="collection-field-table"]`))
            .first();
    }
    async findCollectionItemContainer(collectionLabel, collectionItemNumber) {
        const cardinalNumber = typeof collectionItemNumber === 'number'
            ? collectionItemNumber
            : ordinal_to_cardinal_1.OrdinalToCardinal.convertWordToNumber(collectionItemNumber);
        const collectionContainer = await this.findCollectionContainer(collectionLabel);
        if (await collectionContainer.$$('ccd-read-complex-field').isPresent()) {
            const collectionItemLabel = `${collectionLabel} ${cardinalNumber}`;
            return collectionContainer
                .all(protractor_1.by.xpath(`.//dt/span[normalize-space()="${collectionItemLabel}"]/ancestor::ccd-read-complex-field-table`))
                .first();
        }
        return (await collectionContainer.all(protractor_1.by.xpath('.//ccd-field-read'))).get(cardinalNumber - 1);
    }
}
exports.CaseDetailsPage = CaseDetailsPage;
//# sourceMappingURL=case-details.page.js.map