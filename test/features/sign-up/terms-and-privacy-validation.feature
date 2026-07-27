Feature: Sign Up - Privacy Policy and Terms & Conditions Acceptance Validation

  Scenario: Block registration when Privacy Policy and Terms & Conditions are not accepted
    Given the user is on the Sign In screen
    When the user taps the Sign Up link
    Then the Sign Up screen should be displayed
    When the user completes all required Sign Up fields with valid data
    And the user leaves the Privacy Policy and Terms & Conditions switches off
    And the user taps the Sign Up button
    Then the Privacy Policy required validation message should be displayed
    And the Terms and Conditions required validation message should be displayed