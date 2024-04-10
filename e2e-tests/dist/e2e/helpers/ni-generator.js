"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateNINumber = exports.yearPrefix = exports.monthPrefix = exports.numberFromDay = exports.pad2 = void 0;
function pad2(num) {
    return num < 10 ? `0${num}` : num;
}
exports.pad2 = pad2;
function numberFromDay(date = new Date()) {
    return `${pad2(date.getDate())}${pad2(date.getHours())}${pad2(date.getMinutes())}`;
}
exports.numberFromDay = numberFromDay;
const monthCodes = ['A', 'C', 'E', 'H', 'J', 'L', 'M', 'P', 'R', 'S', 'X', 'Y', 'T'];
// NiNo validation : Neither of the first two letters can be D, F, I, Q, U or V.
// The second letter also cannot be O. The prefixes BG, GB, NK, KN, TN, NT and ZZ are not allocated
// Letters to avoid - B, D, F, G, I, K, N, O, Q, T, U, V, Z
function monthPrefix(date = new Date()) {
    return monthCodes[date.getMonth()] || 'T';
}
exports.monthPrefix = monthPrefix;
const yearCodes = ['A', 'C', 'E', 'H', 'J', 'L', 'M', 'P'];
function yearPrefix(date = new Date()) {
    return yearCodes[date.getFullYear() - 2020] || 'P';
}
exports.yearPrefix = yearPrefix;
function generateNINumber(postfix = 'A', date = new Date()) {
    return `${yearPrefix(date)}${monthPrefix(date)}${numberFromDay(date)}${postfix}`;
}
exports.generateNINumber = generateNINumber;
//# sourceMappingURL=ni-generator.js.map