import { browser } from 'protractor';
import { IdamSignInPage } from '../pages/idam-sign-in.page';
import config from 'config';
import { Logger } from '@hmcts/nodejs-logging';

const logger = Logger.getLogger('authentication.flow');
const ccdWebUrl: string = config.get('ccd.webUrl');

export class AuthenticationFlow {
  private userName: string;
  private password: string;
  private idamSignInPage = new IdamSignInPage();

  async signOut(): Promise<void> {
    logger.info(`Signed out of user ${this.userName}`);
    await browser.waitForAngularEnabled(false);
    await browser.driver.manage().deleteAllCookies();
    console.log(`We url to load on the browser is   ########################### ${ccdWebUrl}`);
    await browser.get(`${ccdWebUrl}/`);
    await this.idamSignInPage.waitUntilLoaded();
  }

  async signInAsCaseOfficer(): Promise<void> {
    await this.signIn('caseOfficer');
  }

  async signInAsClerk(): Promise<void> {
    await this.signIn('clerk');
  }

  async signInAsJudge(): Promise<void> {
    await this.signIn('judge');
  }

  async signInAsDWPResponseWriter(): Promise<void> {
    await this.signIn('DWPResponseWriter');
  }

  async signIn(user: string): Promise<void> {
    await this.goToSignInPage();
    this.userName = config.get(`users.${user}.user`);
    this.password = config.get(`users.${user}.password`);
    logger.info(`Signing in to user ${this.userName} with password ${this.password}`);
    await this.idamSignInPage.signIn(this.userName, this.password);
    logger.info(`Signed in to user ${this.userName}`);
  }

  async goToSignInPage(): Promise<void> {
    await this.signOut();
    await this.idamSignInPage.waitUntilLoaded();
  }
}
