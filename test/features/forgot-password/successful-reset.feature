Feature: Forgot Password - Successful Password Reset Request

  Scenario: Send a password reset email successfully for a registered account
    Given the user is on the Sign In screen
    When the user taps the Forgot Email or Password link
    Then the Forgot Password screen should be displayed
    When the user enters the registered email address "ashutosh@tepia.co"
    And the user taps the Forgot Password Submit button
    Then the password reset email confirmation popup should be displayed
    And the successful password reset message should be displayed
    When the user taps the OK button on the successful reset popup
    Then the Sign In screen should be displayed
