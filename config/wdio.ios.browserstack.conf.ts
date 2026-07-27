import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import type { Options } from '@wdio/types';
import { browser } from '@wdio/globals';

/**
 * Resolve project paths based on this configuration file.
 *
 * Current file:
 * project/config/wdio.ios.browserstack.conf.ts
 */
const configFilePath = fileURLToPath(import.meta.url);
const configDirectory = path.dirname(configFilePath);
const projectRoot = path.resolve(configDirectory, '..');

const featurePath = path.join(
    projectRoot,
    'test',
    'features',
    '**',
    '*.feature'
);

const stepDefinitionsPath = path.join(
    projectRoot,
    'test',
    'step-definitions',
    '**',
    '*.ts'
);

const logsDirectory = path.join(
    projectRoot,
    'logs'
);

const screenshotsDirectory = path.join(
    projectRoot,
    'screenshots'
);

const allureResultsDirectory = path.join(
    projectRoot,
    'reports',
    'allure-results'
);

const browserStackUsername =
    process.env.BROWSERSTACK_USERNAME;

const browserStackAccessKey =
    process.env.BROWSERSTACK_ACCESS_KEY;

const browserStackIosAppUrl =
    process.env.BROWSERSTACK_IOS_APP_URL;

/**
 * Validates all mandatory environment variables
 * before execution.
 */
function validateEnvironmentVariables(): void {
    const missingVariables: string[] = [];

    if (!browserStackUsername) {
        missingVariables.push(
            'BROWSERSTACK_USERNAME'
        );
    }

    if (!browserStackAccessKey) {
        missingVariables.push(
            'BROWSERSTACK_ACCESS_KEY'
        );
    }

    if (!browserStackIosAppUrl) {
        missingVariables.push(
            'BROWSERSTACK_IOS_APP_URL'
        );
    }

    if (missingVariables.length > 0) {
        throw new Error(
            [
                'Missing required environment variables:',
                missingVariables.join(', '),
            ].join(' ')
        );
    }
}

/**
 * Creates execution folders when they do not
 * already exist.
 */
function createExecutionDirectories(): void {
    const directories = [
        logsDirectory,
        screenshotsDirectory,
        allureResultsDirectory,
    ];

    for (const directory of directories) {
        fs.mkdirSync(
            directory,
            {
                recursive: true,
            }
        );
    }
}

/**
 * Converts test names into valid Windows filenames.
 */
function sanitizeFileName(
    value: string
): string {
    return value
        .trim()
        .replace(/[^a-zA-Z0-9-_]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
        .toLowerCase();
}

export const config: Options.Testrunner = {
    runner: 'local',

    /**
     * Absolute path for all Cucumber feature files.
     *
     * When --spec is used in the command line,
     * WebdriverIO executes only the provided feature file.
     */
    specs: [
        featurePath,
    ],

    exclude: [],

    /**
     * Runs one BrowserStack device session at a time.
     */
    maxInstances: 1,

    /**
     * BrowserStack authentication.
     */
    user: browserStackUsername,
    key: browserStackAccessKey,

    /**
     * BrowserStack integration.
     */
    services: [
        [
            'browserstack',
            {
                testObservability: true,

                testObservabilityOptions: {
                    projectName:
                        'Umami Mobile Automation',

                    buildName:
                        'iOS Staging',
                },
            },
        ],
    ],

    /**
     * BrowserStack iOS real-device capabilities.
     */
    capabilities: [
        {
            platformName: 'iOS',

            'appium:automationName':
                'XCUITest',

            'appium:deviceName':
                'iPhone 15',

            'appium:platformVersion':
                '17',

            'appium:app':
                browserStackIosAppUrl,

            /**
             * false:
             * Reinstalls and resets the application
             * before the test session.
             */
            'appium:noReset':
                false,

            /**
             * Allows more time between Appium commands.
             */
            'appium:newCommandTimeout':
                120,

            /**
             * Automatically accepts iOS system alerts,
             * including notification, location, and
             * camera permission dialogs.
             *
             * Remove or disable this capability later
             * when permission dialogs need to be tested.
             */
            'appium:autoAcceptAlerts':
                true,

            'bstack:options': {
                projectName:
                    'Umami Mobile Automation',

                buildName:
                    'iOS Staging',

                sessionName:
                    'Mobile authentication',

                debug:
                    true,

                video:
                    true,

                appiumLogs:
                    true,

                interactiveDebugging:
                    true,

                /**
                 * Keep disabled initially.
                 *
                 * Some applications use certificate
                 * pinning, which may conflict with
                 * BrowserStack network capture.
                 */
                networkLogs:
                    false,
            },
        },
    ],

    /**
     * WebdriverIO execution settings.
     */
    logLevel: 'info',

    outputDir: logsDirectory,

    bail: 0,

    waitforTimeout: 20_000,

    connectionRetryTimeout: 180_000,

    connectionRetryCount: 3,

    /**
     * Cucumber configuration.
     */
    framework: 'cucumber',

    cucumberOpts: {
        /**
         * Absolute path to all step-definition files.
         */
        import: [
            stepDefinitionsPath,
        ],

        /**
         * No global tag filter is applied.
         *
         * This allows any feature passed through --spec
         * to execute, regardless of whether it has
         * @smoke, @regression, @negative, or other tags.
         */
        tagExpression: '',

        /**
         * Maximum execution time for each Cucumber step.
         */
        timeout: 60_000,

        failFast: false,

        snippets: true,

        source: true,

        ignoreUndefinedDefinitions: false,
    },

    /**
     * Console and Allure reporters.
     */
    reporters: [
        'spec',

        [
            'allure',
            {
                outputDir:
                    allureResultsDirectory,

                disableWebdriverStepsReporting:
                    true,

                disableWebdriverScreenshotsReporting:
                    false,

                useCucumberStepReporter:
                    true,

                addConsoleLogs:
                    true,
            },
        ],
    ],

    /**
     * Runs before WebdriverIO creates the workers.
     */
    onPrepare(): void {
        validateEnvironmentVariables();
        createExecutionDirectories();

        console.log(
            'Starting Umami iOS BrowserStack execution'
        );

        console.log(
            `Feature path: ${featurePath}`
        );

        console.log(
            `Step definitions path: ${stepDefinitionsPath}`
        );

        console.log(
            'Cucumber tag filter: disabled'
        );

        console.log(
            'Device: iPhone 15'
        );

        console.log(
            'iOS version: 17'
        );
    },

    /**
     * Runs before every Cucumber scenario.
     */
    beforeScenario(
        _world,
        context
    ): void {
        const scenarioName =
            context.pickle.name;

        console.log(
            `Starting scenario: ${scenarioName}`
        );
    },

    /**
     * Captures evidence after a failed Cucumber step.
     */
    async afterStep(
        step,
        scenario,
        result
    ): Promise<void> {
        if (result.passed === true) {
            return;
        }

        const scenarioName =
            scenario.pickle.name;

        const stepName =
            step.pickleStep.text;

        const timestamp = new Date()
            .toISOString()
            .replace(/[:.]/g, '-');

        const screenshotFileName = [
            'ios',
            sanitizeFileName(
                scenarioName
            ),
            sanitizeFileName(
                stepName
            ),
            timestamp,
        ].join('_');

        const screenshotPath = path.join(
            screenshotsDirectory,
            `${screenshotFileName}.png`
        );

        try {
            await browser.saveScreenshot(
                screenshotPath
            );

            console.error(
                `Failed-step screenshot: ${screenshotPath}`
            );
        } catch (error) {
            console.error(
                'The failed-step screenshot could not be captured.',
                error
            );
        }
    },

    /**
     * Runs after each Cucumber scenario.
     */
    afterScenario(
        _world,
        result
    ): void {
        if (result.passed === true) {
            console.log(
                'Cucumber scenario completed successfully'
            );

            return;
        }

        console.error(
            'Cucumber scenario failed'
        );
    },

    /**
     * Runs when all workers finish.
     */
    onComplete(
        exitCode
    ): void {
        if (exitCode === 0) {
            console.log(
                'Umami iOS BrowserStack execution completed successfully'
            );

            return;
        }

        console.error(
            'Umami iOS BrowserStack execution finished ' +
            `with exit code ${exitCode}`
        );
    },
};