# 🤖 Detox CI Configuration Guide - GitHub Actions

## 📋 Overview

This guide covers how to configure Detox E2E test runs on GitHub Actions CI, including emulator management, build processes, and artifact collection.

---

## 🚀 Step 1: Start Android Emulator

### **Emulator Configuration:**
```yaml
# .github/workflows/e2e-tests.yml
- name: 📱 Run E2E Tests on Android Emulator
  uses: reactivecircus/android-emulator-runner@v2
  with:
    api-level: 30                    # Android API level
    target: google_apis              # Google APIs included
    arch: x86_64                     # 64-bit architecture
    profile: pixel_6                 # Device profile (matches your local setup)
    disk-size: 6000M                 # 6GB disk space
    heap-size: 600M                  # 600MB heap memory
    ram-size: 4096M                  # 4GB RAM allocation
    emulator-options: >              # Performance optimizations:
      -no-window                     # Headless mode (no GUI)
      -gpu swiftshader_indirect      # Software GPU rendering
      -noaudio                       # Disable audio (faster)
      -no-boot-anim                  # Skip boot animation
      -camera-back none              # No camera simulation
    disable-animations: true         # Disable UI animations for faster tests
```

### **Emulator Performance Tuning:**
```yaml
# Additional optimizations for CI:
- name: 🔧 Optimize Emulator Performance
  run: |
    # Increase ADB timeout for slower CI environment
    echo "export ADB_INSTALL_TIMEOUT=10" >> $GITHUB_ENV
    
    # Set hardware acceleration
    echo "hw.gpu.enabled=yes" >> ~/.android/avd/test.avd/config.ini
    echo "hw.gpu.mode=swiftshader_indirect" >> ~/.android/avd/test.avd/config.ini
```

---

## 🏗️ Step 2: Install Detox Build

### **Build Dependencies Setup:**
```yaml
# 1. Java Environment
- name: ☕ Setup Java
  uses: actions/setup-java@v4
  with:
    java-version: '17'               # Java 17 for modern Android builds
    distribution: 'temurin'          # Eclipse Temurin distribution

# 2. Android SDK
- name: 🤖 Setup Android SDK
  uses: android-actions/setup-android@v3

# 3. SDK License Acceptance
- name: 📱 Accept Android SDK licenses
  run: yes | $ANDROID_HOME/cmdline-tools/latest/bin/sdkmanager --licenses
```

### **Build Process:**
```yaml
# 4. Build Detox Test APK
- name: 🏗️ Build Detox Android
  run: |
    echo "🔨 Building Detox test APK..."
    npm run detox:build-android      # Your build script
    echo "✅ Detox build completed"
```

### **Build Optimization with Caching:**
```yaml
# Cache Gradle dependencies for faster builds
- name: 📦 Cache Gradle dependencies
  uses: actions/cache@v4
  with:
    path: |
      ~/.gradle/caches
      ~/.gradle/wrapper
      android/.gradle
    key: ${{ runner.os }}-gradle-${{ hashFiles('**/*.gradle*', '**/gradle-wrapper.properties') }}
    restore-keys: |
      ${{ runner.os }}-gradle-

# Cache npm dependencies
- name: 📦 Cache npm dependencies
  uses: actions/cache@v4
  with:
    path: ~/.npm
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
    restore-keys: |
      ${{ runner.os }}-node-
```

---

## 🧪 Step 3: Run Tests and Upload Artifacts

### **Test Execution:**
```yaml
script: |
  echo "🚀 Starting E2E Test Suite..."
  echo "📱 Emulator ready, running all 5 test files:"
  
  # List all test files for verification
  ls -la e2e/*.e2e.js
  
  echo "🧪 Running complete E2E test suite..."
  npm run detox:android-debug        # Execute all tests
  
  echo "✅ All E2E tests completed!"
```

### **Individual Test File Execution:**
```bash
# Alternative: Run tests individually for better debugging
npx detox test --configuration android.emu.debug e2e/login.e2e.js
npx detox test --configuration android.emu.debug e2e/navigation.e2e.js
npx detox test --configuration android.emu.debug e2e/profile.e2e.js
npx detox test --configuration android.emu.debug e2e/simple-error-test.e2e.js
npx detox test --configuration android.emu.debug e2e/edge-offline.e2e.js
```

### **Comprehensive Artifact Upload:**
```yaml
# 1. Upload All Test Artifacts (Always)
- name: 📊 Upload Test Artifacts
  uses: actions/upload-artifact@v4
  if: always()                       # Upload even if tests fail
  with:
    name: detox-test-artifacts-${{ matrix.api-level }}
    path: |
      artifacts/                     # Detox artifacts folder
      android/app/build/reports/     # Android build reports
    retention-days: 7                # Keep for 1 week

# 2. Upload Screenshots (On Failure)
- name: 📸 Upload Screenshots (Failed Tests)
  uses: actions/upload-artifact@v4
  if: failure()                      # Only when tests fail
  with:
    name: failed-test-screenshots-${{ matrix.api-level }}
    path: artifacts/**/*.png         # All PNG screenshots
    retention-days: 14               # Keep for 2 weeks

# 3. Upload Test Logs (Always)
- name: 📋 Upload Test Logs
  uses: actions/upload-artifact@v4
  if: always()
  with:
    name: test-logs-${{ matrix.api-level }}
    path: |
      artifacts/**/*.log             # Detox logs
      artifacts/**/*.json            # Test result JSON files
    retention-days: 7
```

---

## 📊 Step 4: Test Results Reporting

### **Automated Results Summary:**
```yaml
report:
  name: 📊 Test Results Summary
  runs-on: ubuntu-latest
  needs: e2e-android
  if: always()

  steps:
    - name: 📊 Test Results Summary
      run: |
        echo "## 🧪 E2E Test Results Summary" >> $GITHUB_STEP_SUMMARY
        echo "" >> $GITHUB_STEP_SUMMARY
        echo "### 📱 Test Suite Coverage:" >> $GITHUB_STEP_SUMMARY
        echo "- ✅ **Login Flow** - Authentication with mock users" >> $GITHUB_STEP_SUMMARY
        echo "- ✅ **Navigation** - Tab switching (Home ↔ Details ↔ Profile)" >> $GITHUB_STEP_SUMMARY
        echo "- ✅ **Profile Editing** - Name changes (John Doe → Purvi)" >> $GITHUB_STEP_SUMMARY
        echo "- ✅ **Validation** - Error handling (empty fields, invalid format)" >> $GITHUB_STEP_SUMMARY
        echo "- ✅ **Offline Scenarios** - Network interruptions" >> $GITHUB_STEP_SUMMARY
        
        if [ "${{ needs.e2e-android.result }}" == "success" ]; then
          echo "✅ **All tests passed!** Your app is ready for deployment." >> $GITHUB_STEP_SUMMARY
        else
          echo "❌ **Tests failed.** Check artifacts for debugging." >> $GITHUB_STEP_SUMMARY
        fi
```

---

## 🛡️ Step 5: Advanced Configuration

### **Environment Variables:**
```yaml
env:
  # Detox Configuration
  DETOX_CONFIGURATION: android.emu.debug
  
  # Android Configuration
  ANDROID_SDK_ROOT: /usr/local/lib/android/sdk
  ANDROID_HOME: /usr/local/lib/android/sdk
  
  # Performance Tuning
  NODE_OPTIONS: --max_old_space_size=4096
  GRADLE_OPTS: -Xmx2048m -XX:MaxPermSize=512m
```

### **Timeout Configuration:**
```yaml
timeout-minutes: 45                  # Overall job timeout
  
# Step-level timeouts:
- name: 🏗️ Build Detox
  timeout-minutes: 15                # Build timeout
  
- name: 📱 Run Tests
  timeout-minutes: 30                # Test execution timeout
```

### **Parallel Test Execution (Advanced):**
```yaml
strategy:
  matrix:
    test-suite: 
      - login.e2e.js
      - navigation.e2e.js
      - profile.e2e.js
      - simple-error-test.e2e.js
      - edge-offline.e2e.js
  fail-fast: false                   # Continue other tests if one fails

steps:
  - name: 🧪 Run Individual Test Suite
    run: npx detox test --configuration android.emu.debug e2e/${{ matrix.test-suite }}
```

---

## 🔧 Troubleshooting Common Issues

### **Emulator Won't Start:**
```bash
# Increase emulator startup timeout
timeout-minutes: 10

# Add emulator health check
- name: 🏥 Check Emulator Health
  run: |
    adb wait-for-device
    adb shell getprop sys.boot_completed
```

### **Build Failures:**
```bash
# Clean build cache
- name: 🧹 Clean Build Cache
  run: |
    cd android
    ./gradlew clean
    rm -rf ~/.gradle/caches/
```

### **Test Timeouts:**
```bash
# Increase Detox timeouts
export DETOX_EMULATOR_TIMEOUT=120000
export DETOX_APP_LAUNCH_TIMEOUT=60000
```

---

## 📈 Performance Metrics

### **Expected Execution Times:**
- **Setup Phase**: 5-8 minutes
- **Build Phase**: 8-12 minutes  
- **Test Execution**: 15-25 minutes
- **Artifact Upload**: 2-3 minutes
- **Total**: 30-45 minutes (first run), 20-25 minutes (cached runs)

### **Resource Usage:**
- **CPU**: 2-core ubuntu-latest
- **Memory**: 4GB RAM allocation
- **Storage**: 6GB disk space
- **Network**: High-speed for downloads

---

## 🎯 Best Practices

### **1. Optimize for Speed:**
- Use caching for dependencies
- Disable animations and audio
- Use headless emulator mode
- Parallel test execution when possible

### **2. Reliability:**
- Add health checks for emulator
- Use appropriate timeouts
- Implement retry logic for flaky tests
- Clean build environments

### **3. Debugging:**
- Always upload artifacts
- Capture screenshots on failures
- Comprehensive logging
- Step-by-step execution visibility

---

## 🎉 Your CI Configuration

Your current setup includes:
- ✅ **Optimized emulator configuration** (Pixel 6, API 30)
- ✅ **Comprehensive build caching** for faster execution
- ✅ **All 5 test suites** automated execution
- ✅ **Rich artifact collection** for debugging
- ✅ **Professional reporting** with summaries

**Your Detox CI is production-ready!** 🚀