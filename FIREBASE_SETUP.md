# Firebase Project Setup Guide

## Manual Firebase Project Creation

Due to permission restrictions with CLI project creation, please follow these steps to create your Firebase project manually:

### Step 1: Create Firebase Project
1. Visit [Firebase Console](https://console.firebase.google.com)
2. Click "Create a project" or "Add project"
3. Enter project name: **Arrgh Collect**
4. Project ID will be auto-generated (or you can choose: `arrgh-collect-xxxx`)
5. Accept Firebase terms and continue
6. Enable Google Analytics (optional but recommended)
7. Choose or create a Google Analytics account
8. Click "Create project"

### Step 2: Enable Firebase App Hosting
1. In your Firebase project dashboard, go to **Build** → **App Hosting**
2. Click "Get started" 
3. Follow the setup wizard to enable App Hosting

### Step 3: Get Firebase Configuration
1. In Firebase Console, go to **Project settings** (gear icon)
2. Scroll down to "Your apps" section
3. Click "Add app" → Web app (</>) 
4. Register your app with name: **Arrgh Collect**
5. Check "Also set up Firebase Hosting" if prompted
6. Copy the Firebase configuration object

### Step 4: Update Local Environment
After getting your Firebase config, update the `.env.local` file with:

```bash
# Replace with your actual Firebase configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com  
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### Step 5: Update Firebase Configuration
Update `.firebaserc` with your actual project ID:

```json
{
  "projects": {
    "default": "your-actual-project-id"
  }
}
```

### Step 6: Connect GitHub Repository
1. In Firebase Console → **App Hosting**
2. Click "Get started" and choose "GitHub"
3. Authorize Firebase to access your GitHub account
4. Select repository: `pbonneville/arrgh-collect`
5. Choose branch: `main`
6. Configure build settings (should auto-detect Next.js)
7. Complete the setup

### Step 7: Deploy
Once connected, every push to main branch will automatically deploy to Firebase App Hosting!

## Alternative: Manual CLI Setup
If you prefer CLI after manual project creation:

```bash
# Set the project
firebase use your-actual-project-id

# Initialize App Hosting (if not done via console)
firebase init apphosting

# Deploy manually
firebase deploy --only apphosting
```

## Troubleshooting
- **Permission errors**: Your Google account may need additional IAM roles
- **Organization policies**: Contact your organization admin if you're part of a Google Workspace
- **Billing**: Ensure billing is enabled for Firebase App Hosting features

---

**Next Steps**: After manual setup, your CI/CD pipeline will work automatically with GitHub integration!