# Admin Setup Guide

## How Admin Authentication Works

The admin panel uses **Firebase Authentication** for login. Any user who can successfully authenticate with Firebase Auth will have admin access.

## Setting Up Admin Users

### Step 1: Create User in Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `svn-global`
3. Navigate to **Authentication** > **Users** tab
4. Click **Add user**
5. Enter:
   - **Email**: Your admin email (e.g., `admin@example.com`)
   - **Password**: A secure password
6. Click **Add user**

### Step 2: Login to Admin Panel

1. Go to `/admin` route in your application
2. Enter the email and password you created in Firebase Console
3. Click **Sign In**
4. You'll be redirected to the admin dashboard

## Important Notes

- **No separate admin collection needed** - Any authenticated Firebase user is automatically an admin
- **Firebase Auth handles all authentication** - Users are managed in Firebase Console
- **Password reset** - Users can reset passwords through Firebase Auth (if enabled)
- **Multiple admins** - You can create as many admin users as needed in Firebase Console

## Security

- All admin routes are protected - users must be authenticated
- Only users with valid Firebase Auth credentials can access the admin panel
- Make sure to use strong passwords for admin accounts
- Consider enabling 2FA in Firebase Console for additional security

## Troubleshooting

**"Access Denied" error:**
- Make sure you're logged in with Firebase Auth
- Check that the email/password are correct
- Verify the user exists in Firebase Console > Authentication > Users

**Can't login:**
- Verify the user exists in Firebase Authentication
- Check that email/password are correct
- Make sure Firestore security rules allow authenticated access
