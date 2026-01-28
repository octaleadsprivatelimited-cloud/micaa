# Deploy Firestore Security Rules

## Critical: You MUST deploy Firestore rules for the admin panel to work!

The "Missing or insufficient permissions" error means your Firestore security rules haven't been deployed yet.

## Quick Deploy Steps

### Option 1: Firebase Console (Easiest)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **svn-global**
3. Navigate to **Firestore Database** > **Rules** tab
4. **Copy the entire contents** of `firestore.rules` file from this project
5. **Paste** into the rules editor (replace any existing rules)
6. Click **Publish** button
7. Wait for confirmation that rules are published

### Option 2: Firebase CLI

1. Install Firebase CLI (if not already installed):
   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```bash
   firebase login
   ```

3. Initialize Firebase in your project (if not already done):
   ```bash
   firebase init firestore
   ```
   - Select "Use an existing project"
   - Choose "svn-global"
   - When asked about firestore.rules, say **No** (we already have the file)
   - When asked about firestore.indexes, say **No**

4. Deploy rules:
   ```bash
   firebase deploy --only firestore:rules
   ```

## Verify Rules Are Deployed

1. Go to Firebase Console > Firestore Database > Rules
2. You should see the rules from `firestore.rules` file
3. The rules should show:
   - `allow read: if true;` for public collections
   - `allow create/update/delete: if isAuthenticated();` for authenticated operations

## After Deploying

1. **Refresh your browser** (hard refresh: Ctrl+Shift+R or Cmd+Shift+R)
2. **Try creating a category again**
3. The permissions error should be gone!

## Troubleshooting

**Still getting permissions error?**
- Make sure you're logged in (check top right corner)
- Verify rules are actually published (check Firebase Console)
- Wait 10-30 seconds after publishing (rules may take a moment to propagate)
- Clear browser cache and try again
- Check browser console for more detailed error messages

**Rules not saving?**
- Make sure you have proper permissions in Firebase project
- Check that you're in the correct Firebase project
- Try copying rules in smaller chunks if the editor is slow
