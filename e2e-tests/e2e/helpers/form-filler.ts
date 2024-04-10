import { ElementFinder, Key } from 'protractor';

export class FormFiller {
  async clearText(inputElement: ElementFinder, length?: number) {
    const inputText = await inputElement.getAttribute('value');
    const clearLength = length || inputText.length || 255;
    await inputElement.sendKeys(Key.BACK_SPACE.repeat(clearLength));
  }

  async replaceText(inputElement: ElementFinder, value: any) {
    await this.clearText(inputElement);
    await inputElement.sendKeys(value);
  }
}
