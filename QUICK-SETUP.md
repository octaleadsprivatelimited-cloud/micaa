# Quick Setup Guide - Fix Permissions Error

If you're seeing the error: **"Missing or insufficient permissions"** when trying to save categories/products/etc., follow these steps:

## ⚠️ CRITICAL: Deploy Firestore Security Rules

**This is the most important step!** Without deploying rules, you cannot save any data.

### Step 1: Deploy Firestore Security Rules

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **svn-global**
3. Navigate to **Firestore Database** > **Rules** tab
4. **Copy the ENTIRE contents** of `firestore.rules` file from this project
5. **Paste** into the rules editor (replace any existing rules)
6. Click **Publish** button
7. **Wait for confirmation** that rules are published

**See `DEPLOY-RULES.md` for detailed instructions and troubleshooting.**

## Step 2: Create Admin User in Firebase Authentication

1. In Firebase Console, navigate to **Authentication** > **Users** tab
2. Click **Add user**
3. Enter:
   - **Email**: Your admin email (e.g., `admin@example.com`)
   - **Password**: A secure password
4. Click **Add user**

## Step 3: Test

1. Clear your browser cache
2. Refresh the application
3. Try logging in with an admin email
4. The permissions error should be gone!

## Troubleshooting

- **Still seeing permissions error?**
  - Make sure you're logged in with Firebase Auth
  - Verify the user exists in Firebase Console > Authentication > Users
  - Check that email/password are correct
  - Wait a few seconds after publishing rules (they may take a moment to propagate)

- **"Access Denied" error?**
  - Make sure you created the user in Firebase Authentication (not Firestore)
  - Verify you're using the correct email and password
  - Check that Firestore security rules are deployed

- **Can't upload images?**
  - Check that you're authenticated (logged in)
  - Verify file size is under 2MB
  - Check that file type is supported (JPEG, PNG, WEBP, GIF)
