"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DwpOffice = void 0;
class DwpOffice {
    officeMap = new Map([
        ['ESA', 'Sheffield DRT'],
        ['PIP', '3'],
        ['UC', 'Universal Credit'],
    ]);
    officeCode(benefitCode) {
        return this.officeMap.get(benefitCode);
    }
}
exports.DwpOffice = DwpOffice;
//# sourceMappingURL=dwp-office.js.map