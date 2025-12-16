// Test Log Capture Setup
const fs = require('fs');
const path = require('path');

// Create artifacts directory if it doesn't exist
const artifactsDir = path.join(__dirname, '../artifacts');
if (!fs.existsSync(artifactsDir)) {
    fs.mkdirSync(artifactsDir, { recursive: true });
}
// Global test setup
beforeAll(async () => {
    // Capture all console logs
    const originalConsole = { ...console };
    const logFile = path.join(artifactsDir, `test-logs-${Date.now()}.txt`);
    const logStream = fs.createWriteStream(logFile, { flags: 'a' });

    // Override console methods to also write to file
    console.log = (...args) => {
        const message = `[LOG] ${new Date().toISOString()}: ${args.join(' ')}\n`;
        logStream.write(message);
        originalConsole.log(...args);
    };

    console.error = (...args) => {
        const message = `[ERROR] ${new Date().toISOString()}: ${args.join(' ')}\n`;
        logStream.write(message);
        originalConsole.error(...args);
    };

    console.warn = (...args) => {
        const message = `[WARN] ${new Date().toISOString()}: ${args.join(' ')}\n`;
        logStream.write(message);
        originalConsole.warn(...args);
    };

    // Log test start
    console.log('🚀 Test suite starting...');
});

// Global test teardown
afterAll(async () => {
    console.log('🏁 Test suite completed');
});
