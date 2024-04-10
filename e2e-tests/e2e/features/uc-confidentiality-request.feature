Feature: UC Confidentiality Request

  @uc-confidentiality-request @nightly-test-skip
  Scenario: confidentiality request for appellant
    Given I presetup an "UC" SYA case
    And I am signed in as a Case Officer
    And I navigate to an existing case
    And the case should be in "With FTA" state
    Given I choose "Upload response"
    And I upload UC further information with disputed General disputed by others No and further info No
    And I wait "25" seconds
    And I choose "Action further evidence"
    Then I update the scanned document for "Appellant"
    And I choose "Action further evidence"
    Then I update the scanned document for "JointParty"
    And I should see the Request outcome status for "appellant" to be "In progress"

  @nightly-test-skip
  Scenario: Review Confidentiality - Granted for Appellant and Refused for Joint Party
    When I switch to be a Judge
    And I navigate to an existing case
    And I choose "Review confidentiality request"
    And I select Granted for Appellant and Refused for Joint Party as a confidentiality
    And I should see the Request outcome status for "appellant" to be "Granted"
    Then I should see "Is case confidential? Yes" as a case field

