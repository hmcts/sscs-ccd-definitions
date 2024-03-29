import { browser, $, ExpectedConditions } from 'protractor';
import { AnyPage } from './any.page';
import { FormFiller } from '../helpers/form-filler';
import { Wait } from '../enums/wait';

export class IdamSignInPage extends AnyPage {
  private formFiller = new FormFiller();

  private username = 'form[name="loginForm"] input#username';
  private password = 'form[name="loginForm"] input#password';
  private signInButton = 'form[name="loginForm"] *[type=submit]';

  async signIn(emailAddress: string, password: string) {
    await this.waitUntilLoaded();
    await this.formFiller.replaceText($(this.username), emailAddress);
    await this.formFiller.replaceText($(this.password), password);
    await $(this.signInButton).click();
  }

  async waitUntilLoaded() {
    await browser.driver.wait(
      ExpectedConditions.visibilityOf($(this.signInButton)),
      Wait.max,
      'IDAM Sign In page did not load in time'
    );
  }
}
