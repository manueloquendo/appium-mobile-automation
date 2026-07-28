import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

type BrowserStackConfig = {
    username: string;
    accessKey: string;
    androidAppId: string;
    iosAppId: string;
    testUserEmail: string;
    testUserPassword: string;
    invalidEmail: string;
    incorrectPassword: string;
};

function readBrowserStackConfig(): BrowserStackConfig {
    const currentFilePath = fileURLToPath(import.meta.url);
    const configDirectory = path.dirname(currentFilePath);
    const projectRoot = path.resolve(configDirectory, '..');
    const configPath = path.join(
        projectRoot,
        'config',
        'browserstack.config.json'
    );

    if (!fs.existsSync(configPath)) {
        throw new Error(
            `Missing BrowserStack config file at ${configPath}. Add your credentials there.`
        );
    }

    const parsedConfig = JSON.parse(
        fs.readFileSync(configPath, 'utf8')
    ) as Partial<BrowserStackConfig>;

    const missingFields: string[] = [];

    if (!parsedConfig.username) {
        missingFields.push('username');
    }

    if (!parsedConfig.accessKey) {
        missingFields.push('accessKey');
    }

    if (!parsedConfig.androidAppId) {
        missingFields.push('androidAppId');
    }

    if (!parsedConfig.iosAppId) {
        missingFields.push('iosAppId');
    }

    if (!parsedConfig.testUserEmail) {
        missingFields.push('testUserEmail');
    }

    if (!parsedConfig.testUserPassword) {
        missingFields.push('testUserPassword');
    }

    if (!parsedConfig.invalidEmail) {
        missingFields.push('invalidEmail');
    }

    if (!parsedConfig.incorrectPassword) {
        missingFields.push('incorrectPassword');
    }

    if (missingFields.length > 0) {
        throw new Error(
            `Missing BrowserStack config values in ${configPath}: ${missingFields.join(', ')}`
        );
    }

    return {
        username: parsedConfig.username!,
        accessKey: parsedConfig.accessKey!,
        androidAppId: parsedConfig.androidAppId!,
        iosAppId: parsedConfig.iosAppId!,
        testUserEmail: parsedConfig.testUserEmail!,
        testUserPassword: parsedConfig.testUserPassword!,
        invalidEmail: parsedConfig.invalidEmail!,
        incorrectPassword: parsedConfig.incorrectPassword!,
    };
}

export const browserStackConfig = readBrowserStackConfig();
