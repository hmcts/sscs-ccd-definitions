"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const lapsecase_page_1 = require("../../pages/lapsecase.page");
const lapseCase = new lapsecase_page_1.LapseCasePage();
(0, cucumber_1.When)('I set FTA State to Lapsed {string}', async function (action) {
    await lapseCase.uploadResponse(action);
});
//# sourceMappingURL=lapse-case.steps.js.map