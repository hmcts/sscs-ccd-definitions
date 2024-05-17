@nightly-test
Feature: Case Access Management

 Scenario: SSCS1 benefit - check RPC and case management location on the appearl details page
  Given I presetup an "CAMPIP" SYA case
  And I am signed in as a Case Officer
  Given I navigate to an existing case
  And the case should be in "With FTA" state
  And "Summary" tab should contain "Manchester" value for case management "Processing venue" field
  And "CAM Fields" tab should contain "DWP" value for case management "OGD type" field
  And "CAM Fields" tab should contain "personalIndependencePayment" value for case management "Case access category" field
  And "Appeal Details" tab should contain "LIVERPOOL" value for case management "Regional Processing Center Name" field
  And "Appeal Details" tab should contain "4" value for case management "Region" field
  And "Appeal Details" tab should contain "196538" value for case management "Base Location" field
