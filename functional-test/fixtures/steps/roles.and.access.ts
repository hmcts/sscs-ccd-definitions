import { Page } from '@playwright/test';
import { WebAction } from '../../common/web.action'
import { HomePage } from '../../pages/common/homePage';
import { LoginPage } from '../../pages/common/loginPage';
import { AllocateCtscRolePage } from '../../pages/allocate.ctsc.role';
import { credentials } from '../../config/config'

let webActions: WebAction;

export class RolesAndAccess {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        webActions = new WebAction(this.page);
    }

    async allocateACtscRoleForCase(caseId: string, userDetails: any) {
        let loginPage = new LoginPage(this.page);
        let homePage = new HomePage(this.page);
        let allocateCtscRolePage = new AllocateCtscRolePage(this.page);

        await loginPage.goToLoginPage();
        await loginPage.verifySuccessfulLogin(credentials.ctscTeamLeader)
        await homePage.goToHomePage(caseId);
        await homePage.navigateToTab('Roles and access');
        await webActions.clickLink("Allocate a CTSC role");
        await allocateCtscRolePage.verifyPageContent();
        await allocateCtscRolePage.allocateToUser(userDetails.email);
        await allocateCtscRolePage.verifyRoleAllocated();
    }
}
