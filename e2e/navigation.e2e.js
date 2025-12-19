describe('Navigation Between Core Screens', () => {
    beforeAll(async () => {
        await device.launchApp({ newInstance: true });

        // LOGIN ONCE FOR ALL TESTS - Use EXACT same approach as working login.e2e.js
        await device.disableSynchronization();
        console.log(' Waiting 3 seconds for PersistGate + Redux loading...');
        await new Promise(resolve => setTimeout(resolve, 3000));
        await device.enableSynchronization();

        // Wait for login screen (same as working test)
        await waitFor(element(by.id('login-root')))
            .toBeVisible()
            .withTimeout(10000);
        console.log(' Login screen ready');

        // Enter credentials (same pattern as working test)
        console.log(' Entering login credentials...');
        await element(by.id('email-input')).replaceText('john@gmail.com');

        await element(by.id('password-input')).tap();
        await element(by.id('password-input')).replaceText('Password123!');

        // Dismiss keyboard (platform-specific)
        if (device.getPlatform() === 'android') {
            await device.pressBack();
        } else if (device.getPlatform() === 'ios') {
            // iOS: Tap return key or tap outside to dismiss keyboard
            await element(by.id('password-input')).tapReturnKey();
        }

        // Tap login button
        await element(by.id('login-button')).tap();
        console.log(' Login button tapped, waiting for navigation...');

        // Wait longer like the working test does
        await new Promise(resolve => setTimeout(resolve, 5000));

        // Verify we reached home screen (same pattern)
        await waitFor(element(by.id('home-tab-root')))
            .toBeVisible()
            .withTimeout(15000);

        console.log('✅ Successfully logged in and on Home tab - READY FOR ALL NAVIGATION TESTS');
    });

    afterEach(async () => {
        // 📸 Take screenshot after each test for CI artifacts (same pattern as login.e2e.js)
        await device.takeScreenshot('navigation-test-screenshot');
    });

    it('should navigate from Home to Details screen', async () => {
        console.log('🧭 Testing Home → Details navigation');

        // Verify we're on Home screen first
        await expect(element(by.id('home-tab-root'))).toBeVisible();
        console.log(' Confirmed on Home screen');

        // Navigate to Details tab
        await element(by.id('details-tab')).tap();
        console.log(' Tapped Details tab');

        // Give time for navigation
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Verify Details screen content using testIDs
        await expect(element(by.id('details-screen-root'))).toBeVisible();
        await expect(element(by.id('details-title'))).toBeVisible();
        console.log(' Successfully navigated to Details screen');
    });

    it('should navigate from Details to Profile screen', async () => {
        console.log(' Testing Details → Profile navigation');

        // First go to Details
        await element(by.id('details-tab')).tap();
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log(' On Details screen');

        // Then go to Profile
        await element(by.id('profile-tab')).tap();
        console.log(' Tapped Profile tab');
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Verify Profile screen content using testIDs
        await expect(element(by.id('profile-screen-root'))).toBeVisible();
        await expect(element(by.id('profile-title'))).toBeVisible();
        await expect(element(by.id('profile-user-name'))).toBeVisible();
        console.log(' Successfully navigated to Profile screen');
    });

    it('should navigate back to Home from Profile', async () => {
        console.log(' Testing Profile → Home navigation');

        // First go to Profile
        await element(by.id('profile-tab')).tap();
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log(' On Profile screen');

        // Then back to Home
        await element(by.id('home-tab')).tap();
        console.log(' Tapped Home tab');
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Verify back on Home screen
        await expect(element(by.id('home-tab-root'))).toBeVisible();
        await expect(element(by.id('welcome-title'))).toBeVisible();
        console.log(' Successfully navigated back to Home screen');
    });

    it('should complete full navigation cycle', async () => {
        console.log(' Testing complete navigation cycle');

        // Home → Details → Profile → Home
        await element(by.id('details-tab')).tap();
        await new Promise(resolve => setTimeout(resolve, 1000));
        await expect(element(by.id('details-title'))).toBeVisible();
        console.log(' Switched to Details');

        await element(by.id('profile-tab')).tap();
        await new Promise(resolve => setTimeout(resolve, 1000));
        await expect(element(by.id('profile-title'))).toBeVisible();
        console.log(' Switched to Profile');

        await element(by.id('home-tab')).tap();
        await new Promise(resolve => setTimeout(resolve, 1000));
        await expect(element(by.id('welcome-title'))).toBeVisible();
        console.log(' Switched back to Home');

        console.log(' Navigation cycle completed successfully');
    });

    it('should maintain bottom tab visibility', async () => {
        console.log(' Testing tab bar persistence');

        // Check tabs are always visible
        await expect(element(by.id('home-tab'))).toBeVisible();
        await expect(element(by.id('details-tab'))).toBeVisible();
        await expect(element(by.id('profile-tab'))).toBeVisible();
        console.log(' All tabs visible on Home');

        // Switch to Details and check again
        await element(by.id('details-tab')).tap();
        await new Promise(resolve => setTimeout(resolve, 800));

        await expect(element(by.id('home-tab'))).toBeVisible();
        await expect(element(by.id('details-tab'))).toBeVisible();
        await expect(element(by.id('profile-tab'))).toBeVisible();
        console.log(' All tabs still visible on Details');

        console.log(' Tab visibility test complete!');
    });
});