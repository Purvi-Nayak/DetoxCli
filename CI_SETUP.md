# 🚀 CI/CD Setup - GitHub Actions for Detox E2E Tests

## 📋 Overview

This project now includes **automated E2E testing** using GitHub Actions with Detox. Every pull request and push to main branches will automatically run your complete test suite.

## 🎯 What Gets Tested

### **5 Complete Test Suites:**

1. **`login.e2e.js`** - Authentication flow with mock users
2. **`navigation.e2e.js`** - Tab navigation (Home ↔ Details ↔ Profile)
3. **`profile.e2e.js`** - Profile editing (John Doe → Purvi)
4. **`simple-error-test.e2e.js`** - Validation & error handling
5. **`edge-offline.e2e.js`** - Offline scenarios & interruptions

### **Test Coverage:**

- ✅ **Positive Flows**: Login, navigation, profile editing
- ✅ **Validation**: Empty fields, invalid formats, wrong credentials
- ✅ **Edge Cases**: Network interruptions, offline scenarios
- ✅ **Real Scenarios**: Mock users, Redux state, form validation

## 🔧 CI Workflows

### **1. Main E2E Tests** (`.github/workflows/e2e-tests.yml`)

**Triggers:**

- Pull requests to `main`/`develop` branches
- Push to `main`/`develop` branches
- Manual trigger

**What it does:**

- 🤖 Starts Android emulator (Pixel 6, API 30)
- 📦 Installs dependencies and builds APK
- 🧪 Runs all 5 test suites sequentially
- 📸 Captures screenshots on failures
- 📊 Uploads test artifacts and logs

### **2. Individual Test Runner** (`.github/workflows/individual-tests.yml`)

**Triggers:**

- Manual trigger with test file selection

**What it does:**

- 🎯 Run specific test file or all tests
- 🔧 Faster feedback for debugging specific scenarios
- 📋 Focused artifact collection

## 📊 Artifacts & Debugging

### **Automatic Artifact Collection:**

```
artifacts/
├── 📸 Screenshots (failed tests)
├── 📋 Test logs & console output
├── 🔧 Device hierarchy (for debugging)
└── 📊 Test reports (JUnit format)
```

### **Artifact Retention:**

- **Screenshots**: 14 days (for failed tests)
- **Test logs**: 7 days (all tests)
- **General artifacts**: 7 days

## 🚀 Running Tests

### **Automatic Triggers:**

```bash
# Tests run automatically on:
git push origin main                    # ✅ Push to main
git push origin develop                 # ✅ Push to develop
# Pull requests to main/develop         # ✅ PR validation
```

### **Manual Triggers:**

1. Go to **Actions** tab in GitHub
2. Select **"🧪 E2E Tests - Detox"** or **"🎯 Individual Test Suite Runner"**
3. Click **"Run workflow"**
4. Choose branch and test file (for individual runner)

## 📱 Emulator Configuration

### **CI Emulator Setup:**

```yaml
Profile: Pixel 6
API Level: 30 (Android 11)
Architecture: x86_64
RAM: 4GB (full tests) / 2GB (individual)
Disk: 6GB (full tests) / 4GB (individual)
GPU: swiftshader_indirect
```

### **Optimizations:**

- ✅ **No GUI**: `-no-window` for faster startup
- ✅ **No audio**: `-noaudio` to reduce overhead
- ✅ **Disabled animations**: Faster test execution
- ✅ **Caching**: Gradle & npm dependencies cached

## 🎯 Test Results

### **Success Indicators:**

- ✅ **All 5 test files pass**
- ✅ **No failed assertions**
- ✅ **Clean artifact generation**
- ✅ **Performance within timeout limits**

### **Failure Indicators:**

- ❌ **Any test assertion fails**
- ❌ **Network/offline tests fail**
- ❌ **Navigation failures**
- ❌ **Timeout exceeded (45min limit)**

## 🔧 Debugging Failed Tests

### **1. Check Artifacts:**

```bash
# Download from GitHub Actions:
- Test screenshots (failed-test-screenshots-30.zip)
- Test logs (test-logs-30.zip)
- Full artifacts (detox-test-artifacts-30.zip)
```

### **2. Review Logs:**

```bash
# Common failure patterns:
- "Element by.id('...') not found" → UI timing issues
- "Network Error" → Offline test configuration
- "Login failed" → Mock user credentials
- "Navigation timeout" → Screen transition delays
```

### **3. Local Reproduction:**

```bash
# Run the same test locally:
npm run detox:build-android
npx detox test --configuration android.emu.debug e2e/[failing-test].e2e.js
```

## 📊 Performance Metrics

### **Expected Execution Times:**

- **login.e2e.js**: ~2-3 minutes
- **navigation.e2e.js**: ~3-4 minutes
- **profile.e2e.js**: ~2-3 minutes
- **simple-error-test.e2e.js**: ~4-5 minutes
- **edge-offline.e2e.js**: ~5-7 minutes
- **Total Runtime**: ~20-25 minutes

### **Timeout Settings:**

- **Individual tests**: 30 minutes
- **Full test suite**: 45 minutes
- **Step timeout**: 10 minutes per test file

## 🛡️ Branch Protection

### **Recommended Settings:**

```bash
# In GitHub repo settings:
✅ Require status checks to pass
✅ Require "🤖 Android E2E Tests" to pass
✅ Require up-to-date branches
✅ Include administrators
```

## 🎉 Benefits

### **Quality Assurance:**

- ✅ **Every PR validated** before merge
- ✅ **Regression prevention** with comprehensive tests
- ✅ **Real user scenarios** tested automatically
- ✅ **Cross-platform consistency** (Android focus)

### **Developer Experience:**

- ✅ **Fast feedback** on code changes
- ✅ **Automatic artifact collection** for debugging
- ✅ **Visual failure analysis** with screenshots
- ✅ **Individual test execution** for targeted fixes

### **Production Readiness:**

- ✅ **Deployment confidence** with passing E2E tests
- ✅ **User flow validation** before releases
- ✅ **Edge case coverage** including offline scenarios
- ✅ **Performance monitoring** with execution time tracking

---

## 🚀 Your CI is Ready!

Your Detox E2E testing is now fully automated with GitHub Actions. Every code change will be validated against your comprehensive test suite, ensuring high-quality releases and preventing regressions.

**Next steps:**

1. Commit and push these workflow files
2. Create a test pull request to see CI in action
3. Review artifacts and fine-tune as needed
4. Set up branch protection rules for quality gates
