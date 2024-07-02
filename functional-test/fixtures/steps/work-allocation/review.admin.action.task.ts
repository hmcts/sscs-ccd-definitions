import { Page } from '@playwright/test';
import task from '../../../pages/content/review.admin.task_en.json';
import { BaseStep } from '../base';
import { SendToAdmin } from '../send.to.admin';
import { InformationReceived } from '../information.received';
import { credentials } from '../../../config/config'


export class ReviewAdminActionTask extends BaseStep {

    readonly page : Page;

    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    async verifyCtscAdminWithoutCaseAllocatorRoleCanViewReviewAdminActionTask(caseId: string) {

        let sendToAdmin = new SendToAdmin(this.page);

        // Login as Judge and complete Send to Admin event to trigger Review Admin Action task
        await sendToAdmin.performSendToAdmin(caseId);
        await this.homePage.navigateToTab('Tasks');
        await this.tasksTab.verifyTaskIsDisplayed(task.name);

        // Login as CTSC Administrator and view the unassigned Review Admin Action task
        await this.loginUserWithCaseId(credentials.amCaseWorker, true, caseId);
        await this.homePage.navigateToTab('Tasks')
        await this.tasksTab.verifyTaskIsDisplayed(task.name);
        await this.tasksTab.verifyPriortiy(task.name, task.priority);
        await this.tasksTab.verifyPageContentByKeyValue(task.name, 'Assigned to', task.assignedToWhenNotAssigned);
        await this.tasksTab.verifyManageOptions(task.name, task.unassignedManageOptions);
    }

    async verifyCtscAdminWithCaseAllocatorRoleCanViewReviewAdminActionTask(caseId: string) {

        /* Login as CTSC Administrator with case allocator role and view the 
           unassigned Review Admin Action task */
        await this.loginUserWithCaseId(credentials.amCaseWorkerWithCaseAllocatorRole, true, caseId);
        await this.homePage.navigateToTab('Tasks')
        await this.tasksTab.verifyTaskIsDisplayed(task.name);
        await this.tasksTab.verifyPriortiy(task.name, task.priority);
        await this.tasksTab.verifyPageContentByKeyValue(task.name, 'Assigned to', task.assignedToWhenNotAssigned);
        await this.tasksTab.verifyManageOptions(task.name, task.unassignedManageOptionsForCaseAllocator);
    }

    async verifyCtscAdminWithoutCaseAllocatorRoleCanCompleteReviewAdminActionTask(caseId: string) {

        // Login as CTSC Administrator and view the unassigned Review Admin Action task
        await this.loginUserWithCaseId(credentials.amCaseWorker, true, caseId);
        await this.homePage.navigateToTab('Tasks')
        await this.tasksTab.verifyTaskIsDisplayed(task.name);

        // CTSC Administrator self assigns task and verifies assigned task details
        await this.tasksTab.selfAssignTask(task.name);
        await this.tasksTab.verifyPageContentByKeyValue(task.name, 'Assigned to', task.assignedTo);
        await this.tasksTab.verifyManageOptions(task.name, task.assignedManageOptions);
        await this.tasksTab.verifyNextStepsOptions(task.name, task.nextStepsOptions);

        // Verify navigation for Send to Interloc and Send case to TCW next step options
        await this.tasksTab.verifyNextStepNavigation(task.sendToInterloc.link, task.sendToInterloc.eventTitle);
        await this.tasksTab.verifyNextStepNavigation(task.sendCaseToTcw.link, task.sendCaseToTcw.eventTitle);

        // Select Information recieved next step and complete the event
        await this.tasksTab.clickNextStepLink(task.informationReceived.link);

        let informationReceived = new InformationReceived(this.page)
        await informationReceived.performInformationReceivedEvent();

        // Verify task is removed from the tasks list within Tasks tab
        await this.tasksTab.verifyTaskIsHidden(task.name);
    }
}