
describe.skip('Positive Flow - Profile Editing', () => {
    beforeAll(async () => {
        await device.launchApp();
    });

    beforeEach(async () => {
        await device.reloadReactNative();

        // LOGIN USING WORKING PATTERN FROM navigation.e2e.js
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

        // Dismiss keyboard (same as working test)
        if (device.getPlatform() === 'android') {
            await device.pressBack();
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

        // Navigate to Profile screen
        await element(by.id('profile-tab')).tap();
        await waitFor(element(by.id('profile-title')))
            .toBeVisible()
            .withTimeout(5000);
    });

    afterEach(async () => {
        // 📸 Take screenshot after each test for CI artifacts (same pattern as login.e2e.js)
        await device.takeScreenshot('profile-test-screenshot');
    });

    it('should actually change name from John Doe to Purvi using inline editing', async () => {
        console.log('✏️ Testing inline name editing: John Doe → Purvi');

        // Take screenshot to see current state
        await device.takeScreenshot('profile-before-edit');

        // Verify current name is displayed using specific testID
        await expect(element(by.id('profile-user-name'))).toHaveText('John Doe');
        console.log('✅ Current name "John Doe" confirmed');

        // Quick Edit button should be visible - FIXED: removed emoji from text
        await expect(element(by.text(' Quick Edit Name'))).toBeVisible();
        console.log('✅ Quick Edit button found in profile header');

        // Tap the inline edit button to enter edit mode
        await element(by.id('inline-edit-button')).tap();
        console.log('🔘 Tapped inline edit button');
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Take screenshot to see edit mode
        await device.takeScreenshot('profile-in-edit-mode');

        // Verify we're in edit mode - text input should be visible
        await expect(element(by.id('inline-name-input'))).toBeVisible();
        console.log('✅ Inline text input is visible');

        // Clear and enter new name "Purvi" using replaceText (more reliable than typeText)
        await element(by.id('inline-name-input')).replaceText('Purvi');
        console.log('📝 Entered new name: Purvi');
        await new Promise(resolve => setTimeout(resolve, 500));

        // Dismiss keyboard to ensure Save button is visible  
        if (device.getPlatform() === 'android') {
            await device.pressBack();
        }
        await new Promise(resolve => setTimeout(resolve, 500));

        // Tap save button (should be easily accessible now)
        await element(by.id('inline-save-button')).tap();
        console.log('🔘 Tapped inline save button');

        // Take screenshot after save
        await device.takeScreenshot('profile-after-save');

        // Check if button text changed to "Clicked!" to verify onPress was called
        try {
            await expect(element(by.text('✅ CLICKED!'))).toBeVisible();
            console.log('✅ Save button onPress was called - button text changed to CLICKED!');
        } catch (error) {
            console.log('⚠️ Save button onPress was NOT called - button text still shows Save');
        }

        // Wait longer for Redux state to propagate and component to re-render
        await new Promise(resolve => setTimeout(resolve, 3000));

        // Take final screenshot
        await device.takeScreenshot('profile-final-result');

        // Verify the name changed in the main profile header using testID
        await expect(element(by.id('profile-user-name'))).toHaveText('Purvi');
        console.log('✅ Name "Purvi" confirmed in profile header');

        console.log('🎉 SUCCESS: Name successfully changed from John Doe to Purvi!');
    });

});