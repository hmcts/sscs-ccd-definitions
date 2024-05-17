import path from "path";

export const urls = {

  tribunalsApiUri: process.env.TRIBUNALS_API_URL || "http://sscs-tribunals-api-aat.service.core-compute-aat.internal",
  xuiUrl: process.env.SSCS_XUI_URL || 'https://manage-case.aat.platform.hmcts.net',
  idamUrl : process.env.IDAM_URL || 'https://idam-api.aat.platform.hmcts.net',
  s2sUrl : process.env.S2S_URL || 'http://rpe-service-auth-provider-aat.service.core-compute-aat.internal',
};

export const credentials = {
  caseWorker: {
    email: process.env.TEST_CASEOFFICER_USERNAME,
    password: process.env.TEST_CASEOFFICER_PASSWORD,
  },
  amCaseWorker: {
    email: process.env.TEST_AM_CASEOFFICER_USERNAME,
    password: process.env.TEST_AM_CASEOFFICER_PASSWORD,
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
    email: process.env.TEST_JUDGE_USERNAME,
    password: process.env.TEST_JUDGE_PASSWORD,
  },
  seniorJudge: {
    email: process.env.SENIOR_JUDGE_USERNAME,
    password: process.env.SENIOR_JUDGE_PASSWORD,
  },
  respondent: {
    email: process.env.RESPONDENT_USERNAME,
    password: process.env.RESPONDENT_PASSWORD,
  },
  citizen: {
    email: process.env.CITIZEN_USERNAME,
    password: process.env.CITIZEN_PASSWORD,
  },
  superUser: {
    email: process.env.SUPER_USER_USERNAME,
    password: process.env.SUPER_USER_PASSWORD,
  },
};

export const resources = {
  idamClientId : process.env.IDAM_OAUTH2_CLIENT_ID,
  idamClientSecret : process.env.IDAM_OAUTH2_CLIENT_SECRET,
  idamClientRedirect : process.env.IDAM_OAUTH2_REDIRECT_URL
}

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

