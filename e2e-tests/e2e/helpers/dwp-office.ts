export class DwpOffice {
  officeMap = new Map([
    ['ESA', 'Sheffield DRT'],
    ['PIP', '3'],
    ['UC', 'Universal Credit'],
  ]);

  officeCode(benefitCode) {
    return this.officeMap.get(benefitCode);
  }
}
