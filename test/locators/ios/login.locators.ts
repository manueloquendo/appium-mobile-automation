/**
 * iOS locators for the Sign In screen.
 *
 * These selectors use native XCUITest attributes:
 * - type
 * - name
 * - label
 * - value
 *
 * They are used only when WebdriverIO runs
 * on an iOS device.
 */
export const loginLocators = {
    /**
     * Email Address input field.
     */
    emailInput:
        '-ios predicate string:' +
        '(' +
        'type == "XCUIElementTypeTextField" ' +
        'OR type == "XCUIElementTypeSecureTextField"' +
        ') ' +
        'AND (' +
        'name == "Email Address" ' +
        'OR label == "Email Address" ' +
        'OR value == "Email Address" ' +
        'OR name CONTAINS[c] "Email" ' +
        'OR label CONTAINS[c] "Email" ' +
        'OR value CONTAINS[c] "Email"' +
        ')',

    /**
     * Password input field.
     */
    passwordInput:
        '-ios predicate string:' +
        '(' +
        'type == "XCUIElementTypeSecureTextField" ' +
        'OR type == "XCUIElementTypeTextField"' +
        ') ' +
        'AND (' +
        'name == "Password" ' +
        'OR label == "Password" ' +
        'OR value == "Password" ' +
        'OR name CONTAINS[c] "Password" ' +
        'OR label CONTAINS[c] "Password" ' +
        'OR value CONTAINS[c] "Password"' +
        ')',

    /**
     * Sign In control.
     *
     * The visible Sign In control may be exposed
     * as Button, StaticText, Other, or another
     * accessible iOS element.
     */
    signInButton:
        '-ios predicate string:' +
        '(' +
        'name == "Sign In" ' +
        'OR label == "Sign In" ' +
        'OR value == "Sign In" ' +
        'OR name CONTAINS[c] "Sign In" ' +
        'OR label CONTAINS[c] "Sign In" ' +
        'OR value CONTAINS[c] "Sign In"' +
        ')',

    /**
     * Validation displayed when Email Address is empty.
     *
     * Expected visual message:
     * ^An email address is required
     */
    emailRequiredMessage:
        '-ios predicate string:' +
        '(' +
        'name CONTAINS[c] "An email address is required" ' +
        'OR label CONTAINS[c] "An email address is required" ' +
        'OR value CONTAINS[c] "An email address is required"' +
        ')',

    /**
     * Validation displayed when Password is empty.
     *
     * Expected visual message:
     * ^Password is required
     */
    passwordRequiredMessage:
        '-ios predicate string:' +
        '(' +
        'name CONTAINS[c] "Password is required" ' +
        'OR label CONTAINS[c] "Password is required" ' +
        'OR value CONTAINS[c] "Password is required"' +
        ')',

    /**
     * Validation displayed when Email Address
     * has an invalid format.
     *
     * Expected visual message:
     * ^The email format is invalid.
     */
    invalidEmailFormatMessage:
        '-ios predicate string:' +
        '(' +
        'name CONTAINS[c] "The email format is invalid" ' +
        'OR label CONTAINS[c] "The email format is invalid" ' +
        'OR value CONTAINS[c] "The email format is invalid" ' +
        'OR name CONTAINS[c] "email format is invalid" ' +
        'OR label CONTAINS[c] "email format is invalid" ' +
        'OR value CONTAINS[c] "email format is invalid"' +
        ')',

    /**
     * Authentication error displayed after submitting
     * a valid email with an incorrect password.
     *
     * The locator supports the expected technical error
     * and common user-friendly variations.
     *
     * Expected error content:
     * auth/wrong-password
     */
    authenticationFailureMessage:
        '-ios predicate string:' +
        '(' +
        'name CONTAINS[c] "auth/wrong-password" ' +
        'OR label CONTAINS[c] "auth/wrong-password" ' +
        'OR value CONTAINS[c] "auth/wrong-password" ' +
        'OR name CONTAINS[c] "wrong-password" ' +
        'OR label CONTAINS[c] "wrong-password" ' +
        'OR value CONTAINS[c] "wrong-password" ' +
        'OR name CONTAINS[c] "incorrect password" ' +
        'OR label CONTAINS[c] "incorrect password" ' +
        'OR value CONTAINS[c] "incorrect password" ' +
        'OR name CONTAINS[c] "authentication failed" ' +
        'OR label CONTAINS[c] "authentication failed" ' +
        'OR value CONTAINS[c] "authentication failed"' +
        ')',
} as const;