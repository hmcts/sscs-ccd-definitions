export class StringUtilsComponent {
  static formatClaimReferenceToAUIDisplayFormat(claimReference : string) {
    return claimReference.toString().replace(/\d{4}(?=.)/g, '$& ');
  }
}

