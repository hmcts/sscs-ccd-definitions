@migrated-to-exui
Feature: Alternate Happy Path

  @alt-happy-path @nightly-test @preview-test
  Scenario: Should end up in "With FTA" state when ALL fields are present
    Given I presetup an "PIP" SYA case
    And I am signed in as a Case Officer
    Given I navigate to an existing case
    Then the case should end in "With FTA" state

    When I switch to be a DWPResponse Writer
    And I navigate to an existing case
    When I choose "Upload response"
    And I upload contains further information "YES" for "PIP"
    Then the case should be in "Response received" state

    When I switch to be a Case Officer
    And I navigate to an existing case
    When I choose "Response reviewed"
    And I choose Requires Interlocutory Review No "Response reviewed"
    Then the case should be in "Ready to list" state


  @happy-path @dwp-upload-response @uc @nightly-test
  Scenario: Should end up in "Ready to List" state when a UC disputed case has been response reviewed
    Given I presetup an "UC" SYA case
    And I am signed in as a Case Officer
    Given I navigate to an existing case
    Then the case should be in "With FTA" state

    When I switch to be a DWPResponse Writer
    And I navigate to an existing case
    And I choose "Upload response"
    And I upload UC further information with disputed General disputed by others Yes and further info Yes
    Then the case should be in "Response received" state

    When I switch to be a Case Officer
    And I navigate to an existing case
    And I choose "Response reviewed"
    When I review the UC received Response
    Then the case should be in "Ready to list" state


  @tc-decision  @dwp-upload-response @nightly-test
  Scenario: Tax Credit case should end up in "Not listable" state
    Given I presetup an "Tax Credit" SYA case
    And I am signed in as a Case Officer
    Given I navigate to an existing case
    And the case should be in "With FTA" state

    When I choose "Upload response"
    And I respond to the taxCredit appeal with upload contains further information "Yes" option
    Then the case should be in "Response received" state


  @nightly-test @dwp-upload-response
  Scenario: Child support case should end up in "Not listable" state
    Given I presetup an "Child Support" SYA case
    And I am signed in as a Case Officer
    Given I navigate to an existing case
    And the case should be in "With FTA" state

    When I choose "Upload response"
    And I respond to the appeal with upload contains further information "Yes" option
    Then the case should end in "Response received" state
    Then the interloc state should be in "Awaiting Admin Action"
