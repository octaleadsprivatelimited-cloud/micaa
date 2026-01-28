# Firebase Setup Guide

This project uses **Firebase** as the backend:
- **Firestore** for database (categories, products, gallery, blog, etc.) - **including images stored as base64**
- **Firebase Auth** for authentication

## Image Storage in Firestore

Images are stored as base64 data URLs directly in Firestore documents. This means:
- No separate storage service needed
- Images are part of your Firestore database
- No CORS configuration required
- Images are stored alongside other data in the same collections
- Maximum file size: 2MB (to keep Firestore documents manageable)
- Supported formats: JPEG, JPG, PNG, WEBP, GIF

## Firestore Collections

The following collections are used in Firestore:

- `product_categories` - Product categories
- `products` - Products
- `gallery` - Gallery images
- `blog_posts` - Blog posts
- `services` - Services
- `testimonials` - Testimonials
- `faqs` - FAQs
- `contact_messages` - Contact form messages
- `firebase_admins` - Admin users (email list)

## Firestore Security Rules

**Important**: You must configure Firestore security rules for the app to work properly.

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `svn-global`
3. Navigate to **Firestore Database** > **Rules**
4. Copy the contents of `firestore.rules` file
5. Paste into the rules editor
6. Click **Publish**

The rules file (`firestore.rules`) is included in the project root. It provides:
- Public read access for public data (products, gallery, blog, etc.)
- Authenticated write access for admin operations
- Special handling for `firebase_admins` collection (authenticated read only)
- Contact messages: anyone can create, authenticated users can read/update/delete


## Admin Setup

Admin access is controlled through **Firebase Authentication**. Any user who can successfully authenticate with Firebase Auth will have admin access.

### Creating Admin Users

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `svn-global`
3. Navigate to **Authentication** > **Users** tab
4. Click **Add user**
5. Enter email and password
6. Click **Add user**

### Login

1. Navigate to `/admin` route
2. Enter the email and password created in Firebase Console
3. Click **Sign In**

**Note**: No separate `firebase_admins` collection is needed. Any authenticated Firebase user is automatically an admin.

See `ADMIN-SETUP.md` for detailed instructions.

## Notes

- All data including images are stored in Firestore
- No Firebase Storage setup required
- No CORS configuration needed
- Images are converted to base64 format automatically when uploaded
