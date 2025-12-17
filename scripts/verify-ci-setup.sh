#!/bin/bash

# 🔧 CI Setup Verification Script
# This script verifies that your GitHub Actions CI is properly configured

echo "🔍 Verifying CI Setup for Detox E2E Tests..."
echo ""

# Check if workflow files exist
echo "📋 Checking workflow files..."
if [ -f ".github/workflows/e2e-tests.yml" ]; then
    echo "✅ Main E2E workflow found"
else
    echo "❌ Main E2E workflow missing"
    exit 1
fi

if [ -f ".github/workflows/individual-tests.yml" ]; then
    echo "✅ Individual test workflow found"
else
    echo "❌ Individual test workflow missing"
    exit 1
fi

# Check test files
echo ""
echo "📋 Checking E2E test files..."
test_files=(
    "e2e/login.e2e.js"
    "e2e/navigation.e2e.js" 
    "e2e/profile.e2e.js"
    "e2e/simple-error-test.e2e.js"
    "e2e/edge-offline.e2e.js"
)

for file in "${test_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file found"
    else
        echo "❌ $file missing"
        exit 1
    fi
done

# Check package.json scripts
echo ""
echo "📋 Checking npm scripts..."
if grep -q "detox:build-android" package.json; then
    echo "✅ Build script found"
else
    echo "❌ Build script missing"
fi

if grep -q "detox:android-debug" package.json; then
    echo "✅ Test script found"
else
    echo "❌ Test script missing"
fi

# Check Detox configuration
echo ""
echo "📋 Checking Detox configuration..."
if [ -f ".detoxrc.js" ]; then
    echo "✅ Detox config found"
else
    echo "❌ Detox config missing"
fi

# Check Android build files
echo ""
echo "📋 Checking Android configuration..."
if [ -f "android/app/build.gradle" ]; then
    echo "✅ Android build.gradle found"
else
    echo "❌ Android build.gradle missing"
fi

if [ -d "android/app/src/androidTest" ]; then
    echo "✅ Android test directory found"
else
    echo "❌ Android test directory missing"
fi

echo ""
echo "🎉 CI Setup Verification Complete!"
echo ""
echo "📋 Next Steps:"
echo "1. Commit and push these workflow files to GitHub"
echo "2. Create a test pull request to trigger CI"
echo "3. Check GitHub Actions tab to see tests running"
echo "4. Review test artifacts and screenshots"
echo ""
echo "🔗 Useful Commands:"
echo "  Local test:     npm run detox:android-debug"
echo "  Build APK:      npm run detox:build-android"
echo "  Single test:    npx detox test --configuration android.emu.debug e2e/login.e2e.js"
echo ""
echo "📊 Your E2E testing is ready for CI/CD! 🚀"