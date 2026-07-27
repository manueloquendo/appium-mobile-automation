Feature: Forgot Password - Reset Request for Unregistered Email Address

  Scenario: Display an error when requesting a password reset for an unregistered email
    Given the user is on the Sign In screen
    When the user taps the Forgot Email or Password link
    Then the Forgot Password screen should be displayed
    When the user enters the unregistered email address "manuel@tapia.com"
    And the user taps the Forgot Password Submit button
    Then the Unable to Send Reset Email popup should be displayed
    And the unregistered email error message should be displayed
    When the user taps the OK button on the popup
    And the user taps the Cancel button on the Forgot Password screen
    Then the Sign In screen should be displayed