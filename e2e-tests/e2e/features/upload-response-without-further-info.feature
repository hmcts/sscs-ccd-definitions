@migrated-to-exui
Feature: Happy Path

  @happy-path @nightly-test @dwp-upload-response @preview-test
  Scenario: Should end up in "Ready to list" state when ALL fields are present
    Given I presetup an "PIP" SYA case
    And I am signed in as a Case Officer
    Given I navigate to an existing case
    Then the case should end in "With FTA" state
  
    When I switch to be a DWPResponse Writer
    And I navigate to an existing case
    When I choose "Upload response"
    And I upload contains further information "NO" for "PIP"
    Given I navigate to an existing case
    Then the case should end in "Ready to list" state

    When I switch to be a Case Officer
    And I navigate to an existing case
    Then the case should end in "Ready to list" state
    And FTA documents should be seen against the case


 @happy-path @nightly-test @dwp-upload-response
  Scenario: Should end up in "Ready to List" state when a UC is not disputed by others
    Given I presetup an "UC" SYA case
    And I am signed in as a Case Officer
    Given I navigate to an existing case
    Then the case should be in "With FTA" state

    When I switch to be a DWPResponse Writer
    And I choose "Upload response"
    And I upload UC further information with disputed General disputed by others No and further info No
    Given I navigate to an existing case
    Then the case should be in "Ready to list" state

 @nightly-test
 Scenario: Child support case should end up in "Response received" state when FTA responds
    Given I presetup an "Child Support" SYA case
    And I am signed in as a Case Officer
    Given I navigate to an existing case
    And the case should be in "With FTA" state

    When I choose "Upload response"
    And I respond to the appeal with upload contains further information "No" option
    Then the case should end in "Response received" state
    And the "Other Party Details" tab is seen with "Other" content

  @nightly-test-skip
  Scenario: Tax Credit case should end up in "Ready to list" state when FTA responds
    Given I presetup an "Tax Credit" SYA case
    And I am signed in as a Case Officer
    Given I navigate to an existing case
    And the case should be in "With FTA" state

    When I choose "Upload response"
    And I respond to the taxCredit appeal with upload contains further information "No" option
    Given I navigate to an existing case
    Then the case should end in "Ready to list" state

  @tc-decision  @nightly-test
  Scenario: Tax Credit case should end up in "Ready to list" state when FTA responds
    Given I presetup an "Tax Credit" SYA case
    And I am signed in as a Case Officer
    Given I navigate to an existing case

    When I choose "Update to case data"
    And  I select Confidentiality Status as Yes
    Then I should see "Is case confidential? Yes" as a case field




