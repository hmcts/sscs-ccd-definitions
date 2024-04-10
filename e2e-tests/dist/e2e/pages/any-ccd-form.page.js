"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnyCcdFormPage = void 0;
const protractor_1 = require("protractor");
const any_ccd_page_1 = require("./any-ccd.page");
const form_filler_1 = require("../helpers/form-filler");
const ordinal_to_cardinal_1 = require("../helpers/ordinal-to-cardinal");
const moment_1 = __importDefault(require("moment"));
const anyCcdPage = new any_ccd_page_1.AnyCcdPage();
class AnyCcdFormPage extends any_ccd_page_1.AnyCcdPage {
    formFiller = new form_filler_1.FormFiller();
    async addNewCollectionItem(collectionLabel) {
        await anyCcdPage.clickLastElement('button', 'Add new', collectionLabel);
    }
    async addNewOCRCollectionItem() {
        await anyCcdPage.scrollBar('//*[@id="scanOCRData"]/div/button');
    }
    async setValueByElementId(key, value) {
        await (0, protractor_1.element)(protractor_1.by.id(key)).sendKeys(value);
    }
    async setTextFiledValueNull(key) {
        await (0, protractor_1.element)(protractor_1.by.id(key)).clear();
    }
    async setCollectionItemFieldValue(collectionLabel, collectionItemNumber, fieldLabel, fieldValue) {
        const collectionItemContainer = await this.findCollectionItemContainer(collectionLabel, collectionItemNumber);
        const fieldContainer = await this.findFieldContainer(collectionItemContainer, fieldLabel);
        await this.setFieldValueWithinContainer(fieldContainer, fieldValue);
    }
    async findCollectionContainer(collectionLabel) {
        const locator = protractor_1.by.xpath(`//ccd-write-collection-field//h2[normalize-space()="${collectionLabel}" or normalize-space()="${collectionLabel} (Optional)"]/ancestor::ccd-write-collection-field`);
        await this.waitForElements(locator);
        return protractor_1.element.all(locator).first();
    }
    async findCollectionItemContainer(collectionLabel, collectionItemNumber) {
        const cardinalNumber = typeof collectionItemNumber === 'number'
            ? collectionItemNumber
            : ordinal_to_cardinal_1.OrdinalToCardinal.convertWordToNumber(collectionItemNumber);
        let collectionItemLabel = collectionLabel;
        if (cardinalNumber > 1) {
            collectionItemLabel += ` ${cardinalNumber}`;
        }
        const collectionContainer = await this.findCollectionContainer(collectionLabel);
        return collectionContainer
            .all(protractor_1.by.xpath(`.//div[@class="collection-title"]//label[normalize-space()="${collectionItemLabel}"]/../../..`))
            .first();
    }
    async findFieldContainer(container, fieldLabel) {
        const fieldWithLabelContainer = container.all(protractor_1.by.xpath(`.//span[@class="form-label" and normalize-space()="${fieldLabel}"]/ancestor::ccd-field-write`));
        if (await fieldWithLabelContainer.isPresent()) {
            return fieldWithLabelContainer.last();
        }
        return container.all(protractor_1.by.xpath('.//ccd-field-write')).last();
    }
    async setFieldValueWithinContainer(fieldContainer, fieldValue) {
        // the order can be important, for example ccd-write-address-field must be before
        // ccd-write-text-field to allow addresses to be selected from the AddressUK complex type
        if (await fieldContainer.$$('ccd-write-address-field').isPresent()) {
            const optionElement = await fieldContainer.element(protractor_1.by.xpath(`.//option[normalize-space()="${fieldValue}"]`));
            if (await optionElement.isPresent()) {
                await optionElement.click();
            }
            else {
                await this.formFiller.replaceText(await fieldContainer.all(protractor_1.by.xpath('.//input[@type="text"]')).first(), fieldValue);
            }
        }
        else if (await fieldContainer.$$('ccd-write-date-field').isPresent()) {
            const date = (0, moment_1.default)(fieldValue, 'DD MM YYYY');
            await this.formFiller.replaceText(await fieldContainer.element(protractor_1.by.xpath('.//input[@type="number" and contains(@name, "-day")]')), date.date());
            await this.formFiller.replaceText(await fieldContainer.element(protractor_1.by.xpath('.//input[@type="number" and contains(@name, "-month")]')), date.month() + 1);
            await this.formFiller.replaceText(await fieldContainer.element(protractor_1.by.xpath('.//input[@type="number" and contains(@name, "-year")]')), date.year());
        }
        else if (await fieldContainer.$$('ccd-write-fixed-list-field').isPresent()) {
            await fieldContainer.element(protractor_1.by.xpath(`.//option[normalize-space()="${fieldValue}"]`)).click();
        }
        else if (await fieldContainer.$$('ccd-write-multi-select-list-field').isPresent()) {
            await fieldContainer
                .element(protractor_1.by.xpath(`.//label[normalize-space()="${fieldValue}"]/../input[@type="checkbox"]`))
                .click();
        }
        else if (await fieldContainer.$$('ccd-write-text-field').isPresent()) {
            await this.formFiller.replaceText(await fieldContainer.element(protractor_1.by.xpath('.//input[@type="text"]')), fieldValue);
        }
        else if (await fieldContainer.$$('ccd-write-text-area-field').isPresent()) {
            await this.formFiller.replaceText(await fieldContainer.element(protractor_1.by.xpath('.//textarea[@id="writeFinalDecisionReasons_value"]')), fieldValue);
        }
        else if (await fieldContainer.$$('ccd-write-yes-no-field').isPresent()) {
            await fieldContainer.element(protractor_1.by.xpath(`.//label[normalize-space()="${fieldValue}"]/../input`)).click();
        }
        else if (await fieldContainer.$$('select.ccd-dropdown').isPresent()) {
            await fieldContainer.$$('select.ccd-dropdown').click();
            await fieldContainer.element(protractor_1.by.xpath(`//*[contains(text(),"${fieldValue}")]`)).click();
        }
        else {
            throw new Error('Unsupported field type');
        }
    }
    async setCreateCaseFieldValue(fieldLabel, fieldValue) {
        const fieldContainer = await protractor_1.element
            .all(protractor_1.by.xpath(`.//label[@class="form-label" and normalize-space()="${fieldLabel}"]/ancestor::ccd-create-case-filters`))
            .last();
        await this.setFieldValueWithinContainer(fieldContainer, fieldValue);
    }
}
exports.AnyCcdFormPage = AnyCcdFormPage;
//# sourceMappingURL=any-ccd-form.page.js.map