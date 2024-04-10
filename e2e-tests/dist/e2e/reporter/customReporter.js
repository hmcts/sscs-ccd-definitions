"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessibilityReport = exports.copyResources = void 0;
const config_1 = __importDefault(require("config"));
const axe_runner_1 = require("../helpers/axe-runner");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const testOutputDir = path.resolve(process.cwd(), config_1.default.get('protractor.TestOutputDir'), 'a11y');
function copyResources() {
    const resourceDir = path.resolve(testOutputDir, 'resources/');
    const cssDir = path.resolve(resourceDir, 'css/');
    // eslint-disable-next-line no-sync
    fs.mkdirSync(cssDir, { recursive: true });
    const webfontsDir = path.resolve(resourceDir, 'webfonts/');
    // eslint-disable-next-line no-sync
    fs.mkdirSync(webfontsDir, { recursive: true });
    // eslint-disable-next-line no-sync
    fs.mkdirSync(cssDir, { recursive: true });
    // eslint-disable-next-line no-sync
    fs.copyFileSync(path.resolve(process.cwd(), 'e2e/reporter/resources/angular.min.js'), path.resolve(resourceDir, 'angular.min.js'));
    // eslint-disable-next-line no-sync
    fs.copyFileSync(path.resolve(process.cwd(), 'e2e/reporter/resources/css/all.css'), path.resolve(cssDir, 'all.css'));
    // eslint-disable-next-line no-sync
    fs.copyFileSync(path.resolve(process.cwd(), 'e2e/reporter/resources/webfonts/fa-solid-900.woff2'), path.resolve(webfontsDir, 'fa-solid-900.woff2'));
}
exports.copyResources = copyResources;
function generateAccessibilityReport() {
    const reportJson = (0, axe_runner_1.getAccessibilityTestResult)();
    const result = `var replacejsoncontent = ${JSON.stringify(reportJson)}`;
    const sourceReport = path.resolve(process.cwd(), 'e2e/reporter/Report.html');
    const destReport = path.resolve(testOutputDir, 'a11y.html');
    const destJson = path.resolve(testOutputDir, 'a11y_output.js');
    // eslint-disable-next-line no-sync
    fs.copyFileSync(sourceReport, destReport);
    // eslint-disable-next-line no-sync
    fs.writeFileSync(destJson, result);
    copyResources();
}
exports.generateAccessibilityReport = generateAccessibilityReport;
//# sourceMappingURL=customReporter.js.map