Feature: Sign Up - Mandatory Form Fields Validation

  Scenario: Display validation errors when submitting an empty registration form
    Given the user is on the Sign In screen
    When the user taps the Sign Up link
    Then the Sign Up screen should be displayed
    When the user leaves all registration fields blank
    And the user scrolls to the bottom of the Sign Up screen
    And the user taps the Sign Up button
    Then all mandatory Sign Up field validation messages should be displayed