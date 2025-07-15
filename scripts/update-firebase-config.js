#!/usr/bin/env node

/**
 * Script to update Firebase configuration
 * Usage: node scripts/update-firebase-config.js
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

async function updateFirebaseConfig() {
  console.log('🔧 Firebase Configuration Updater\n');
  console.log('Please provide your Firebase project configuration:\n');

  try {
    const projectId = await askQuestion('Project ID: ');
    const apiKey = await askQuestion('API Key: ');
    const authDomain = await askQuestion('Auth Domain (or press Enter for default): ') || `${projectId}.firebaseapp.com`;
    const storageBucket = await askQuestion('Storage Bucket (or press Enter for default): ') || `${projectId}.appspot.com`;
    const messagingSenderId = await askQuestion('Messaging Sender ID: ');
    const appId = await askQuestion('App ID: ');

    // Update .env.local
    const envContent = `# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=${apiKey}
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=${authDomain}
NEXT_PUBLIC_FIREBASE_PROJECT_ID=${projectId}
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=${storageBucket}
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=${messagingSenderId}
NEXT_PUBLIC_FIREBASE_APP_ID=${appId}

# Development
NODE_ENV=development
`;

    fs.writeFileSync('.env.local', envContent);
    console.log('✅ Updated .env.local');

    // Update .firebaserc
    const firebaseRcContent = {
      projects: {
        default: projectId
      }
    };

    fs.writeFileSync('.firebaserc', JSON.stringify(firebaseRcContent, null, 2));
    console.log('✅ Updated .firebaserc');

    console.log('\n🎉 Firebase configuration updated successfully!');
    console.log('\nNext steps:');
    console.log('1. Run: npm run dev');
    console.log('2. Test your application locally');
    console.log('3. Commit and push to trigger deployment');

  } catch (error) {
    console.error('❌ Error updating configuration:', error.message);
  } finally {
    rl.close();
  }
}

updateFirebaseConfig();