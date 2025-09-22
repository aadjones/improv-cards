#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * Generate QR code for Expo Go from app.json configuration
 *
 * This script:
 * 1. Reads project ID from app.json
 * 2. Extracts SDK version from dependencies
 * 3. Generates QR code in terminal and saves as SVG
 */

function main() {
  try {
    // Read app.json
    const appJsonPath = path.join(__dirname, '..', 'app.json');
    const appConfig = JSON.parse(fs.readFileSync(appJsonPath, 'utf8'));

    // Read package.json for SDK version
    const packageJsonPath = path.join(__dirname, '..', 'package.json');
    const packageConfig = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    // Extract project ID
    const projectId = appConfig.expo?.extra?.eas?.projectId;
    if (!projectId) {
      throw new Error('Project ID not found in app.json. Run "eas update:configure" first.');
    }

    // Extract SDK version from expo dependency
    const expoVersion = packageConfig.dependencies?.expo;
    if (!expoVersion) {
      throw new Error('Expo version not found in package.json');
    }

    // Parse SDK version (e.g., "^54.0.0" -> "54.0.0")
    const sdkVersion = expoVersion.replace(/[^0-9.]/g, '');
    const majorVersion = sdkVersion.split('.')[0];

    // Get current git branch for channel name (matches eas update --auto behavior)
    const gitBranch = execSync('git branch --show-current', { encoding: 'utf8' }).trim();

    // Construct Expo Go URLs for both platforms
    const iosUrl = `exp://u.expo.dev/${projectId}?runtime-version=exposdk:${majorVersion}.0.0&channel-name=${gitBranch}&platform=ios`;
    const androidUrl = `exp://u.expo.dev/${projectId}?runtime-version=exposdk:${majorVersion}.0.0&channel-name=${gitBranch}&platform=android`;

    console.log('🎯 Generated Expo Go URLs:');
    console.log('iOS:', iosUrl);
    console.log('Android:', androidUrl);
    console.log('');

    // Check if qrcode is installed
    try {
      execSync('which qrcode', { stdio: 'ignore' });
    } catch (error) {
      console.log('📦 Installing qrcode package...');
      execSync('npm install -g qrcode', { stdio: 'inherit' });
    }

    // Generate terminal QR codes
    console.log('📱 iOS QR Code:');
    execSync(`npx qrcode-terminal "${iosUrl}"`, { stdio: 'inherit' });
    console.log('');

    console.log('📱 Android QR Code:');
    execSync(`npx qrcode-terminal "${androidUrl}"`, { stdio: 'inherit' });
    console.log('');

    // Generate SVG QR codes
    const iosSvgPath = path.join(__dirname, '..', 'qr-code-ios.svg');
    const androidSvgPath = path.join(__dirname, '..', 'qr-code-android.svg');
    execSync(`qrcode -t svg -o "${iosSvgPath}" "${iosUrl}"`, { stdio: 'inherit' });
    execSync(`qrcode -t svg -o "${androidSvgPath}" "${androidUrl}"`, { stdio: 'inherit' });
    console.log(`💾 iOS SVG QR code saved to: ${iosSvgPath}`);
    console.log(`💾 Android SVG QR code saved to: ${androidSvgPath}`);
    console.log('');

    console.log('✅ QR Code Generation Complete!');
    console.log('');
    console.log('📋 Usage Instructions:');
    console.log('• iOS: Use Camera app to scan QR code');
    console.log('• Android: Use Expo Go app "Scan QR Code" feature');
    console.log('• The QR code works permanently without dev server');
    console.log('• Share the SVG file or scan from terminal');
  } catch (error) {
    console.error('❌ Error generating QR code:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { main };
