import { Browser, Page, chromium } from 'playwright';
import { AnyPage } from './anyPage';
import path from 'path';
import {debuglog} from "node:util";


export class CommonUseMethods extends AnyPage {
    browser: Browser | undefined;


    async clickElementById(elementId: string): Promise<void> {
        await this.clickAction(`#${elementId}`);
    }
    async clickElementByCss(elementId: string): Promise<void> {
        await this.clickAction(elementId);
    }
    async clickElementByXpath(xpath: string): Promise<void> {
        await this.clickAction(xpath);
    }
    async clickContinue(): Promise<void> {
        await this.clickButton('Continue');
        await this.page.waitForLoadState();
    }

    async clickSubmit(): Promise<void> {
        await this.clickButton('Submit');
        await this.page.waitForLoadState();
    }

    async clickAddNew(): Promise<void> {
        await this.clickButton('Add new');
    }

    async clickNextStep(): Promise<void> {
        await this.clickElementById("next-step");
    }

    async clickCreateCase(): Promise<void> {
        await this.clickButton("Create Case");
    }

    async clickIgnoreWarning(): Promise<void> {
        await this.clickButton('Ignore Warning and Go');
    }

    async clickButton(text: string): Promise<void> {
        await this.clickElement('button', text);
    }

    async clickTab(tabTitle: string): Promise<void> {
        await this.waitForTabsToLoad();
        await this.clickElement('div', tabTitle);
    }

    async clickElement(elementType: string, text: string): Promise<void> {
        await this.clickElementByXpath(`//${elementType}[text()="${text}"]`);
    }

    async clickLastElement(elementType: string, text: string, collectionLabel: string): Promise<void> {
        const elementXpath = `//ccd-write-collection-field//div[h2[normalize-space()="${collectionLabel}" or normalize-space()="${collectionLabel} (Optional)"]]/${elementType}[text()="${text}"]`;
        await this.clickLastAction(elementXpath);
    }

    async chooseOptionByElementId(elementId: string, option: string) {
        await this.page.selectOption(`#${elementId}`, { label: option });
    }

    async clickAction(selector: string): Promise<void> {
        await this.waitForSpinner();
        await this.page.waitForSelector(selector);
        await this.page.click(selector);
        await this.waitForSpinner();
    }

    async clickLastAction(selector: string): Promise<void> {
        await this.page.waitForSelector(selector);
        const elements = await this.page.$$(selector);
        await elements[elements.length - 1].click();
        await this.waitForSpinner();
    }

    async waitForElement(selector: string): Promise<void> {
        await this.page.waitForSelector(selector);
    }

    async waitForElements(selector: string): Promise<void> {
        await this.page.waitForSelector(selector);
    }

    async chooseOption(elementId: string, option: string): Promise<void> {
        await this.waitForElement(`#${elementId}`);
        await this.page.selectOption(`#${elementId}`, { label: option });
    }

    async chooseOptionContainingText(elementId: string, text: string): Promise<void> {
        await this.chooseOption(elementId, text);
    }

    async chooseOptionByValue(elementId: string, value: string): Promise<void> {
        await this.waitForElement(`#${elementId}`);
        await this.page.selectOption(`#${elementId}`, { value: value });
    }

    async fillValues(elementId: string, actText: string): Promise<void> {
        await this.page.fill(`#${elementId}`, actText);
    }

    async isFieldValueDisplayed(fieldLabel: string, fieldValue: string): Promise<boolean> {
        await this.waitForElement(`//${fieldLabel}/../../td`);
        const elements = await this.page.$$(`//${fieldLabel}/../../td[contains(text(), "${fieldValue}")]`);
        return elements.length > 0;
    }

    async getFieldValueLocator(fieldLabel: string, fieldValue: string): Promise<string> {
        return `//${fieldLabel}/../../td[contains(text(), "${fieldValue}")]`;
    }


    getFieldLocator(fieldLabel: string): string {
        return `//*[normalize-space()="${fieldLabel}"]/../../td`;
    }

    async getFieldValue(fieldLabel: string): Promise<any> {
        const fieldValueLocator = this.getFieldLocator(fieldLabel);
        return  this.page.textContent(fieldValueLocator);
    }

    async getFieldValues(fieldLabel: string): Promise<Array<any>> {
        const fieldValueLocator = this.getFieldLocator(fieldLabel);
        const elements = await this.page.$$(fieldValueLocator);
        return await Promise.all(elements.map(async (element) => element.textContent()));
    }

    async pageHeadingContains(match: string): Promise<boolean> {
        const headings = await this.page.$$(`//*[self::h1 or self::h2 or self::h3 or self::span][contains(text(), "${match}")]`);
        return headings.length > 0;
    }

    async getAlertMessage(): Promise<any> {
        return await this.page.$eval('div.alert-message', (element) => element.textContent);
    }

    async numberOfCcdErrorMessages(): Promise<number> {
        return await this.page.$$eval('div#error', (elements) => elements.length);
    }

    async getCcdErrorMessages(): Promise<Array<any>> {
       return await this.page.$$eval('div#error', (elements) => elements.map((element) => element.textContent));
    }

    async waitUntilLoaded(): Promise<void> {
        await this.page.waitForLoadState();
    }

    async waitForTabsToLoad(): Promise<void> {
        await this.waitForSpinner();
        await this.page.waitForSelector('mat-tab-header');
    }

    async reloadPage(): Promise<void> {
        await this.page.reload();
        await this.waitUntilLoaded();
        await this.waitForSpinner();
    }

    async selectIssueCode(): Promise<void> {
        await this.page.selectOption('#issueCode', { index: 2 });
    }

    async selectGeneralIssueCode(): Promise<void> {
        await this.page.selectOption('#elementsDisputedGeneral_0_issueCode', { index: 1 });
    }

    async selectHousingIssueCode(): Promise<void> {
        await this.page.selectOption('#elementsDisputedHousing_0_issueCode', { index: 1 });
    }

    async selectChildcareIssueCode(): Promise<void> {
        await this.page.selectOption('#elementsDisputedChildCare_0_issueCode', { index: 1 });
    }

    async getHistoryEvents(): Promise<Array<any>> {
        await this.clickTab('History');
        await this.page.$$eval('//ccd-event-log-table//*[contains(@class,"event-link")]', (elements) =>
            elements.map((element) => element.textContent)
        );
        return this.page.$$eval('//ccd-event-log-table//*[contains(@class,"event-link")]', (elements) =>
            elements.map((element) => element.textContent));
    }

    async elementNotPresent(linkText: string): Promise<void> {
        const elements = await this.page.$$(`//*[self::button or self::a or self::span][normalize-space()="${linkText}"]`);
        if (elements.length > 0) {
            throw new Error(`Element with text "${linkText}" is present`);
        }
    }

    async fillNote(): Promise<void> {
        await this.page.fill('#tempNoteDetail', 'This is a test');
    }

    async getCaseFields(): Promise<Array<any>> {
        return await this.page.$$eval('.case-field//markdown/*', (elements) => elements.map((element) => element.textContent));
    }

    async contentContains(match: string): Promise<boolean> {
        const contentPath =
            `//*[` +
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
            await this.page.waitForSelector(contentPath);
            return true;
        } catch (error) {
            debuglog('error');
            return false;
        }
    }

    async smartWait(number: number): Promise<void> {
        await this.page.waitForTimeout(number);
    }



    async setFinalDecisionsReasons(text: string): Promise<void> {
        await this.clickButton(text);
        await this.setText("//textarea[@rows='3']", 'I am very busy');

        await this.clickContinue();
    }

    async setText(key: string, value: string): Promise<void> {
        const textBoxPresent = await this.page.$(key);
        if (textBoxPresent) {
            await this.page.fill(key, value);
        }
    }

    async selectEvent(event: string): Promise<void> {
        await this.page.selectOption('option', { label: event });
        await this.smartWait(1000);
        await this.clickButton('Go');
        await this.smartWait(1000);
        await this.clickSubmit();
        await this.smartWait(5000);
        await this.clickElement('div', 'History');
        await this.smartWait(2000);
    }


    async contentContainsSubstring(substring: string): Promise<boolean> {
        const contentPath =
            '//*[' +
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
            await this.page.waitForSelector(`${contentPath}[contains(., "${substring}")]`);
            return true;
        } catch (error) {
            return false;
        }
    }

    async waitForSpinner(): Promise<void> {
        await this.page.waitForSelector('.spinner-container', { state: 'detached' });
    }

    async uploadFile(inputElement: string, fileName: string, folder = 'e2e/dwpResponse/') {
        const absolutePath = path.resolve(process.cwd(), folder, fileName);
        await this.page.setInputFiles(`#${inputElement}`, absolutePath);
        await this.page.waitForSelector('.error-message', { state: 'hidden' });
    }

    async waitForEndState(state: string): Promise<void> {
        await this.reloadPage();
        await this.clickTab('History');
        const endStateLocator = await this.getFieldValueLocator('End state', state);
        await endStateLocator;
    }
}
