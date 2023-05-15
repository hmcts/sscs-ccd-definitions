@migrated-to-exui
Feature: Issue decision award

  Background:
    Given I presetup an "PIP" SYA case
    And I am signed in as a Case Officer
    And I navigate to an existing case
    Then the case should be in "With FTA" state
    When I switch to be a DWPResponse Writer
    When I choose "Upload response"
    And I upload contains further information "NO" for "PIP"
    When I switch to be a Judge
    And I navigate to an existing case
    When I choose "Write final decision"

  @Issue-decision-award @nightly-test
    Scenario: Yes to generate decision and award is about daily living or mobility
      Then I write a final decision generate notice yes daily living mobility is yes face to face
      When I choose "Issue final decision"
      And I issue a final decision generate decision no
      Then the case should have successfully processed "Issue final decision" event
      Then the case should be in "Dormant" appeal status
      Then I should see "Final Decision Notice" in documents tab

  @issue-decision-4 @nightly-test-1 @Deferred
    Scenario: Award is about daily living or mobility
      Given I am signed in as a Case Officer
      When I switch to be a Judge
      When I test final decision
      When I choose "Write final decision"
      And I write a final decision generate notice yes daily living mobility is yes face to face
