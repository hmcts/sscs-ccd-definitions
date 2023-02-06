import config from 'config';
import { getAccessibilityTestResult } from '../helpers/axe-runner';
import * as fs from 'fs';
import * as path from 'path';

const testOutputDir: string = path.resolve(process.cwd(), config.get('protractor.TestOutputDir'), 'a11y');

export function copyResources(): void {
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
  fs.copyFileSync(
    path.resolve(process.cwd(), 'e2e/reporter/resources/angular.min.js'),
    path.resolve(resourceDir, 'angular.min.js')
  );
  // eslint-disable-next-line no-sync
  fs.copyFileSync(path.resolve(process.cwd(), 'e2e/reporter/resources/css/all.css'), path.resolve(cssDir, 'all.css'));
  // eslint-disable-next-line no-sync
  fs.copyFileSync(
    path.resolve(process.cwd(), 'e2e/reporter/resources/webfonts/fa-solid-900.woff2'),
    path.resolve(webfontsDir, 'fa-solid-900.woff2')
  );
}

export function generateAccessibilityReport(): void {
  const reportJson = getAccessibilityTestResult();
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
