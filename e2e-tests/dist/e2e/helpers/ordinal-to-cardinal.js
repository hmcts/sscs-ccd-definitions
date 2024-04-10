"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdinalToCardinal = void 0;
class OrdinalToCardinal {
    static convertWordToNumber(ordinalWord) {
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
exports.OrdinalToCardinal = OrdinalToCardinal;
//# sourceMappingURL=ordinal-to-cardinal.js.map