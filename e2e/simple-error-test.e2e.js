describe('Validation Error Tests', () => {
    beforeAll(async () => {
        await device.launchApp({ newInstance: true });
    });

    beforeEach(async () => {
        await device.reloadReactNative();
        await device.disableSynchronization();
        console.log(' Waiting for app to load...');
        await new Promise(resolve => setTimeout(resolve, 3000));
        await device.enableSynchronization();

        await waitFor(element(by.id('login-root')))
            .toBeVisible()
            .withTimeout(10000);
        console.log(' Login screen ready');
    });

    it('should show "Email is required" when email field is empty', async () => {
        console.log(' Testing empty email field validation...');

        // Leave email empty, enter password only
        await element(by.id('password-input')).tap();
        await element(by.id('password-input')).replaceText('Password123!');

        // Tap outside to blur and trigger validation
        await element(by.id('login-root')).tap();
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Tap login button to trigger form validation
        await element(by.id('login-button')).tap();

        console.log(' Looking for "Email is required" error...');
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Check for validation error
        await waitFor(element(by.text('Email is required')))
            .toBeVisible()
            .withTimeout(5000);

        console.log(' "Email is required" error appeared below email field!');
    });

    it('should show "Password is required" when password field is empty', async () => {
        console.log(' Testing empty password field validation...');

        // Enter email only, leave password empty
        await element(by.id('email-input')).replaceText('test@gmail.com');

        // Tap outside to blur and trigger validation
        await element(by.id('login-root')).tap();
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Tap login button to trigger form validation
        await element(by.id('login-button')).tap();

        console.log(' Looking for "Password is required" error...');
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Check for validation error
        await waitFor(element(by.text('Password is required')))
            .toBeVisible()
            .withTimeout(5000);

        console.log(' "Password is required" error appeared below password field!');
    });

    it('should show "Please enter a valid email address" for invalid email format', async () => {
        console.log(' Testing invalid email format validation...');

        // Enter invalid email format
        await element(by.id('email-input')).replaceText('purviemail.com');
        await element(by.id('password-input')).tap();
        await element(by.id('password-input')).replaceText('Password123!');

        // Tap outside to blur and trigger validation
        await element(by.id('login-root')).tap();
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Tap login button to trigger form validation
        await element(by.id('login-button')).tap();

        console.log(' Looking for invalid email format error...');
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Check for validation error
        await waitFor(element(by.text('Please enter a valid email address')))
            .toBeVisible()
            .withTimeout(5000);

        console.log(' Invalid email format error appeared below email field!');
    });

    it('should show "User not found" for non-existent user with both fields filled', async () => {
        console.log(' Testing non-existent user with both email and password...');

        // Enter valid format email but non-existent user + password
        await element(by.id('email-input')).replaceText('purvi@gmail.com');
        await element(by.id('password-input')).tap();
        await element(by.id('password-input')).replaceText('Password123!');

        // Dismiss keyboard
        if (device.getPlatform() === 'android') {
            await device.pressBack();
        }

        // Tap login button to submit
        await element(by.id('login-button')).tap();

        console.log(' Looking for user not found error...');
        await new Promise(resolve => setTimeout(resolve, 3000));

        // Check for login error (not validation error)
        await waitFor(element(by.text('User not found. Please check your email or register first.')))
            .toBeVisible()
            .withTimeout(5000);

        console.log(' "User not found" error appeared for purvi@gmail.com!');
    });

    it('should show "Invalid email or password" for wrong password with existing user', async () => {
        console.log('🔍 Testing wrong password for john@gmail.com...');

        // Enter john email but wrong password
        await element(by.id('email-input')).replaceText('john@gmail.com');
        await element(by.id('password-input')).tap();
        await element(by.id('password-input')).replaceText('WrongPassword123!');

        // Dismiss keyboard
        if (device.getPlatform() === 'android') {
            await device.pressBack();
        }

        // Tap login button to submit
        await element(by.id('login-button')).tap();

        console.log(' Looking for invalid password error...');
        await new Promise(resolve => setTimeout(resolve, 3000));

        // Check for login error
        await waitFor(element(by.text('Invalid email or password')))
            .toBeVisible()
            .withTimeout(5000);

        console.log(' "Invalid email or password" error appeared for wrong password!');
    });
});