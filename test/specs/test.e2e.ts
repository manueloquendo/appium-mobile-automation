import { expect } from '@wdio/globals';

describe('Umami Android application', () => {
    it('should launch the application successfully', async () => {
        await driver.pause(5000);

        const pageSource = await driver.getPageSource();

        expect(pageSource).toBeTruthy();
        expect(pageSource.length).toBeGreaterThan(0);

        console.log('Umami Android application launched successfully');
    });
});