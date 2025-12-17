# DetoxTest - React Native E2E Testing

![E2E Tests](https://github.com/Purvi-Nnpm run ios

# OR using Yarn

yarn ios

````

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## 🧪 E2E Testing with Detox

### **Running Tests Locally**

```bash
# Build the test APK
npm run detox:build-android

# Run all E2E tests
npm run detox:android-debug

# Run specific test file
npx detox test --configuration android.emu.debug e2e/login.e2e.js
npx detox test --configuration android.emu.debug e2e/navigation.e2e.js
npx detox test --configuration android.emu.debug e2e/profile.e2e.js
npx detox test --configuration android.emu.debug e2e/simple-error-test.e2e.js
npx detox test --configuration android.emu.debug e2e/edge-offline.e2e.js
````

### **Test Suites Overview**

#### 🔐 **Login Flow** (`login.e2e.js`)

- Mock user authentication (john@gmail.com + Password123!)
- Redux state management validation
- Navigation to Home tab after login

#### 🧭 **Navigation** (`navigation.e2e.js`)

- Complete tab navigation cycle
- Home → Details → Profile → Home
- UI state persistence testing

#### 👤 **Profile Editing** (`profile.e2e.js`)

- Inline name editing (John Doe → Purvi)
- Redux state updates
- Real-time UI re-rendering

#### ❌ **Error Validation** (`simple-error-test.e2e.js`)

- Empty field validation ("Email is required")
- Invalid format checking ("Please enter a valid email address")
- Authentication errors ("User not found", "Invalid password")

#### 📡 **Offline Scenarios** (`edge-offline.e2e.js`)

- Network interruption simulation
- App backgrounding during login
- Device orientation changes
- Performance stress testing

### **CI/CD Integration**

This project includes **automated E2E testing** with GitHub Actions:

- ✅ **Automatic testing** on every pull request
- ✅ **Comprehensive test coverage** (5 test suites)
- ✅ **Screenshot capture** on test failures
- ✅ **Artifact collection** for debugging
- ✅ **Branch protection** with quality gates

See [`CI_SETUP.md`](CI_SETUP.md) for complete CI/CD documentation.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).lows/🧪%20E2E%20Tests%20-%20Detox/badge.svg)
  [![Detox](https://img.shields.io/badge/Tested%20with-Detox-green.svg)](https://github.com/wix/Detox)
  [![React Native](https://img.shields.io/badge/React%20Native-0.80.2-blue.svg)](https://reactnative.dev)

A comprehensive React Native project with **complete E2E testing setup** using Detox, featuring automated CI/CD with GitHub Actions.

## 🧪 E2E Test Coverage

This project includes **5 comprehensive test suites** covering all critical user flows:

| Test Suite            | Coverage                                 | Status |
| --------------------- | ---------------------------------------- | ------ |
| **Login Flow**        | Authentication with mock users           | ✅     |
| **Navigation**        | Tab switching (Home ↔ Details ↔ Profile) | ✅     |
| **Profile Editing**   | Real state changes (John Doe → Purvi)    | ✅     |
| **Error Validation**  | Form validation & error handling         | ✅     |
| **Offline Scenarios** | Network interruptions & edge cases       | ✅     |

### 🎯 **Automated Testing Features:**

- ✅ **GitHub Actions CI/CD** - Every PR automatically tested
- ✅ **Real User Scenarios** - Mock authentication with Redux
- ✅ **Comprehensive Coverage** - Positive flows + edge cases
- ✅ **Artifact Collection** - Screenshots, logs, and reports
- ✅ **Network Simulation** - Offline testing without manual setup

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
