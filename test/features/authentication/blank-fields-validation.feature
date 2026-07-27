@mobile @android @ios @signin @negative @regression
Feature: Mobile Sign In - Blank Fields Validation

  Scenario: Validation for blank Email and Password fields
    Given the user is on the Sign In screen
    When the user taps the Sign In button without entering credentials
    Then the Email Address field should display the required validation message
    And the Password field should display the required validation message