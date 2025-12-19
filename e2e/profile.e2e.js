
describe('Positive Flow - Profile Editing', () => {
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

        // Dismiss keyboard (platform-specific)
        if (device.getPlatform() === 'android') {
            await device.pressBack();
        } else if (device.getPlatform() === 'ios') {
            // iOS: Tap return key to dismiss keyboard
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

        // Debug: Let's check what elements are actually visible
        try {
            await expect(element(by.id('quick-edit-button'))).toBeVisible();
            console.log('✅ Quick Edit button found in profile header');
        } catch (error) {
            console.log('❌ quick-edit-button not found, trying inline-edit-button...');
            await expect(element(by.id('inline-edit-button'))).toBeVisible();
            console.log('✅ Inline Edit button found instead');
        }

        // Tap the edit button (try both possible IDs)
        try {
            await element(by.id('quick-edit-button')).tap();
            console.log('🔘 Tapped quick-edit-button');
        } catch (error) {
            await element(by.id('inline-edit-button')).tap();
            console.log('🔘 Tapped inline-edit-button');
        }
        console.log('🔘 Tapped inline edit button');
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Take screenshot to see edit mode
        await device.takeScreenshot('profile-in-edit-mode');

        // Wait for edit mode and verify text input is visible (try multiple possible IDs)
        let nameInputFound = false;
        const possibleInputIds = ['inline-name-input', 'name-input', 'edit-name-input'];

        for (const inputId of possibleInputIds) {
            try {
                await waitFor(element(by.id(inputId)))
                    .toBeVisible()
                    .withTimeout(3000);
                console.log(`✅ Found name input with ID: ${inputId}`);
                nameInputFound = true;

                // Clear and enter new name "Purvi" using replaceText (more reliable than typeText)
                await element(by.id(inputId)).replaceText('Purvi');
                console.log('📝 Entered new name: Purvi');
                break;
            } catch (error) {
                console.log(`❌ Input with ID '${inputId}' not found, trying next...`);
            }
        }

        if (!nameInputFound) {
            throw new Error('❌ No name input field found with any of the expected testIDs');
        }

        await new Promise(resolve => setTimeout(resolve, 500));

        // Platform-specific keyboard dismissal
        if (device.getPlatform() === 'android') {
            await device.pressBack();
            console.log('📱 Android: Dismissed keyboard with back button');
        } else if (device.getPlatform() === 'ios') {
            // iOS: Try return key on the active input
            try {
                for (const inputId of possibleInputIds) {
                    try {
                        await element(by.id(inputId)).tapReturnKey();
                        console.log(`📱 iOS: Dismissed keyboard with return key on ${inputId}`);
                        break;
                    } catch (e) {
                        // Continue to next input ID
                    }
                }
            } catch (error) {
                console.log('📱 iOS: Could not dismiss keyboard with return key');
            }
        }
        await new Promise(resolve => setTimeout(resolve, 500));

        // Find and tap save button (try multiple possible IDs)
        const possibleSaveIds = ['inline-save-button', 'save-button', 'edit-save-button'];
        let saveButtonFound = false;

        for (const saveId of possibleSaveIds) {
            try {
                await expect(element(by.id(saveId))).toBeVisible();
                await element(by.id(saveId)).tap();
                console.log(`🔘 Tapped save button with ID: ${saveId}`);
                saveButtonFound = true;
                break;
            } catch (error) {
                console.log(`❌ Save button with ID '${saveId}' not found, trying next...`);
            }
        }

        if (!saveButtonFound) {
            throw new Error('❌ No save button found with any of the expected testIDs');
        }
        console.log('🔘 Tapped inline save button');

        // Take screenshot after save
        await device.takeScreenshot('profile-after-save');

        // Check if button text changed using testID to verify onPress was called
        try {
            await expect(element(by.id('save-button-clicked'))).toBeVisible();
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