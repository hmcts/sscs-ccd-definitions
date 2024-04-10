@migrated-to-exui @adjournment
Feature: Adjournment decision

  Background:
    Given I presetup an "PIP" SYA case
    When I switch to be a Case Officer
    And I wait "60" seconds
    And I navigate to an existing case
    When I choose "Add a hearing"
    And I book a hearing
    And I choose "Hearing booked"
    And I submit "Hearing booked"
    Then the case should end in "Hearing" state
    And I wait "60" seconds

    When I switch to be a Judge
    And I navigate to an existing case
    When I choose "Write adjournment notice"

  @nightly-test-5-disabled-due-to-ccd-bug-SSCS-8628 @nightly-test
  Scenario: Should end up in "Ready to list" state when decision is issued with generate notice is no
    And I generate an adjournment notice
    And I see "Draft Adjournment Notice"
    And I choose "Issue adjournment notice"
    And I continue
    And I submit "Issue adjournment notice"
    Then the case should end in "Ready to list" state

  @nightly-test-5 @TA-619 @nightly-test-skip
  Scenario: Should end up in "Ready to list" state when decision is issued with generate notice is yes and issue direction is no
    And I upload an adjournment notice and issue direction "No"
    And I see "Draft Adjournment Notice"
    And I choose "Issue adjournment notice"
    And I continue
    And I submit "Issue adjournment notice"
    Then the case should be in "Ready to list" appeal status

  @nightly-test-5
  Scenario: Should end up in "Not listable" state when decision is issued with generate notice is yes and issue direction is yes
    And I upload an adjournment notice and issue direction "Yes"
    And I see "Draft Adjournment Notice"
    And I choose "Issue adjournment notice"
    And I continue
    And I submit "Issue adjournment notice"
    Then the case should be in "Not listable" appeal status
