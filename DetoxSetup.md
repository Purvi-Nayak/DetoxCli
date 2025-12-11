# Detox Setup Guide (Android)

This document describes how to set up and run Detox end‑to‑end tests for the `DetoxTest` React Native app on **Android** using the existing project configuration.

---

## 1. Prerequisites

- macOS with Xcode / Android Studio installed
- Node.js \>= 18
- React Native CLI environment set up (Android SDK, Java, etc.)
- Android emulator created (this project uses `Pixel_6_API_30`)

Verify your emulator exists:

```bash
emulator -list-avds
# should include: Pixel_6_API_30
```

---

## 2. Install JS Dependencies

From the project root (`DetoxTest`):

```bash
npm install
```

Detox is already listed in `devDependencies` in `package.json`:

```json
"devDependencies": {
  "detox": "^20.46.0",
  // ...other dev deps
}
```

Install the Detox CLI globally (if not already installed):

```bash
npm install -g detox-cli
```

---

## 3. Initialize Detox (already done)

Detox has been initialized in this project and generated the following files:

- `.detoxrc.js` – Detox configuration
- `e2e/jest.config.js` – Jest configuration for e2e tests
- `e2e/starter.test.js` – Example Detox test

If you ever need to re‑initialize on a new project, you can run:

```bash
detox init
```

---

## 4. Detox Configuration Overview

The main config file is `.detoxrc.js`.

Key Android parts:

```js
apps: {
  'android.debug': {
    type: 'android.apk',
    binaryPath: 'android/app/build/outputs/apk/debug/app-debug.apk',
    build: 'cd android && ./gradlew assembleDebug assembleAndroidTest -DtestBuildType=debug',
    reversePorts: [8081],
  },
  'android.release': {
    type: 'android.apk',
    binaryPath: 'android/app/build/outputs/apk/release/app-release.apk',
    build: 'cd android && ./gradlew assembleRelease assembleAndroidTest -DtestBuildType=release',
  },
},

devices: {
  attached: {
    type: 'android.attached',
    device: { adbName: '.*' },
  },
  emulator: {
    type: 'android.emulator',
    device: { avdName: 'Pixel_6_API_30' },
  },
},

configurations: {
  'android.att.debug': { device: 'attached', app: 'android.debug' },
  'android.att.release': { device: 'attached', app: 'android.release' },
  'android.emu.debug': { device: 'emulator', app: 'android.debug' },
  'android.emu.release': { device: 'emulator', app: 'android.release' },
}
```

- **binaryPath** – where Detox will look for the APK.
- **build** – command Detox runs when you call `detox build`.
- **configurations** – named combinations of app + device.

---

## 5. Android Gradle Configuration

### 5.1 Root `android/build.gradle`

`android/build.gradle` includes Detox repository and Kotlin config:

```groovy
buildscript {
    ext {
        buildToolsVersion = "35.0.0"
        minSdkVersion = 24
        compileSdkVersion = 35
        targetSdkVersion = 35
        ndkVersion = "27.1.12297006"
        kotlinVersion = "2.1.20"
    }
    repositories {
        google()
        mavenCentral()
    }
    dependencies {
        classpath("com.android.tools.build:gradle")
        classpath("com.facebook.react:react-native-gradle-plugin")
        classpath("org.jetbrains.kotlin:kotlin-gradle-plugin")
    }
}

apply plugin: "com.facebook.react.rootproject"

allprojects {
    repositories {
        google()
        mavenCentral()
        maven { url 'https://www.jitpack.io' }
        maven {
            url("$rootDir/../node_modules/detox/Detox-android")
        }
    }
}
```

Important points:

- `minSdkVersion` is at least 18 (here 24).
- Kotlin plugin and Detox Android repo are configured.

### 5.2 App `android/app/build.gradle`

Relevant snippets:

```groovy
android {
    ndkVersion rootProject.ext.ndkVersion
    buildToolsVersion rootProject.ext.buildToolsVersion
    compileSdk rootProject.ext.compileSdkVersion

    namespace "com.detoxtest"
    defaultConfig {
        applicationId "com.detoxtest"
        minSdkVersion rootProject.ext.minSdkVersion
        targetSdkVersion rootProject.ext.targetSdkVersion
        versionCode 1
        versionName "1.0"
        testBuildType System.getProperty('testBuildType', 'debug')
        testInstrumentationRunner 'androidx.test.runner.AndroidJUnitRunner'
    }

    signingConfigs {
        debug {
            storeFile file('debug.keystore')
            storePassword 'android'
            keyAlias 'androiddebugkey'
            keyPassword 'android'
        }
    }

    buildTypes {
        debug {
            signingConfig signingConfigs.debug
        }
        release {
            signingConfig signingConfigs.debug
            minifyEnabled enableProguardInReleaseBuilds
            proguardFiles getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro"
            proguardFile "${rootProject.projectDir}/../node_modules/detox/android/detox/proguard-rules-app.pro"
        }
    }
}

dependencies {
    androidTestImplementation('com.wix:detox:+')
    implementation 'androidx.appcompat:appcompat:1.1.0'

    // The version of react-native is set by the React Native Gradle Plugin
    implementation("com.facebook.react:react-android")

    if (hermesEnabled.toBoolean()) {
        implementation("com.facebook.react:hermes-android")
    } else {
        implementation jscFlavor
    }
}
```

Key points:

- `testBuildType` and `testInstrumentationRunner` are required for Detox tests.
- Detox adds ProGuard rules for release builds.
- `androidTestImplementation('com.wix:detox:+')` pulls Detox native test library.

---

## 6. Android Test Harness (`DetoxTest.java`)

File: `android/app/src/androidTest/java/com/detoxtest/DetoxTest.java`

```java
package com.detoxtest;

import com.wix.detox.Detox;
import com.wix.detox.config.DetoxConfig;

import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;

import androidx.test.ext.junit.runners.AndroidJUnit4;
import androidx.test.filters.LargeTest;
import androidx.test.rule.ActivityTestRule;

@RunWith(AndroidJUnit4.class)
@LargeTest
public class DetoxTest {
    @Rule
    public ActivityTestRule<MainActivity> mActivityRule = new ActivityTestRule<>(MainActivity.class, false, false);

    @Test
    public void runDetoxTests() {
        DetoxConfig detoxConfig = new DetoxConfig();
        detoxConfig.idlePolicyConfig.masterTimeoutSec = 90;
        detoxConfig.idlePolicyConfig.idleResourceTimeoutSec = 60;
        detoxConfig.rnContextLoadTimeoutSec = (BuildConfig.DEBUG ? 180 : 60);

        Detox.runTests(mActivityRule, detoxConfig);
    }
}
```

- Package name matches `applicationId` (`com.detoxtest`).
- Uses `MainActivity` as the entry activity.

---

## 7. Network Security Config (Cleartext for Detox)

File: `android/app/src/main/res/xml/network_security_config.xml`

```xml
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <domain-config cleartextTrafficPermitted="true">
        <domain includeSubdomains="true">10.0.2.2</domain>
        <domain includeSubdomains="true">localhost</domain>
    </domain-config>
</network-security-config>
```

Registered in `android/app/src/main/AndroidManifest.xml`:

```xml
<application
  android:name=".MainApplication"
  android:label="@string/app_name"
  android:icon="@mipmap/ic_launcher"
  android:roundIcon="@mipmap/ic_launcher_round"
  android:allowBackup="false"
  android:theme="@style/AppTheme"
  android:supportsRtl="true"
  android:networkSecurityConfig="@xml/network_security_config">
  <!-- activities here -->
</application>
```

This allows Detox to communicate with the Node.js test runner over HTTP.

---

## 8. E2E Test Setup

### 8.1 Jest Config

File: `e2e/jest.config.js`:

```js
/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  rootDir: '..',
  testMatch: ['<rootDir>/e2e/**/*.test.js'],
  testTimeout: 120000,
  maxWorkers: 1,
  globalSetup: 'detox/runners/jest/globalSetup',
  globalTeardown: 'detox/runners/jest/globalTeardown',
  reporters: ['detox/runners/jest/reporter'],
  testEnvironment: 'detox/runners/jest/testEnvironment',
  verbose: true,
};
```

### 8.2 Example Test

File: `e2e/starter.test.js` (current simplified version):

```js
describe('DetoxTest App', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('should launch app successfully', async () => {
    // This test verifies that Detox setup is working correctly.
    await device.reloadReactNative();

    // Simple wait to let the app render; if no errors, Detox is wired correctly.
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log('✅ Detox test passed - app launched successfully!');
  });
});
```

You can replace this with real UI assertions once you add `testID` props into your React Native components.

Example:

```tsx
// In App.tsx
<Text testID="welcome-text">Welcome!</Text>
```

```js
// In e2e test
await expect(element(by.id('welcome-text'))).toBeVisible();
```

---

## 9. Build & Run Commands

### 9.1 Build Debug APK for Detox

```bash
detox build --configuration android.emu.debug
```

This runs the `build` command from `.detoxrc.js`:

```bash
cd android && ./gradlew assembleDebug assembleAndroidTest -DtestBuildType=debug
```

Produces:

- App APK: `android/app/build/outputs/apk/debug/app-debug.apk`
- Test APK: `android/app/build/outputs/apk/androidTest/debug/app-debug-androidTest.apk`

### 9.2 Run Tests on Emulator

1. Start the emulator (if not already running):

```bash
emulator -avd Pixel_6_API_30
```

2. Run Detox tests:

```bash
detox test --configuration android.emu.debug
```

Detox will:

- Build the app (if not already built)
- Install app + test APKs on the emulator
- Run Jest with the config in `e2e/jest.config.js`

---

## 10. Troubleshooting Tips

- If Detox CLI is not found:

  ```bash
  npm install -g detox-cli
  ```

- If Gradle build fails, try running the Android build directly:

  ```bash
  cd android
  ./gradlew assembleDebug assembleAndroidTest -DtestBuildType=debug
  ```

- To see all available AVDs:

  ```bash
  emulator -list-avds
  ```

- If tests cannot find elements, make sure you:
  - Expose elements with `testID` in React Native
  - Use `by.id('your-test-id')` or `by.text('Your Text')` accordingly.

---

## 11. Summary

In this project, Detox is fully wired for Android with:

- Configured `.detoxrc.js` for Android debug/release and `Pixel_6_API_30` emulator
- Gradle scripts updated for Detox (root + app level)
- Native Android test harness (`DetoxTest.java`)
- Network security config for Detox communication
- Jest + basic Detox test file under `e2e/`

To run end‑to‑end tests on Android debug:

```bash
npm install          # once
npm install -g detox-cli  # once

detox build --configuration android.emu.debug
emulator -avd Pixel_6_API_30  # if not already running
detox test --configuration android.emu.debug
```
