# SociaCart Admin Access Guide

## How to Login as Admin

### Step 1: Create/Admin Account
1. Go to the login page: `/auth`
2. Sign up with your admin email (e.g., `admin@sociacart.com`)
3. Remember your password!

### Step 2: Access Admin Panel
1. Login with your admin credentials
2. Navigate to: `/admin`
3. You'll see the Platform Control dashboard

### Step 3: Admin Features
Once logged in as admin, you can:
- **View Analytics**: Top sellers, top products, ad revenue
- **Manage Users**: Upgrade plans, delete stores
- **Manage Ads**: Approve/reject/pause advertisements
- **Set Prices**: Change Pro and Business plan prices
- **View Stats**: Total users, products, orders

---

## Password Reset

If you forget your admin password:

1. Go to `/auth`
2. Click **"Forgot Password?"**
3. Enter your admin email
4. Check your email for the reset link
5. Click the link and set a new password

**Note**: Password reset emails are sent by Firebase Authentication. Make sure to check spam folder if you don't see it.

---

## Admin Phone Number

The admin phone number is hardcoded for:
- WhatsApp notifications: `+2348067369016`
- Users requesting plan upgrades contact this number
- Users purchasing ads contact this number

To change the admin phone number, update these files:
- `src/pages/PricingPage.jsx` - line with `adminPhone`
- `src/pages/AdsPage.jsx` - line with `adminPhone`
- `src/pages/AdminPage.jsx` - `isAdmin` check uses this number

---

## Security Notes

- Admin access is determined by phone number: `+2348067369016`
- Only this phone number can access `/admin`
- Regular users cannot access admin features
- Firebase Authentication handles password security

---

## Firestore Collections Admin Can Access

| Collection | Read | Write | Purpose |
|------------|------|-------|---------|
| users | ✓ | ✓ | Manage seller accounts |
| products | ✓ | ✗ | View analytics |
| orders | ✓ | ✗ | View platform stats |
| ads | ✓ | ✓ | Approve/manage ads |
| settings | ✓ | ✓ | Plan prices |
| verifications | ✓ | ✓ | Login approvals |
