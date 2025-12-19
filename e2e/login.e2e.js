describe('Positive Flow - Successful Login', () => {
    beforeAll(async () => {
        await device.launchApp({ newInstance: true });
    });

    beforeEach(async () => {
        await device.reloadReactNative();
    });

    it('should login successfully and land on Home tab - DEBUG VERSION', async () => {
        // Wait for PersistGate + Redux store to load completely
        await device.disableSynchronization();
        console.log('⏳ Waiting 3 seconds for PersistGate + Redux loading...');
        await new Promise(resolve => setTimeout(resolve, 3000));
        await device.enableSynchronization();

        // Wait for login screen
        await waitFor(element(by.id('login-root')))
            .toBeVisible()
            .withTimeout(10000);
        console.log(' Login screen ready');

        // Enter credentials (mock user will be created automatically)
        console.log(' Entering login credentials...');
        await element(by.id('email-input')).replaceText('john@gmail.com');

        await element(by.id('password-input')).tap();
        await element(by.id('password-input')).replaceText('Password123!');

        // Dismiss keyboard
        if (device.getPlatform() === 'android') {
            await device.pressBack();  // This only works on Android
        }

        // For iOS, you might need different interactions
        if (device.getPlatform() === 'ios') {
            // iOS keyboard dismiss might be different
            await element(by.id('email-input')).tapReturnKey();
        }

        // Tap login button
        await element(by.id('login-button')).tap();

        console.log('🔍 Login button tapped, waiting for navigation...');

        // Wait longer to see what happens
        await new Promise(resolve => setTimeout(resolve, 5000));

        // Try to find different possible elements
        try {
            // Check if we're still on login screen
            const loginStillVisible = await element(by.id('login-root')).getAttributes();
            console.log('  Login screen still visible:', loginStillVisible);
        } catch (e) {
            console.log(' Login screen is gone (good!)');
        }

        try {
            // Check for loading indicator using testID instead of text
            await expect(element(by.id('loading-indicator'))).not.toBeVisible();
            console.log('✅ Loading state is done');
        } catch (e) {
            console.log('⚠️  Still loading or loading indicator not found');
        }

        // Try different selectors for home screen
        console.log(' Trying to find home screen...');

        // Option 1: home-tab-root
        try {
            await waitFor(element(by.id('home-tab-root')))
                .toBeVisible()
                .withTimeout(5000);
            console.log(' Found home-tab-root');
        } catch (e) {
            console.log(' home-tab-root not found');
        }

        // Option 2: Try to find the home tab button
        try {
            await waitFor(element(by.id('home-tab')))
                .toBeVisible()
                .withTimeout(5000);
            console.log(' Found home-tab button');
        } catch (e) {
            console.log(' home-tab button not found');
        }

        // Option 3: Try to find welcome title
        try {
            await waitFor(element(by.id('welcome-title')))
                .toBeVisible()
                .withTimeout(5000);
            console.log(' Found welcome-title');
        } catch (e) {
            console.log(' welcome-title not found');
        }

        // Option 4: Try to find welcome text using testID
        try {
            await waitFor(element(by.id('welcome-home-text')))
                .toBeVisible()
                .withTimeout(5000);
            console.log(' Found "Welcome Home" text');
        } catch (e) {
            console.log(' "Welcome Home" text not found');
        }

        // Take a screenshot for debugging
        await device.takeScreenshot('after-login-attempt');
        console.log(' Screenshot saved: after-login-attempt');

        // This will fail, but that's okay - we're debugging
        await expect(element(by.id('home-tab-root'))).toBeVisible();
    });
});


