/**
 * Android locators for the Forgot Password flow.
 *
 * This file must contain Android locator strategies only.
 * Do not include iOS predicate selectors in this file.
 */
export const forgotPasswordLocators = {
    /**
     * Forgot Email/Password link displayed
     * on the Sign In screen.
     */
    forgotEmailOrPasswordLink:
        'android=new UiSelector()' +
        '.text("Forgot Email/Password")',

    /**
     * Forgot Password title.
     *
     * This locator is optional because the application
     * may not expose a specific Forgot Password title.
     */
    forgotPasswordTitle:
        'android=new UiSelector()' +
        '.textContains("Forgot Password")',

    /**
     * Email Address input field.
     *
     * The selector first identifies an EditText and then
     * checks for the Email Address placeholder text.
     */
    emailInput:
        'android=new UiSelector()' +
        '.className("android.widget.EditText")' +
        '.textContains("Email Address")',

    /**
     * Submit button displayed on the Forgot Password screen.
     */
    submitButton:
        'android=new UiSelector()' +
        '.text("Submit")',

    /**
     * Required Email Address validation message.
     */
    emailRequiredMessage:
        'android=new UiSelector()' +
        '.textContains("An email address is required")',

    /**
     * Invalid email-format validation message.
     */
    invalidEmailFormatMessage:
        'android=new UiSelector()' +
        '.textContains("email format is invalid")',

    /**
     * Error popup title displayed when the
     * entered email address is not registered.
     *
     * Expected:
     * Unable to Send Reset Email
     */
    unregisteredEmailPopupTitle:
        'android=new UiSelector()' +
        '.text("Unable to Send Reset Email")',

    /**
     * Error popup message displayed when the
     * entered email address is not registered.
     */
    unregisteredEmailPopupMessage:
        'android=new UiSelector()' +
        '.textContains("We could not send a password reset email")',

    /**
     * OK button displayed on the popup.
     *
     * Android exposes this control using the
     * native resource id:
     *
     * android:id/button1
     */
    unregisteredEmailPopupOkButton:
        'id=android:id/button1',
} as const;