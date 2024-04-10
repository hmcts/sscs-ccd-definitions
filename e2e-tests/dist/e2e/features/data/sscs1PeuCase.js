"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sscsPeuFormData = void 0;
const scannedCase_1 = require("./scannedCase");
exports.sscsPeuFormData = [
    { question: 'mrn_date', answer: (0, scannedCase_1.mrnDate)() },
    { question: 'benefit_type_description', answer: 'PIP' },
    { question: 'person1_title', answer: 'Mr' },
    { question: 'person1_first_name', answer: 'Mark' },
    { question: 'person1_last_name', answer: 'Smith' },
    { question: 'person1_address_line1', answer: '999 Road Lane' },
    { question: 'person1_address_line2', answer: 'Town Name' },
    { question: 'person1_address_line3', answer: 'City Name' },
    { question: 'person1_address_line4', answer: 'County Name' },
    { question: 'person1_postcode', answer: 'DA7 5DX' },
    { question: 'person1_nino', answer: '' },
    { question: 'office', answer: '3' },
    { question: 'hearing_telephone_number', answer: '07895123456' },
    { question: 'is_hearing_type_oral', answer: 'true' },
    { question: 'is_hearing_type_paper', answer: 'false' },
    { question: 'hearing_type_telephone', answer: 'true' },
    // { question: 'hearing_type_video', answer: 'false' }
    // { question: 'hearing_type_face_to_face', answer: 'false' }
];
//# sourceMappingURL=sscs1PeuCase.js.map