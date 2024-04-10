"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const moment_1 = __importDefault(require("moment"));
class Logger {
    static log(o) {
        console.log(`${(0, moment_1.default)().toISOString()} - ${o}`);
    }
}
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map