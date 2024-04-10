"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormFiller = void 0;
const protractor_1 = require("protractor");
class FormFiller {
    async clearText(inputElement, length) {
        const inputText = await inputElement.getAttribute('value');
        const clearLength = length || inputText.length || 255;
        await inputElement.sendKeys(protractor_1.Key.BACK_SPACE.repeat(clearLength));
    }
    async replaceText(inputElement, value) {
        await this.clearText(inputElement);
        await inputElement.sendKeys(value);
    }
}
exports.FormFiller = FormFiller;
//# sourceMappingURL=form-filler.js.map