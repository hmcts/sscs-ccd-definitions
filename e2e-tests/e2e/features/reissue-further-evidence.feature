@migrated-to-exui-1 @nightly-test
Feature: Reissue evidence on a case

  Scenario: Reissue an evidence using Reissue further evidence event
    Given I presetup an "PIP" SYA case
    And I am signed in as a Case Officer
    And I navigate to an existing case
    Then the case should end in "With FTA" state
    When I choose "Action further evidence"
    And I wait "30" seconds
    And I fill the further evidence form with "otherDocumentManual" and "Form"
    Then the case should have successfully processed "Action further evidence" event

    When I choose "Reissue further evidence"
    And resend evidence to appellant and FTA user
    Then I see "Reissue further evidence" and "Update case only" event being processed successfully
    And I should still see previous uploaded file collection within documents tab

