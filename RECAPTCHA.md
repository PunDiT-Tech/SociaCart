# reCAPTCHA Configuration for SociaCart

## Cloudflare Pages Deployment

### reCAPTCHA v2 Site Key (Cloudflare)
```
VITE_RECAPTCHA_SITE_KEY=6Lc10dYsAAAAAP9XwNOGCat4oUUan34-2_Dzq5Tr
```

### reCAPTCHA Secret Key (Server-side - if needed)
```
VITE_RECAPTCHA_SECRET_KEY=6Lc10dYsAAAAAM33HdJVDt9beCnMfiJB6fpOJqb3
```

## Cloudflare Setup

### Environment Variables to Add:
1. Go to: https://dash.cloudflare.com → Workers & Pages → sociacart → Settings → Environment Variables
2. Add these variables:

| Variable Name | Value |
|---------------|-------|
| `VITE_RECAPTCHA_SITE_KEY` | `6Lc10dYsAAAAAP9XwNOGCat4oUUan34-2_Dzq5Tr` |
| `VITE_FIREBASE_API_KEY` | (your Firebase key) |
| `VITE_FIREBASE_AUTH_DOMAIN` | (your Firebase domain) |
| `VITE_FIREBASE_PROJECT_ID` | `sociacart-2` |
| `VITE_FIREBASE_STORAGE_BUCKET` | (your Firebase bucket) |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | (your Firebase sender ID) |
| `VITE_FIREBASE_APP_ID` | (your Firebase app ID) |

3. Click **Save**
4. **Redeploy**: Go to Deployments → Retry Deployment

## Registered Domains
- ✅ `localhost` (local development)
- ✅ `sociacart.pages.dev` (Cloudflare production)

## Testing

### Local Development
Add to `.env`:
```
VITE_RECAPTCHA_SITE_KEY=6Lc10dYsAAAAAP9XwNOGCat4oUUan34-2_Dzq5Tr
```
Run: `npm run dev`
Test at: `http://localhost:5173/auth`

### Production (Cloudflare)
After redeployment, test at: `https://sociacart.pages.dev/auth`

## Phone Auth Flow
1. User clicks "Phone" tab on `/auth`
2. Enters phone number with country code
3. Clicks "Send SMS Code"
4. Firebase sends 6-digit OTP via SMS
5. User enters OTP
6. User is authenticated and logged in

## Firebase Configuration
- Phone Authentication: **Enabled**
- reCAPTCHA v2: **Configured**
- Project: `sociacart-2`
- Console: https://console.firebase.google.com/project/sociacart-2
