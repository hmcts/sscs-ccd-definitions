import path from "path";

export const urls = {

  tribunalsApiUri: process.env.TRIBUNALS_API_URL || "http://sscs-tribunals-api-aat.service.core-compute-aat.internal",
  xuiUrl: process.env.SSCS_XUI_URL || 'https://manage-case.aat.platform.hmcts.net',
};

export const credentials = {
  caseWorker: {
    email: process.env.TEST_CASEOFFICER_USERNAME,
    password: process.env.TEST_CASEOFFICER_PASSWORD,
  },
  seniorCaseworker: {
    email: process.env.SENIOR_CASEWORKER_USERNAME,
    password:
      process.env.SENIOR_CASEWORKER_PASSWORD,
  },
  hearingCentreAdmin: {
    email:
      process.env.HEARING_CENTRE_ADMIN_USERNAME,
    password:
      process.env.HEARING_CENTRE_ADMIN_PASSWORD,
  },
  hearingCentreTeamLead: {
    email:
      process.env.HEARING_CENTRE_TEAM_LEAD_USERNAME,
    password:
      process.env.HEARING_CENTRE_TEAM_LEAD_PASSWORD,
  },
  judge: {
    email: process.env.JUDGE_USERNAME,
    password: process.env.JUDGE_PASSWORD,
  },
  seniorJudge: {
    email: process.env.SENIOR_JUDGE_USERNAME,
    password: process.env.SENIOR_JUDGE_PASSWORD,
  },
  nationalJudge: {
    email: process.env.TEST_NATIONAL_JUDGE_USERNAME,
    password: process.env.TEST_NATIONAL_JUDGE_PASSWORD,
  },
  respondent: {
    email: process.env.RESPONDENT_USERNAME,
    password: process.env.RESPONDENT_PASSWORD,
  },
  citizen: {
    email: process.env.CITIZEN_USERNAME,
    password: process.env.CITIZEN_PASSWORD,
  },
  ctscAdministrator: {
    email: process.env.TEST_CTSC_ADMINISTRATOR_USERNAME,
    password: process.env.TEST_CTSC_ADMINISTRATOR_PASSWORD,
  },
  ctscAdministratorWithCaseAllocatorRole: {
    email: process.env.TEST_CTSC_ADMINISTRATOR_CASE_ALLOCATOR_USERNAME,
    password: process.env.TEST_CTSC_ADMINISTRATOR_CASE_ALLOCATOR_PASSWORD,
  },
  ctscTeamLeader: {
    email: process.env.TEST_CTSC_TEAM_LEADER_USERNAME,
    password: process.env.TEST_CTSC_TEAM_LEADER_PASSWORD,
  },
  superUser: {
    email: process.env.SUPER_USER_USERNAME,
    password: process.env.SUPER_USER_PASSWORD,
  },
};

export const paths = {

  testFile: path.resolve(__dirname, "../tests/fixtures/file/mockFile.txt"),
  testPdfFile: path.resolve(
      __dirname,
      "../tests/fixtures/file/mockFile.pdf",
  ),
  testWordFile: path.resolve(
      __dirname,
      "../tests/fixtures/file/mockFile.docx",
  ),
  testOdtFile: path.resolve(
      __dirname,
      "../tests/fixtures/file/mockFile.odt",
  ),
};

export const timeouts = {
  shortTimeout: 5000,
  mediumTimout: 60000,
  longTimeout: 120000,
  maxTimeout: 240000
};

