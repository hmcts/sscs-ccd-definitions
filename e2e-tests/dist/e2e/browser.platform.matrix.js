"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multiCapabilities = void 0;
const config_1 = __importDefault(require("config"));
const tunnelIdentifier = config_1.default.get('proxy.tunnelIdentifier');
exports.multiCapabilities = [
    {
        browserName: 'chrome',
        version: 'latest',
        platform: 'macOS 10.13',
        name: 'sscs-chrome-mac-test',
        tunnelIdentifier,
        extendedDebugging: true,
        capturePerformance: true,
        sharedTestFiles: false,
        maxInstances: 1,
    },
    {
        browserName: 'firefox',
        version: 'latest',
        platform: 'macOS 10.13',
        name: 'sscs-firefox-mac-test',
        tunnelIdentifier,
        extendedDebugging: true,
        capturePerformance: true,
        sharedTestFiles: false,
        maxInstances: 1,
    },
    {
        browserName: 'chrome',
        version: 'latest',
        platform: 'Windows 10',
        name: 'sscs-chrome-windows-test',
        tunnelIdentifier,
        extendedDebugging: true,
        capturePerformance: true,
        sharedTestFiles: false,
        maxInstances: 1,
    },
    // {
    //   browserName: 'firefox',
    //   version: 'latest',
    //   platform: 'Windows 10',
    //   name: 'sscs-firefox-windows-test',
    //   tunnelIdentifier,
    //   extendedDebugging: true,
    //   capturePerformance: true,
    //   sharedTestFiles: false,
    //   maxInstances: 1,
    // },
    // {
    //   browserName: 'safari',
    //   platform: 'macOS 10.13',
    //   version: 'latest-1',
    //   name: 'sscs-safari-mac-test',
    //   tunnelIdentifier,
    //   extendedDebugging: true,
    //   capturePerformance: true,
    //   sharedTestFiles: false,
    //   maxInstances: 1,
    // },
    {
        browserName: 'MicrosoftEdge',
        version: 'latest',
        platform: 'Windows 10',
        name: 'sscs-microsoft-edge-windows-test',
        tunnelIdentifier,
        extendedDebugging: true,
        capturePerformance: true,
        sharedTestFiles: false,
        maxInstances: 1,
    },
    //   {
    //     browserName: 'internet explorer',
    //     version: 'latest',
    //     platform: 'Windows 10',
    //     name: 'sscs-ie11-windows-test',
    //     tunnelIdentifier,
    //     extendedDebugging: true,
    //     capturePerformance: true,
    //     sharedTestFiles: false,
    //     maxInstances: 1
    //   },
];
//# sourceMappingURL=browser.platform.matrix.js.map