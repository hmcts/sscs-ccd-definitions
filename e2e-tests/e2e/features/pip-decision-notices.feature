@migrated-to-exui
Feature: PIP Final decision notice

  Background:
    Given I presetup an "PIP" SYA case
    And I am signed in as a Case Officer
    And I navigate to an existing case
    Then the case should end in "With FTA" state

    When I switch to be a DWPResponse Writer
    And I navigate to an existing case
    When I choose "Upload response"
    And I upload contains further information "NO" for "PIP"

    When I switch to be a Judge
    And I navigate to an existing case
    When I choose "Write final decision"

  @issue-decision @nightly-test
  Scenario: Should end up in "Dormant" state when decision is issued with generate notice is no
    And I write a final decision generate notice no generate

    When I choose "Issue final decision"
    And I issue a final decision generate decision no
    Then the case should end in "Dormant" state
    Then I should see "Final Decision Notice" in documents tab

  @issue-decision @PIP-DN-2 @preview-test
  Scenario: Yes to generate decision and award is about daily living or mobility
    And I write a final decision generate notice yes daily living mobility is no face to face

    When I choose "Issue final decision"
    And I issue a final decision generate decision no
    Then the case should be in "Dormant" appeal status
    Then I should see "Final Decision Notice" in documents tab

    @issue-decision @PIP-DN-3
    Scenario: Yes to generate decision and award is about daily living or mobility
      And I write a final decision generate notice yes daily living mobility is yes face to face
      And I see "Draft Decision Notice"

      When I choose "Issue final decision"
      And I issue a final decision generate decision no
      Then the case should be in "Dormant" appeal status
      Then I should see "Final Decision Notice" in documents tab
