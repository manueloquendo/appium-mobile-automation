import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import type { Options } from '@wdio/types';
import { browser } from '@wdio/globals';

/**
 * Resolve project paths based on this configuration file.
 *
 * Current file:
 * project/config/wdio.android.browserstack.conf.ts
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

const browserStackAndroidAppUrl =
    process.env.BROWSERSTACK_ANDROID_APP_URL;

/**
 * Validates all mandatory environment variables before execution.
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

    if (!browserStackAndroidAppUrl) {
        missingVariables.push(
            'BROWSERSTACK_ANDROID_APP_URL'
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
 * Creates execution folders when they do not already exist.
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
 * Converts scenario and step names into valid Windows filenames.
 */
function sanitizeFileName(value: string): string {
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
     * Default feature path.
     *
     * When --spec is provided, WebdriverIO will execute
     * only the selected feature file.
     */
    specs: [
        featurePath,
    ],

    exclude: [],

    /**
     * Keep one instance while creating and debugging tests.
     *
     * This avoids running multiple BrowserStack sessions
     * at the same time.
     */
    maxInstances: 1,

    /**
     * BrowserStack authentication.
     */
    user: browserStackUsername,
    key: browserStackAccessKey,

    /**
     * BrowserStack service configuration.
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
                        'Android Staging',
                },
            },
        ],
    ],

    /**
     * BrowserStack Android real-device capabilities.
     */
    capabilities: [
        {
            platformName: 'Android',

            'appium:automationName':
                'UiAutomator2',

            'appium:deviceName':
                'Samsung Galaxy S23',

            'appium:platformVersion':
                '13.0',

            'appium:app':
                browserStackAndroidAppUrl,

            /**
             * Grants Android runtime permissions automatically.
             */
            'appium:autoGrantPermissions':
                true,

            /**
             * Start the application with clean application data.
             *
             * This helps each independent feature begin
             * from a predictable state.
             */
            'appium:noReset':
                false,

            /**
             * Do not uninstall and reinstall the application
             * for every execution.
             */
            'appium:fullReset':
                false,

            'appium:newCommandTimeout':
                120,

            'bstack:options': {
                projectName:
                    'Umami Mobile Automation',

                buildName:
                    'Android Staging',

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
                 * Keep BrowserStack network capture disabled.
                 *
                 * Some mobile applications use certificate
                 * pinning and may conflict with network capture.
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
         * No fixed tag filter is applied.
         *
         * During development, the feature file will be selected
         * using the WebdriverIO --spec argument.
         */
        tagExpression: '',

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
     * Runs before WebdriverIO creates workers.
     */
    onPrepare(): void {
        validateEnvironmentVariables();
        createExecutionDirectories();

        console.log(
            'Starting Umami Android BrowserStack execution'
        );

        console.log(
            `Feature path: ${featurePath}`
        );

        console.log(
            `Step definitions path: ${stepDefinitionsPath}`
        );

        console.log(
            'Device: Samsung Galaxy S23'
        );

        console.log(
            'Android version: 13.0'
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
            sanitizeFileName(scenarioName),
            sanitizeFileName(stepName),
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
     * Runs after each scenario.
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
    onComplete(exitCode): void {
        if (exitCode === 0) {
            console.log(
                'Umami Android BrowserStack execution completed successfully'
            );

            return;
        }

        console.error(
            `Umami Android BrowserStack execution finished with exit code ${exitCode}`
        );
    },
};