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

    // Construct Expo Go URL
    const expoUrl = `exp://u.expo.dev/${projectId}?channel-name=main&runtime-version=exposdk:${majorVersion}.0.0`;

    console.log('🎯 Generated Expo Go URL:');
    console.log(expoUrl);
    console.log('');

    // Check if qrcode is installed
    try {
      execSync('which qrcode', { stdio: 'ignore' });
    } catch (error) {
      console.log('📦 Installing qrcode package...');
      execSync('npm install -g qrcode', { stdio: 'inherit' });
    }

    // Generate terminal QR code
    console.log('📱 Terminal QR Code:');
    execSync(`npx qrcode-terminal "${expoUrl}"`, { stdio: 'inherit' });
    console.log('');

    // Generate SVG QR code
    const svgPath = path.join(__dirname, '..', 'qr-code.svg');
    execSync(`qrcode -t svg -o "${svgPath}" "${expoUrl}"`, { stdio: 'inherit' });
    console.log(`💾 SVG QR code saved to: ${svgPath}`);
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