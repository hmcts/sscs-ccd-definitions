@nightly-test @dla
Feature: Create / Adjournment Schedule and Listing

  Scenario: Auto request a Hearing & adjournment for a DLA case
    Given I presetup an "SANDLDLA" SYA case
    And I am signed in as a Hearing Case Officer
    And I navigate to an existing case
    And the case should be in "With FTA" state

    When I choose "Upload response"
    And I respond to the dla appeal with upload contains further information "No" option and "EI" issue code
    Then the case should be in "Ready to list" state

    And I should see a hearing request generated for the appeal
    When I click on hearing details
    Then the venue of the hearing should be in "Cardiff Social Security And Child Support Tribunal"
    And the duration of the hearing should be "1 Hour"
    And the earliest hearing date should be from "28" days of hearing requested

    And I navigate to an existing case
    When I choose "Write adjournment notice"
    And I generate an adjournment notice with new hearing type and duration
    And I choose "Issue adjournment notice"
    And I continue
    And I submit "Issue adjournment notice"
    Then the case should end in "Ready to list" state
    And new hearing value requirements should be seen against the case
    And new hearing request must be triggered against the case

  Scenario: Auto request a Hearing for UC case
   Given I presetup an "SANDLUCVIDEO" SYA case
   And I am signed in as a Hearing Case Officer
   And I navigate to an existing case
   Then the case should be in "With FTA" state

   And I choose "Upload response"
   And I upload contains further information "NO" for "UC"
   Then the case should be in "Ready to list" state

   And I should see a hearing request generated for the appeal
   When I click on hearing details
   Then the venue of the hearing should be in "Cardiff Social Security And Child Support Tribunal"
   And the duration of the hearing should be "30 Minutes"
   And the earliest hearing date should be from "28" days of hearing requested

   And I navigate to an existing case
   When I choose "Write adjournment notice"
   And I generate an adjournment notice with video hearing type and non standard timeslot with session
   And I choose "Issue adjournment notice"
   And I continue
   And I submit "Issue adjournment notice"
   Then the case should end in "Not listable" state
   And new hearing value requirements for video hearing type should be seen against the case
   And new hearing request must be triggered against the case
 
  Scenario: Auto request a Hearing for PIP with Rep and paper hearing
    Given I presetup an "SANDLPIPREP" SYA case
    And I am signed in as a Hearing Case Officer
    And I navigate to an existing case
    And the case should be in "With FTA" state

    When I choose "Upload response"
    And I respond to the appeal with upload contains further information "No" option and "ML" issue code
    Then the case should be in "Ready to list" state

    And I should see a hearing request generated for the appeal
    When I click on hearing details
    Then the venue of the hearing should be in "Cardiff Social Security And Child Support Tribunal"
    And the duration of the hearing should be "1 Hour"
    And the earliest hearing date should be from "28" days of hearing requested

    And I navigate to an existing case
    When I choose "Write adjournment notice"
    And I generate an adjournment notice with Paper hearing type
    And I choose "Issue adjournment notice"
    And I continue
    And I submit "Issue adjournment notice"
    Then the case should end in "Ready to list" state
    And new hearing value requirements for paper hearing type should be seen against the case
    And new hearing request must be triggered against the case

  Scenario: Auto request a Hearing for PIP with Rep and F2F hearing
    Given I presetup an "SANDLPIPREPF2F" SYA case
    And I am signed in as a Hearing Case Officer
    And I navigate to an existing case
    And the case should be in "With FTA" state

    When I choose "Upload response"
    And I respond to the appeal with upload contains further information "No" option and "ML" issue code
    Then the case should be in "Ready to list" state

    And I should see a hearing request generated for the appeal
    When I click on hearing details
    Then the venue of the hearing should be in "Cardiff Social Security And Child Support Tribunal"
    And the duration of the hearing should be "30 Minutes"
    And the earliest hearing date should be from "28" days of hearing requested

    And I navigate to an existing case
    When I choose "Write adjournment notice"
    And I generate an adjournment notice with face to face hearing type
    And I choose "Issue adjournment notice"
    And I continue
    And I submit "Issue adjournment notice"
    Then the case should end in "Ready to list" state
    And new hearing value requirements for face to face hearing type should be seen against the case
    And new hearing request must be triggered against the case


