export class OrdinalToCardinal {
  public static convertWordToNumber(ordinalWord: string): number {
    switch (ordinalWord) {
      case 'first':
        return 1;
      case 'second':
        return 2;
      case 'third':
        return 3;

      default:
        throw new Error(`Cannot convert "${ordinalWord}" -- numbers beyond 20 are not currently supported`);
    }
  }
}
