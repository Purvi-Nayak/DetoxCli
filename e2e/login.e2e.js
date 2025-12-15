

////Thi is Copiolot code from here

// describe('Positive Flow - Successful Login', () => {
//     beforeAll(async () => {
//         await device.launchApp({ newInstance: true });
//     });

//     beforeEach(async () => {
//         await device.reloadReactNative();
//     });

//     it('should login successfully and land on Home tab', async () => {
//         // Wait for login screen root to be ready
//         await waitFor(element(by.id('login-root')))
//             .toBeVisible()
//             .withTimeout(10000);

//         // Wait a moment for any animations to complete
//         await new Promise(resolve => setTimeout(resolve, 500));

//         // Enter valid email
//         await element(by.id('email-input')).tap();
//         await element(by.id('email-input')).replaceText('john@gmail.com');

//         // Enter valid password
//         await element(by.id('password-input')).tap();
//         await element(by.id('password-input')).replaceText('Password123!');

//         // Dismiss keyboard on Android so button is tappable
//         if (device.getPlatform() === 'android') {
//             await device.pressBack();
//         }

//         // Tap login button
//         await element(by.id('login-button')).tap();

//         // Wait for the Alert to appear and dismiss it
//         // Note: Detox doesn't handle native alerts well, you might need to adjust your code
//         // to use in-app notifications instead
//         await new Promise(resolve => setTimeout(resolve, 3000));

//         // Verify we navigated to Home by checking the home tab root
//         await waitFor(element(by.id('home-tab-root')))
//             .toBeVisible()
//             .withTimeout(15000);

//         // Verify welcome title is shown
//         await expect(element(by.id('welcome-title'))).toBeVisible();

//         // Verify we're on the Home tab
//         await expect(element(by.id('home-tab'))).toExist();
//     });

//     it('should show password with eye icon toggle', async () => {
//         // Wait for login screen
//         await waitFor(element(by.id('login-root')))
//             .toBeVisible()
//             .withTimeout(10000);

//         await new Promise(resolve => setTimeout(resolve, 500));

//         // Enter password
//         await element(by.id('password-input')).tap();
//         await element(by.id('password-input')).replaceText('Password123!');

//         // Tap eye icon to show password
//         await element(by.id('password-visibility-toggle')).tap();
//         await new Promise(resolve => setTimeout(resolve, 300));

//         // Tap eye icon to hide password
//         await element(by.id('password-visibility-toggle')).tap();
//         await new Promise(resolve => setTimeout(resolve, 300));

//         // Verify the toggle button still exists (basic check)
//         await expect(element(by.id('password-visibility-toggle'))).toBeVisible();
//     });

//     it('should navigate to registration when tapping register link', async () => {
//         // Wait for login screen
//         await waitFor(element(by.id('login-root')))
//             .toBeVisible()
//             .withTimeout(10000);

//         await new Promise(resolve => setTimeout(resolve, 500));

//         // Tap register link
//         await element(by.id('register-link')).tap();

//         // Verify registration screen appears
//         await waitFor(element(by.id('registration-screen-title')))
//             .toBeVisible()
//             .withTimeout(5000);

//         // Also check for registration root if you have it
//         await expect(element(by.id('registration-root'))).toBeVisible();
//     });
// });


//this is copiolot code till here
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
        console.log('✅ Login screen ready');

        // Enter credentials (mock user will be created automatically)
        console.log('🔑 Entering login credentials...');
        await element(by.id('email-input')).replaceText('john@gmail.com');

        await element(by.id('password-input')).tap();
        await element(by.id('password-input')).replaceText('Password123!');

        // Dismiss keyboard
        if (device.getPlatform() === 'android') {
            await device.pressBack();
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
            console.log('⚠️  Login screen still visible:', loginStillVisible);
        } catch (e) {
            console.log('✅ Login screen is gone (good!)');
        }

        try {
            // Check for loading indicator
            await expect(element(by.text('Signing In...'))).not.toBeVisible();
            console.log('✅ Loading state is done');
        } catch (e) {
            console.log('⚠️  Still loading or loading text not found');
        }

        // Try different selectors for home screen
        console.log('🔍 Trying to find home screen...');

        // Option 1: home-tab-root
        try {
            await waitFor(element(by.id('home-tab-root')))
                .toBeVisible()
                .withTimeout(5000);
            console.log('✅ Found home-tab-root');
        } catch (e) {
            console.log('❌ home-tab-root not found');
        }

        // Option 2: Try to find the home tab button
        try {
            await waitFor(element(by.id('home-tab')))
                .toBeVisible()
                .withTimeout(5000);
            console.log('✅ Found home-tab button');
        } catch (e) {
            console.log('❌ home-tab button not found');
        }

        // Option 3: Try to find welcome title
        try {
            await waitFor(element(by.id('welcome-title')))
                .toBeVisible()
                .withTimeout(5000);
            console.log('✅ Found welcome-title');
        } catch (e) {
            console.log('❌ welcome-title not found');
        }

        // Option 4: Try to find any text that might be on home screen
        try {
            await waitFor(element(by.text('Welcome Home')))
                .toBeVisible()
                .withTimeout(5000);
            console.log('✅ Found "Welcome Home" text');
        } catch (e) {
            console.log('❌ "Welcome Home" text not found');
        }

        // Take a screenshot for debugging
        await device.takeScreenshot('after-login-attempt');
        console.log('📸 Screenshot saved: after-login-attempt');

        // This will fail, but that's okay - we're debugging
        await expect(element(by.id('home-tab-root'))).toBeVisible();
    });
});


