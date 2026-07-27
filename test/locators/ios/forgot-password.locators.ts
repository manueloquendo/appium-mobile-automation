/**
 * iOS locators for the Forgot Password flow.
 *
 * These selectors were validated using
 * BrowserStack Appium Inspector.
 */
export const forgotPasswordLocators = {
    /**
     * Forgot Email/Password link displayed
     * on the Sign In screen.
     */
    forgotEmailOrPasswordLink:
        '-ios predicate string:' +
        '(' +
        'name == "Forgot Email/Password" ' +
        'OR label == "Forgot Email/Password" ' +
        'OR value == "Forgot Email/Password" ' +
        'OR name == "Forgot Email or Password" ' +
        'OR label == "Forgot Email or Password" ' +
        'OR value == "Forgot Email or Password"' +
        ')',

    /**
     * Food App heading displayed on the
     * Forgot Password screen.
     *
     * BrowserStack Inspector:
     * Type: XCUIElementTypeStaticText
     * Text: Food App
     */
    forgotPasswordTitle:
        '-ios predicate string:' +
        'type == "XCUIElementTypeStaticText" ' +
        'AND (' +
        'name == "Food App" ' +
        'OR label == "Food App" ' +
        'OR value == "Food App"' +
        ')',

    /**
     * Email Address field.
     *
     * BrowserStack Inspector:
     * Type: XCUIElementTypeTextField
     * Value: Email Address
     */
    emailInput:
        '-ios predicate string:' +
        'type == "XCUIElementTypeTextField" ' +
        'AND (' +
        'value == "Email Address" ' +
        'OR placeholderValue == "Email Address"' +
        ')',

    /**
     * Submit control.
     *
     * BrowserStack Inspector:
     * Type: XCUIElementTypeOther
     * Name: Submit
     * Label: Submit
     */
    submitButton:
        '-ios predicate string:' +
        'type == "XCUIElementTypeOther" ' +
        'AND (' +
        'name == "Submit" ' +
        'OR label == "Submit" ' +
        'OR value == "Submit"' +
        ')',

    /**
     * Required Email Address validation.
     *
     * BrowserStack Inspector:
     * Type: XCUIElementTypeStaticText
     * Name: ^An email address is required
     */
    emailRequiredMessage:
        '-ios predicate string:' +
        'type == "XCUIElementTypeStaticText" ' +
        'AND (' +
        'name == "^An email address is required" ' +
        'OR label == "^An email address is required" ' +
        'OR value == "^An email address is required" ' +
        'OR name CONTAINS[c] "email address is required" ' +
        'OR label CONTAINS[c] "email address is required" ' +
        'OR value CONTAINS[c] "email address is required"' +
        ')',

    /**
     * Invalid email-format validation.
     */
    invalidEmailFormatMessage:
        '-ios predicate string:' +
        'type == "XCUIElementTypeStaticText" ' +
        'AND (' +
        'name CONTAINS[c] "email format is invalid" ' +
        'OR label CONTAINS[c] "email format is invalid" ' +
        'OR value CONTAINS[c] "email format is invalid"' +
        ')',

    /**
     * Unable to Send Reset Email popup title.
     *
     * BrowserStack Inspector:
     * Text: Unable to Send Reset Email
     */
    unregisteredEmailPopupTitle:
        '-ios predicate string:' +
        '(' +
        'name CONTAINS[c] "Unable to Send Reset Email" ' +
        'OR label CONTAINS[c] "Unable to Send Reset Email" ' +
        'OR value CONTAINS[c] "Unable to Send Reset Email"' +
        ')',

    /**
     * Unregistered email popup message.
     *
     * BrowserStack Inspector:
     * We could not send a password reset email.
     * Please check your email address and try again.
     */
    unregisteredEmailPopupMessage:
        '-ios predicate string:' +
        '(' +
        'name CONTAINS[c] ' +
        '"We could not send a password reset email" ' +
        'OR label CONTAINS[c] ' +
        '"We could not send a password reset email" ' +
        'OR value CONTAINS[c] ' +
        '"We could not send a password reset email"' +
        ')',

    /**
     * OK control displayed on the
     * unregistered email popup.
     *
     * The control is exposed by iOS through its
     * accessibility name. Avoid restricting the
     * XCUI element type because the application may
     * expose it as Button, StaticText, or Other.
     */
    unregisteredEmailPopupOkButton:
        '~OK',

    /**
     * Cancel control displayed on the Forgot Password screen.
     *
     * Appium Inspector:
     * Type: XCUIElementTypeOther
     * Name: Cancel
     * Label: Cancel
     * Visible: true
     * Accessible: true
     * Hittable: true
     */
    cancelButton:
        '-ios predicate string:' +
        'type == "XCUIElementTypeOther" ' +
        'AND (' +
        'name == "Cancel" ' +
        'OR label == "Cancel" ' +
        'OR value == "Cancel"' +
        ')',
} as const;