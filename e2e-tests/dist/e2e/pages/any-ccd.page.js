"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnyCcdPage = void 0;
const protractor_1 = require("protractor");
const any_page_1 = require("./any.page");
const wait_1 = require("../enums/wait");
const chai_1 = require("chai");
const axe_runner_1 = require("../helpers/axe-runner");
const nodejs_logging_1 = require("@hmcts/nodejs-logging");
const path_1 = __importDefault(require("path"));
const config_1 = __importDefault(require("config"));
const remote = __importStar(require("selenium-webdriver/remote"));
const logger = nodejs_logging_1.Logger.getLogger('any-ccd.pages');
const crossBrowserTest = Boolean(config_1.default.get('tests.crossBrowser'));
class AnyCcdPage extends any_page_1.AnyPage {
    async clickContinue() {
        const clickedElement = this.clickButton('Continue');
        await protractor_1.browser.waitForAngular();
        return clickedElement;
    }
    async clickSubmit() {
        const clickedElement = this.clickButton('Submit');
        await protractor_1.browser.waitForAngular();
        return clickedElement;
    }
    async clickAddNew() {
        return this.clickButton('Add new');
    }
    async clickNextStep() {
        return this.clickElementByXpath('//ccd-event-trigger//button[@type="submit"]');
    }
    async clickCreateCase() {
        return this.clickElementByXpath('//a[contains(@class,"hmcts-primary-navigation") and contains(text(), "Create case")]');
    }
    async clickIgnoreWarning() {
        return this.clickButton('Ignore Warning and Go');
    }
    async clickElementById(elementId) {
        return this.clickAction(protractor_1.by.id(elementId));
    }
    async clickElementByCss(elementId) {
        return this.clickAction(protractor_1.by.css(elementId));
    }
    async clickButton(text) {
        return this.clickElement('button', text);
    }
    async clickLink(text) {
        return this.clickElement('a', text);
    }
    async clickTab(tabTitle) {
        await this.waitForTabsToLoad();
        return this.clickElement('div', tabTitle);
    }
    async clickElement(elementType, text) {
        return this.clickElementByXpath(`//${elementType}[normalize-space()="${text}"]`);
    }
    async clickElementByXpath(xpath) {
        return this.clickAction(protractor_1.by.xpath(xpath));
    }
    async clickLastElement(elementType, text, collectionLabel) {
        const elementXpath = `//ccd-write-collection-field//div[h2[normalize-space()="${collectionLabel}" or normalize-space()="${collectionLabel} (Optional)"]]/${elementType}[text()="${text}"]`;
        return this.clickLastAction(protractor_1.by.xpath(elementXpath));
    }
    async chooseOptionByElementId(elementId, option) {
        await (0, protractor_1.element)(protractor_1.by.id(elementId))
            .element(protractor_1.by.xpath(`.//option[normalize-space()="${option}"]`))
            .click();
    }
    async clickAction(locator) {
        await this.waitForElement(locator);
        const elementFinder = (0, protractor_1.element)(locator);
        await elementFinder.click();
        await this.smartWait(wait_1.Wait.short);
        await this.waitForSpinner();
        return elementFinder;
    }
    async clickLastAction(locator) {
        const elementFinder = protractor_1.element.all(locator).last();
        await this.waitForElement(locator);
        await elementFinder.click();
        await this.smartWait(wait_1.Wait.short);
        await this.waitForSpinner();
        return elementFinder;
    }
    async waitForElement(locator, wait = wait_1.Wait.extended) {
        await protractor_1.browser.wait(protractor_1.until.elementLocated(locator), wait, 'Element Locator Timeout');
    }
    async waitForElements(locator, wait = wait_1.Wait.extended) {
        await protractor_1.browser.wait(protractor_1.until.elementsLocated(locator), wait, 'Elements Locator Timeout');
    }
    async chooseOption(elementId, locator) {
        await protractor_1.browser.sleep(wait_1.Wait.short);
        const choiceLocator = protractor_1.by.id(elementId);
        await (0, protractor_1.element)(choiceLocator).element(locator).click();
        await protractor_1.browser.sleep(wait_1.Wait.short);
    }
    async chooseOptionContainingText(elementId, text) {
        await this.chooseOption(elementId, protractor_1.by.xpath(`//option[normalize-space(text())='${text}']`));
    }
    async chooseOptionByText(elementId, text) {
        await this.chooseOption(elementId, protractor_1.by.xpath(`//option[contains(text(),'${text}')]`));
    }
    async chooseOptionByValue(elementId, value) {
        await this.chooseOption(elementId, protractor_1.by.xpath(`.//option[contains(@value,'${value}')]`));
    }
    async fillValues(elementId, actText) {
        await (0, protractor_1.element)(protractor_1.by.id(elementId)).clear();
        await (0, protractor_1.element)(protractor_1.by.id(elementId)).sendKeys(actText);
    }
    async isFieldValueDisplayed(fieldLabel, fieldValue) {
        await this.waitForElement(protractor_1.by.tagName('mat-tab-group'));
        const locator = await this.getFieldValueLocator(fieldLabel, fieldValue);
        return (0, protractor_1.element)(locator).isPresent();
    }
    async getFieldValueLocator(fieldLabel, fieldValue) {
        let tag = '*';
        const isCcdEventLogPresent = await (0, protractor_1.element)(protractor_1.by.tagName('ccd-event-log')).isPresent();
        const isReadComplexFieldTablePresent = await (0, protractor_1.element)(protractor_1.by.tagName('ccd-read-complex-field-table')).isPresent();
        if (isCcdEventLogPresent || isReadComplexFieldTablePresent) {
            tag = 'span';
        }
        return protractor_1.by.xpath(`//${tag}[normalize-space()="${fieldLabel}"]/../..//td[normalize-space()="${fieldValue}"]`);
    }
    async getTitleAttribute() {
        const ele = (0, protractor_1.element)(protractor_1.by.xpath('//*[@id="isConfidentialCaseLabel"]/dt/ccd-markdown/div/markdown/h2/img'));
        return ele.getAttribute('title');
    }
    getFieldLocator(fieldLabel) {
        return protractor_1.by.xpath(`//*[normalize-space()="${fieldLabel}"]/../../td`);
    }
    async getFieldValue(fieldLabel) {
        return protractor_1.element.all(this.getFieldLocator(fieldLabel)).first().getText();
    }
    async getFieldValues(fieldLabel) {
        return protractor_1.element.all(this.getFieldLocator(fieldLabel)).map(async (elementFinder) => elementFinder.getText());
    }
    async pageHeadingContains(match) {
        try {
            await protractor_1.browser.wait(protractor_1.element
                .all(protractor_1.by.xpath(`//*[self::h1 or self::h2 or self::h3 or self::span][contains(text(), "${match}")]`))
                .isPresent(), wait_1.Wait.extended, 'Page heading did not show in time');
            return true;
        }
        catch (error) {
            return false;
        }
    }
    async getAlertMessage() {
        const locator = protractor_1.by.xpath("//div[contains(@class, 'alert-message')]");
        await this.waitForElement(locator);
        return (0, protractor_1.element)(locator).getText();
    }
    async numberOfCcdErrorMessages() {
        const locator = protractor_1.by.id(`errors`);
        const errors = await protractor_1.element.all(locator).map(async (x) => x.getText());
        return errors.length;
    }
    async getCcdErrorMessages() {
        const locator = protractor_1.by.id(`errors`);
        await this.waitForElements(locator);
        return protractor_1.element.all(locator).map(async (x) => x.getText());
    }
    async waitUntilLoaded() {
        await protractor_1.browser.waitForAngularEnabled(false);
        await protractor_1.browser.waitForAngular();
    }
    async waitForTabsToLoad() {
        await this.waitForElement(protractor_1.by.tagName('mat-tab-header'));
    }
    async reloadPage() {
        await protractor_1.browser.navigate().refresh();
        await this.waitUntilLoaded();
        await protractor_1.browser.sleep(wait_1.Wait.short);
    }
    async selectIssueCode() {
        await (0, protractor_1.element)(protractor_1.by.id('issueCode')).element(protractor_1.by.xpath('//*[@id="issueCode"]/option[3]')).click();
    }
    async selectGeneralIssueCode() {
        await (0, protractor_1.element)(protractor_1.by.id('elementsDisputedGeneral_0_issueCode'))
            .element(protractor_1.by.xpath('//*[@id="elementsDisputedGeneral_0_issueCode"]/option[2]'))
            .click();
    }
    async selectHousingIssueCode() {
        await (0, protractor_1.element)(protractor_1.by.id('elementsDisputedHousing_0_issueCode'))
            .element(protractor_1.by.xpath('//*[@id="elementsDisputedHousing_0_issueCode"]/option[2]'))
            .click();
    }
    async selectChildcareIssueCode() {
        await (0, protractor_1.element)(protractor_1.by.id('elementsDisputedChildCare_0_issueCode'))
            .element(protractor_1.by.xpath('//*[@id="elementsDisputedChildCare_0_issueCode"]/option[2]'))
            .click();
    }
    async getHistoryEvents() {
        await this.clickTab('History');
        const locator = protractor_1.by.xpath('//ccd-event-log-table//*[contains(@class,"event-link")]');
        return protractor_1.element.all(locator).map(async (elementFinder) => elementFinder.getText());
    }
    async elementNotPresent(linkText) {
        const linkPath = `//*[self::button or self::a or self::span][normalize-space()="${linkText}"]`;
        await protractor_1.element.all(protractor_1.by.xpath(linkPath)).then((items) => {
            (0, chai_1.expect)(items.length).to.equal(0);
        });
    }
    async fillNote() {
        await (0, protractor_1.element)(protractor_1.by.id('tempNoteDetail')).sendKeys('This is a test');
    }
    async getCaseFields() {
        return protractor_1.element
            .all(protractor_1.by.xpath('//*[@class="case-field"]//markdown/*'))
            .map(async (elementFinder) => elementFinder.getText());
    }
    async contentContains(match, wait = wait_1.Wait.extended) {
        const contentPath = `//*[` +
            `self::h1 or ` +
            `self::h2 or ` +
            `self::h3 or ` +
            `self::h4 or ` +
            `self::caption or ` +
            `self::label or ` +
            `self::p or ` +
            `self::li                        [contains(text(), "${match}")] or ` + // for bulleted text
            `self::div                       [contains(text(), "${match}")] or ` + // avoid text in child nodes
            `self::ccd-read-date-field       [contains(text(), "${match}")] or ` + // for more generic containers
            `self::dt                        [contains(text(), "${match}")] or ` + // added recently
            `self::ccd-read-fixed-list-field [contains(text(), "${match}")] or ` + // ..
            `self::ng-component              [contains(text(), "${match}")] or ` + // ..
            `self::span                      [contains(text(), "${match}")] or ` + // ..
            `self::td                        [contains(text(), "${match}")]` + // ..
            `]` +
            `[contains(normalize-space(), "${match}") and not(ancestor::*[@hidden])]`;
        try {
            await protractor_1.browser.wait(async () => {
                return ((await protractor_1.element
                    .all(protractor_1.by.xpath(contentPath))
                    .filter(async (elementFinder) => (await elementFinder.isPresent()) && elementFinder.isDisplayed())
                    .count()) > 0);
            }, wait);
            return true;
        }
        catch (error) {
            logger.error(error);
            return false;
        }
    }
    async smartWait(number) {
        await protractor_1.browser.driver.sleep(number);
    }
    async scrollBar(locator) {
        const elementFinder = await this.clickElementByXpath(locator);
        await protractor_1.browser.executeScript('arguments[0].scrollIntoView();', elementFinder);
        await this.smartWait(1000);
    }
    async setFinalDecisionsReasons(text) {
        await this.clickButton(text);
        await this.setText("//textarea[@rows='3']", 'I am very busy');
        await this.clickContinue();
    }
    async setText(key, value) {
        const textBoxRef = async () => {
            return ((await protractor_1.element
                .all(protractor_1.by.xpath(key))
                .filter(async (elementFinder) => (await elementFinder.isPresent()) && elementFinder.isDisplayed())
                .count()) > 0);
            return true;
        };
        if (textBoxRef) {
            await protractor_1.element.all(protractor_1.by.xpath(key)).sendKeys(value);
        }
    }
    async scrollPage(locator) {
        await protractor_1.browser.manage().window().maximize();
        await this.scrollBar(locator);
    }
    async selectEvent(event) {
        await (0, protractor_1.element)(protractor_1.by.cssContainingText('option', event)).click();
        await this.smartWait(1000);
        await this.clickButton('Go');
        await this.smartWait(1000);
        await this.clickSubmit();
        await this.smartWait(5000);
        await this.clickElement('div', 'History');
        await this.smartWait(2000);
    }
    async runAccessibility() {
        await (0, axe_runner_1.runAndReportAccessibility)();
    }
    async contentContainsSubstring(substring, wait = wait_1.Wait.extended) {
        const contentPath = '//*[' +
            'self::h1 or ' +
            'self::h2 or ' +
            'self::h3 or ' +
            'self::h4 or ' +
            'self::caption or ' +
            'self::label or ' +
            'self::p or ' +
            'self::li or ' +
            'self::div or ' +
            'self::ccd-read-date-field or ' +
            'self::dt or ' +
            'self::ccd-read-fixed-list-field or ' +
            'self::ng-component or ' +
            'self::span or ' +
            'self::td' +
            ']';
        try {
            await protractor_1.browser.wait(async () => {
                return ((await protractor_1.element
                    .all(protractor_1.by.xpath(contentPath))
                    .filter(async (elementFinder) => (await elementFinder.isPresent()) &&
                    (await elementFinder.isDisplayed()) &&
                    elementFinder.elementTextContains(substring))
                    .count()) > 0);
            }, wait);
            return true;
        }
        catch (error) {
            logger.error(error);
            return false;
        }
    }
    async verifyTextOnPageUsingXpath(elementVal, expText) {
        const actDocType = await (0, protractor_1.element)(protractor_1.by.xpath(elementVal)).getText();
        (0, chai_1.expect)(actDocType.trim()).to.equal(expText);
    }
    async waitForSpinner() {
        const elementFinder = (0, protractor_1.element)(protractor_1.by.className('spinner-container'));
        await protractor_1.browser.wait(protractor_1.ExpectedConditions.not(protractor_1.ExpectedConditions.presenceOf(elementFinder)), wait_1.Wait.extended);
    }
    async uploadFile(inputElement, fileName, folder = 'e2e/dwpResponse/') {
        const absolutePath = path_1.default.resolve(process.cwd(), folder, fileName);
        await (0, protractor_1.element)(protractor_1.by.id(inputElement)).sendKeys(absolutePath);
        if (crossBrowserTest) {
            protractor_1.browser.setFileDetector(new remote.FileDetector());
        }
        const uploadingLocator = protractor_1.by.cssContainingText('.error-message', 'Uploading');
        logger.info(`Uploading: ${await (0, protractor_1.element)(uploadingLocator).isPresent()}`);
        await protractor_1.browser.wait(protractor_1.ExpectedConditions.not(protractor_1.ExpectedConditions.presenceOf((0, protractor_1.element)(uploadingLocator))), wait_1.Wait.max);
    }
    async waitForEndState(state) {
        const endStateLabel = 'End state';
        await this.reloadPage();
        await this.clickTab('History');
        if (!(await this.isFieldValueDisplayed(endStateLabel, state))) {
            logger.info(`end state not found, waiting for ${wait_1.Wait.normal / 1000}s`);
            await protractor_1.browser.sleep(wait_1.Wait.normal);
            await this.reloadPage();
            await this.clickTab('History');
        }
        if (!(await this.isFieldValueDisplayed(endStateLabel, state))) {
            logger.info(`end state not found, waiting for ${wait_1.Wait.extended / 1000}s`);
            await protractor_1.browser.sleep(wait_1.Wait.extended);
            await this.reloadPage();
            await this.clickTab('History');
        }
        const locator = await this.getFieldValueLocator(endStateLabel, state);
        await this.waitForElement(locator, wait_1.Wait.short);
    }
}
exports.AnyCcdPage = AnyCcdPage;
//# sourceMappingURL=any-ccd.page.js.map