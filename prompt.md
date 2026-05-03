# 🛒 WhatsApp Store Builder — Full-Stack MVP Prompt
### Version 3.0 | Ultra-Grade | GitHub + Firebase + Vercel | Dark Mode · Security Hardened · PWA-Ready

---

> **HOW TO USE THIS PROMPT:**
> Copy this entire document and paste it as the first message into any AI coding agent
> (Cursor, Windsurf, Claude, GPT-4o, Gemini Advanced, etc.).
> The agent will produce a **complete, zero-error, deployment-ready codebase** — every file, every line.
> Do NOT ask for partial output. Demand every file in the folder structure be generated in full.

---

## 🆕 WHAT'S NEW IN V3.0 (vs V2.0)

| Category | V2.0 | V3.0 Upgrade |
|---|---|---|
| **Theme** | Light only | Full Dark Mode + System Preference Auto-Detect |
| **Animations** | Basic page transitions | Particle hero, morphing blobs, spring physics |
| **UI Polish** | Glassmorphism-lite | Full glassmorphism + grain overlay + gradient meshes |
| **Security** | Basic Firestore rules | Firebase App Check + rate limiting + input sanitization |
| **Images** | Raw upload | Client-side compression + dimension validation |
| **Performance** | Eager loading | Lazy routes + React.memo + Firestore pagination |
| **PWA** | None | Full PWA (manifest, service worker, installable) |
| **SEO** | None | Dynamic meta tags + Open Graph for store pages |
| **Accessibility** | Partial | Full WCAG 2.1 AA compliance |
| **Headers** | None | Security HTTP headers via Vercel |
| **Error Boundary** | None | Global React error boundary |
| **Splash Screen** | None | Animated app splash screen |
| **Haptics** | None | Vibration API feedback on mobile |
| **New Pages** | 5 pages | + EditProductPage + OrdersPage |

---

## 🧠 PRODUCT OVERVIEW

**App Name:** WhatsApp Store Builder
**Tagline:** *"Build your store in 5 minutes. Sell on WhatsApp instantly."*
**Target Devices:** Mobile-first (iOS & Android browsers), Progressive Web App installable
**Target Users:** Small business owners, market vendors, freelancers, side-hustle entrepreneurs in Nigeria, Ghana, Kenya, and other emerging markets.

**Core Value Loop:**
1. Seller signs up with phone number (Firebase Phone OTP)
2. Seller creates a named store in one step
3. Seller adds products (name, price, image, description)
4. System generates a unique public storefront URL + QR code
5. Customers visit the link, browse products, tap "Order on WhatsApp"
6. WhatsApp opens with a pre-filled, formatted order message
7. Order is silently and securely logged to Firestore
8. Seller reviews incoming orders from the dashboard

---

## 🛠️ MANDATORY TECH STACK

| Layer | Technology | Version | Notes |
|---|---|---|---|
| **Frontend** | React | 18.3.x | Functional components + hooks only |
| **Routing** | React Router | v6.22+ | Lazy-loaded routes |
| **Styling** | Tailwind CSS | v3.4+ | JIT, dark mode class strategy |
| **Animations** | Framer Motion | v11+ | Spring physics, layout animations |
| **Icons** | Lucide React | latest | Tree-shakeable icon set |
| **Auth** | Firebase Authentication | v10+ | Phone/OTP |
| **App Check** | Firebase App Check | v10+ | reCAPTCHA v3 provider |
| **Database** | Firebase Firestore | v10+ | Real-time NoSQL |
| **Storage** | Firebase Storage | v10+ | Product images |
| **Sanitization** | DOMPurify | v3+ | XSS prevention on all user input |
| **Image Compression** | browser-image-compression | v2+ | Client-side before upload |
| **QR Code** | qrcode.react | v3+ | SVG QR generation |
| **Toasts** | react-hot-toast | v2+ | Accessible notifications |
| **PWA** | vite-plugin-pwa | v0.19+ | Service worker + manifest |
| **SEO** | react-helmet-async | v2+ | Dynamic head tags |
| **Hosting** | Vercel | latest | Edge network |
| **Version Control** | GitHub | — | main = production |

---

## 🎨 DESIGN SYSTEM V3 — MANDATORY AESTHETIC

### Visual Identity

**Theme:** "Premium micro-commerce" — the feel of a high-end fintech app applied to a WhatsApp storefront. Think Vercel dashboard meets Airbnb product cards, with WhatsApp brand DNA.

**Color Tokens (define as CSS custom properties in `index.css`):**

```css
:root {
  /* Brand */
  --brand-primary:    #25D366;   /* WhatsApp Green — CTAs, active states */
  --brand-primary-dark: #1DA851; /* Hover/pressed state */
  --brand-secondary:  #128C7E;   /* Deep Teal — headers, gradients */
  --brand-accent:     #FF6B35;   /* Coral Orange — badges, highlights */
  --brand-gold:       #F5C518;   /* Gold — premium badge, star ratings */

  /* Light mode surfaces */
  --surface-bg:       #F0F2F5;
  --surface-card:     #FFFFFF;
  --surface-elevated: #FFFFFF;
  --surface-overlay:  rgba(255,255,255,0.85);

  /* Light mode text */
  --text-primary:   #0A0A0F;
  --text-secondary: #6B7280;
  --text-muted:     #9CA3AF;
  --text-on-brand:  #FFFFFF;

  /* Light mode borders */
  --border-default: rgba(0,0,0,0.08);
  --border-strong:  rgba(0,0,0,0.16);

  /* Semantic */
  --color-success: #25D366;
  --color-warning: #F59E0B;
  --color-error:   #EF4444;
  --color-info:    #3B82F6;

  /* Gradients */
  --gradient-hero:    linear-gradient(135deg, #25D366 0%, #128C7E 40%, #0D4F47 100%);
  --gradient-card:    linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.7) 100%);
  --gradient-shimmer: linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%);

  /* Shadows */
  --shadow-sm:  0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
  --shadow-md:  0 4px 16px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.04);
  --shadow-lg:  0 20px 48px rgba(0,0,0,0.12), 0 8px 20px rgba(0,0,0,0.06);
  --shadow-glow: 0 0 24px rgba(37,211,102,0.3);

  /* Radius */
  --radius-sm:   8px;
  --radius-md:   12px;
  --radius-lg:   18px;
  --radius-xl:   24px;
  --radius-full: 9999px;
}

/* ============ DARK MODE ============ */
[data-theme="dark"] {
  --surface-bg:       #0A0A0F;
  --surface-card:     #13131A;
  --surface-elevated: #1C1C26;
  --surface-overlay:  rgba(19,19,26,0.92);

  --text-primary:   #F9FAFB;
  --text-secondary: #9CA3AF;
  --text-muted:     #6B7280;

  --border-default: rgba(255,255,255,0.08);
  --border-strong:  rgba(255,255,255,0.16);

  --gradient-shimmer: linear-gradient(90deg, #1c1c26 25%, #232330 50%, #1c1c26 75%);
  --shadow-glow: 0 0 32px rgba(37,211,102,0.2);
}
```

### Typography System

**Fonts:** Import from Google Fonts in `index.html` (not CSS — avoids render blocking):
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

**Type Scale:**
```css
/* Apply in Tailwind config extension */
--font-display: 'Syne', sans-serif;      /* h1-h3, store names, hero */
--font-body:    'DM Sans', sans-serif;   /* all body text, UI labels */
--font-mono:    'JetBrains Mono', mono;  /* prices, codes, stats */

/* Sizes: 12 / 13 / 14 / 16 / 18 / 22 / 28 / 36 / 48 / 64px */
/* Line heights: tight(1.2) / snug(1.4) / normal(1.6) / relaxed(1.75) */
```

### Dark Mode Implementation

**Strategy:** `class` strategy in Tailwind. Store preference in `localStorage`. Detect system preference on first load.

```js
// src/utils/theme.js
export const initTheme = () => {
  const stored = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = stored || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
  document.documentElement.classList.toggle('dark', theme === 'dark');
  return theme;
};

export const toggleTheme = (current) => {
  const next = current === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', next);
  document.documentElement.setAttribute('data-theme', next);
  document.documentElement.classList.toggle('dark', next === 'dark');
  return next;
};
```

Call `initTheme()` in `main.jsx` before React renders (prevents flash of wrong theme).

### Animation System (Framer Motion v11)

```js
// src/utils/animations.js — export all variants from here

// ── Page transitions ──────────────────────────────────────────
export const pageVariants = {
  initial: { opacity: 0, y: 20, filter: 'blur(4px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }
  },
  exit: { opacity: 0, y: -10, filter: 'blur(2px)',
    transition: { duration: 0.2 }
  },
};

// ── Stagger container ─────────────────────────────────────────
export const staggerContainer = {
  animate: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

// ── Card item (used inside stagger) ──────────────────────────
export const cardItem = {
  initial: { opacity: 0, y: 24, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1,
    transition: { type: 'spring', stiffness: 300, damping: 24 }
  },
};

// ── Slide up (bottom sheets, modals) ─────────────────────────
export const slideUp = {
  initial: { y: '100%' },
  animate: { y: 0, transition: { type: 'spring', stiffness: 400, damping: 40 } },
  exit:    { y: '100%', transition: { duration: 0.25 } },
};

// ── Scale pop (confirmation, success) ────────────────────────
export const scalePop = {
  initial: { scale: 0, opacity: 0 },
  animate: { scale: 1, opacity: 1,
    transition: { type: 'spring', stiffness: 500, damping: 20, delay: 0.1 }
  },
};

// ── FAB pulse ─────────────────────────────────────────────────
// animate={{ scale: [1, 1.06, 1] }} transition={{ repeat: Infinity, duration: 2.5 }}

// ── Shimmer (skeleton loading) ────────────────────────────────
// Use CSS animation: backgroundPosition '200% 0' → '-200% 0'

// ── Number count-up (stats) ───────────────────────────────────
// Use useMotionValue + animate + useTransform from framer-motion

// ── Hero blob morphing ────────────────────────────────────────
// SVG path animation: animate={{ d: [path1, path2, path1] }} repeat Infinity
```

### Special Visual Effects

**1. Animated Hero Background (AuthPage & StorePage hero):**
```jsx
// Animated gradient mesh with moving blobs
// Use 3 absolutely-positioned divs with brand colors
// Apply: animate={{ x: [0, 30, 0], y: [0, -20, 0] }} repeat Infinity
// blur-[80px] opacity-40 rounded-full
// Colors: brand-primary, brand-secondary, brand-accent
```

**2. Grain Overlay (Dashboard, OnboardingPage):**
```css
.grain-overlay::after {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 9999;
  opacity: 0.035;
}
```

**3. Glassmorphism Cards:**
```css
.glass-card {
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.5);
}
[data-theme="dark"] .glass-card {
  background: rgba(19, 19, 26, 0.72);
  border: 1px solid rgba(255, 255, 255, 0.08);
}
```

**4. Custom Scrollbar:**
```css
::-webkit-scrollbar { width: 3px; height: 3px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--brand-primary); border-radius: 99px; opacity: 0.5; }
```

**5. Animated App Splash Screen (`SplashScreen.jsx`):**
- Full-screen with `--gradient-hero` background
- WhatsApp logo SVG animates in with `scalePop`
- App name animates up with delay
- Loading dots pulse
- Hides after 1.8s or when Firebase `onAuthStateChanged` resolves (whichever is later)

---

## 📁 COMPLETE PROJECT FOLDER STRUCTURE V3

```
whatsapp-store-builder/
│
├── public/
│   ├── favicon.ico
│   ├── favicon-192.png         # PWA icon
│   ├── favicon-512.png         # PWA icon
│   ├── apple-touch-icon.png    # iOS home screen
│   ├── og-image.png            # Open Graph default image (1200×630)
│   ├── manifest.json           # PWA manifest
│   └── robots.txt
│
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppShell.jsx         # Auth layout wrapper + grain overlay
│   │   │   ├── BottomNav.jsx        # Mobile tab bar (Dashboard/Orders/Settings)
│   │   │   ├── TopBar.jsx           # App header: back + title + actions
│   │   │   └── PageWrapper.jsx      # Framer motion page transition wrapper
│   │   │
│   │   ├── ui/
│   │   │   ├── Button.jsx           # Primary / secondary / ghost / danger variants
│   │   │   ├── Input.jsx            # Text input with label, error, left/right icons
│   │   │   ├── Textarea.jsx         # Styled textarea with char counter
│   │   │   ├── Card.jsx             # Base card: flat / elevated / glass variants
│   │   │   ├── Badge.jsx            # Status badges: success / warning / error
│   │   │   ├── Avatar.jsx           # Initials avatar with color hash
│   │   │   ├── Toggle.jsx           # iOS-style toggle switch
│   │   │   ├── ProgressBar.jsx      # Upload progress bar
│   │   │   ├── LoadingSpinner.jsx   # Animated spinner (full-screen + inline)
│   │   │   ├── SkeletonCard.jsx     # Shimmer loading placeholder
│   │   │   ├── EmptyState.jsx       # SVG illustrations + copy
│   │   │   ├── Modal.jsx            # Framer Motion bottom sheet
│   │   │   ├── ConfirmDialog.jsx    # Destructive action confirm dialog
│   │   │   ├── ThemeToggle.jsx      # Dark/light mode toggle button
│   │   │   └── SplashScreen.jsx     # Animated app loading screen
│   │   │
│   │   ├── auth/
│   │   │   └── ProtectedRoute.jsx   # Auth + store guard
│   │   │
│   │   ├── store/
│   │   │   ├── ProductCard.jsx      # Dashboard product card with edit/delete
│   │   │   ├── PublicProductCard.jsx # Customer-facing product card
│   │   │   ├── ProductForm.jsx      # Shared add/edit product form
│   │   │   ├── StoreQRCode.jsx      # QR code + share bottom sheet
│   │   │   └── StoreBanner.jsx      # Public store hero section
│   │   │
│   │   └── errors/
│   │       └── ErrorBoundary.jsx    # React error boundary (global)
│   │
│   ├── pages/
│   │   ├── AuthPage.jsx             # Phone OTP login
│   │   ├── OnboardingPage.jsx       # Create store (new users only)
│   │   ├── DashboardPage.jsx        # Seller dashboard (products grid)
│   │   ├── AddProductPage.jsx       # Add new product
│   │   ├── EditProductPage.jsx      # Edit existing product (NEW in V3)
│   │   ├── OrdersPage.jsx           # View logged orders (NEW in V3)
│   │   ├── SettingsPage.jsx         # Store settings + logout (NEW in V3)
│   │   ├── StorePage.jsx            # Public storefront (/store/:storeName)
│   │   └── NotFoundPage.jsx         # 404 page
│   │
│   ├── hooks/
│   │   ├── useAuth.js               # Auth context consumer hook
│   │   ├── useStore.js              # Store data (read/write)
│   │   ├── useProducts.js           # Products CRUD + real-time listener
│   │   ├── useOrders.js             # Orders fetch + real-time (NEW)
│   │   ├── useTheme.js              # Dark/light mode toggle hook (NEW)
│   │   ├── useDebounce.js           # Debounce hook for search/validation
│   │   ├── useHaptics.js            # Vibration API wrapper (NEW)
│   │   └── useOnlineStatus.js       # Online/offline detection hook (NEW)
│   │
│   ├── context/
│   │   └── AuthContext.jsx          # Global auth + userProfile state
│   │
│   ├── services/
│   │   ├── firebase.js              # Firebase init + App Check
│   │   ├── authService.js           # Phone auth functions
│   │   ├── storeService.js          # Store CRUD operations
│   │   ├── productService.js        # Product CRUD + image upload
│   │   └── orderService.js          # Order logging + fetch
│   │
│   ├── utils/
│   │   ├── whatsapp.js              # WhatsApp link generator
│   │   ├── formatters.js            # Price, date, phone formatters
│   │   ├── validators.js            # Form validation helpers
│   │   ├── sanitize.js              # DOMPurify wrappers (NEW)
│   │   ├── imageCompressor.js       # Client-side image compress (NEW)
│   │   ├── theme.js                 # Dark mode init/toggle (NEW)
│   │   ├── animations.js            # All Framer Motion variants (NEW)
│   │   └── rateLimit.js             # Client-side rate limit helper (NEW)
│   │
│   ├── App.jsx                      # Root + routing (lazy loaded)
│   ├── main.jsx                     # Entry point + theme init
│   └── index.css                    # Global styles, Tailwind, CSS vars
│
├── .env.local                       # Firebase config (gitignored)
├── .env.example                     # Template
├── .gitignore
├── index.html                       # PWA meta tags + font preloads
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── vercel.json                      # SPA rewrites + security headers
```

---

## ⚙️ PACKAGE.JSON — COMPLETE DEPENDENCIES

```json
{
  "name": "whatsapp-store-builder",
  "version": "3.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint src --ext js,jsx --max-warnings 0"
  },
  "dependencies": {
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "react-router-dom": "^6.22.0",
    "firebase": "^10.8.0",
    "framer-motion": "^11.0.0",
    "lucide-react": "^0.344.0",
    "react-hot-toast": "^2.4.1",
    "qrcode.react": "^3.1.0",
    "dompurify": "^3.1.0",
    "browser-image-compression": "^2.0.2",
    "react-helmet-async": "^2.0.4"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.1",
    "vite-plugin-pwa": "^0.19.0",
    "workbox-window": "^7.0.0",
    "autoprefixer": "^10.4.17",
    "eslint": "^8.56.0",
    "eslint-plugin-react": "^7.33.2",
    "eslint-plugin-react-hooks": "^4.6.0",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.1",
    "vite": "^5.1.0"
  }
}
```

---

## 🔒 SECURITY LAYER — FULL SPECIFICATION

### 1. Firebase App Check (Anti-Abuse)

```js
// src/services/firebase.js — COMPLETE FILE
import { initializeApp }              from 'firebase/app';
import { getAuth }                    from 'firebase/auth';
import { getFirestore }               from 'firebase/firestore';
import { getStorage }                 from 'firebase/storage';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';

const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

// App Check — blocks unauthorized API calls from non-app clients
// VITE_RECAPTCHA_SITE_KEY comes from Google reCAPTCHA v3 console
if (import.meta.env.PROD) {
  initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(import.meta.env.VITE_RECAPTCHA_SITE_KEY),
    isTokenAutoRefreshEnabled: true,
  });
}

export const auth    = getAuth(app);
export const db      = getFirestore(app);
export const storage = getStorage(app);
export default app;
```

### 2. Input Sanitization (XSS Prevention)

```js
// src/utils/sanitize.js — COMPLETE FILE
import DOMPurify from 'dompurify';

// Sanitize any user-supplied string before saving to Firestore
export const sanitizeText = (input) => {
  if (typeof input !== 'string') return '';
  return DOMPurify.sanitize(input.trim(), {
    ALLOWED_TAGS: [],    // Strip ALL HTML tags
    ALLOWED_ATTR: [],    // Strip ALL attributes
  });
};

// Sanitize and slugify for store names
export const sanitizeSlug = (input) => {
  return sanitizeText(input)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')   // Remove special chars
    .replace(/\s+/g, '-')            // Spaces → hyphens
    .replace(/-+/g, '-')             // Collapse double hyphens
    .replace(/^-|-$/g, '')           // Trim leading/trailing hyphens
    .slice(0, 50);                   // Max 50 chars
};

// Sanitize phone numbers to E.164 format
export const sanitizePhone = (phone) => {
  return phone.replace(/[^\d+]/g, '').slice(0, 15);
};

// Sanitize price input
export const sanitizePrice = (value) => {
  const num = parseFloat(value);
  if (isNaN(num) || num < 0) return 0;
  return Math.min(Math.round(num * 100) / 100, 9_999_999); // Max ~10M
};
```

### 3. Image Validation + Compression

```js
// src/utils/imageCompressor.js — COMPLETE FILE
import imageCompression from 'browser-image-compression';

const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const MAX_SIZE_MB   = 5;
const TARGET_SIZE_MB = 0.8; // Compress to under 800KB
const MAX_DIMENSION  = 1200; // px

export const validateAndCompressImage = async (file) => {
  // Type check
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error('Only JPEG, PNG, and WebP images are allowed.');
  }

  // Size check (before compression)
  if (file.size > MAX_SIZE_MB * 1024 * 1024) {
    throw new Error(`Image must be under ${MAX_SIZE_MB}MB.`);
  }

  // Compress
  const options = {
    maxSizeMB: TARGET_SIZE_MB,
    maxWidthOrHeight: MAX_DIMENSION,
    useWebWorker: true,
    fileType: 'image/webp', // Convert all to WebP
  };

  const compressed = await imageCompression(file, options);
  return compressed;
};

// Generate local preview URL (revoke when component unmounts)
export const createPreviewURL = (file) => URL.createObjectURL(file);
export const revokePreviewURL = (url) => URL.revokeObjectURL(url);
```

### 4. Client-Side Rate Limiting

```js
// src/utils/rateLimit.js — COMPLETE FILE
// Prevents spam: OTP requests, order logging, product creation

const attempts = new Map(); // key → { count, firstAttempt }

export const checkRateLimit = (key, maxAttempts = 5, windowMs = 60_000) => {
  const now = Date.now();
  const record = attempts.get(key);

  if (!record || now - record.firstAttempt > windowMs) {
    attempts.set(key, { count: 1, firstAttempt: now });
    return { allowed: true, remaining: maxAttempts - 1 };
  }

  if (record.count >= maxAttempts) {
    const retryAfter = Math.ceil((windowMs - (now - record.firstAttempt)) / 1000);
    return { allowed: false, retryAfter, remaining: 0 };
  }

  record.count++;
  return { allowed: true, remaining: maxAttempts - record.count };
};

// Reset a specific key (e.g., after successful OTP)
export const resetRateLimit = (key) => attempts.delete(key);
```

**Apply rate limiting to:**
- OTP send: max 3 per 10 minutes per phone
- Order log: max 5 per product per minute (per session)
- Product create: max 20 per hour per user

### 5. Firestore Security Rules V3 (Upgraded)

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // ── Helper functions ────────────────────────────────────────
    function isAuthenticated() {
      return request.auth != null;
    }
    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }
    function isValidString(value, minLen, maxLen) {
      return value is string && value.size() >= minLen && value.size() <= maxLen;
    }
    function isValidPrice(value) {
      return value is number && value >= 0 && value <= 9999999;
    }
    function notModifying(field) {
      return !(field in request.resource.data.diff(resource.data).affectedKeys());
    }

    // ── users collection ────────────────────────────────────────
    match /users/{userId} {
      allow read: if isOwner(userId);
      allow create: if isOwner(userId)
        && isValidString(request.resource.data.phone, 7, 15)
        && isValidString(request.resource.data.store_name, 2, 50)
        && request.resource.data.keys().hasAll(['id','phone','store_name','store_display_name','created_at']);
      allow update: if isOwner(userId)
        && notModifying('id')
        && notModifying('phone')
        && notModifying('created_at');
      allow delete: if isOwner(userId);
    }

    // Public read for store lookup by store_name
    match /users/{userId} {
      allow read: if true;  // needed for /store/:slug lookup
    }

    // ── products collection ─────────────────────────────────────
    match /products/{productId} {
      allow read: if true; // Public read for storefront

      allow create: if isAuthenticated()
        && request.resource.data.user_id == request.auth.uid
        && isValidString(request.resource.data.name, 1, 100)
        && isValidPrice(request.resource.data.price)
        && isValidString(request.resource.data.image_url, 10, 500)
        && request.resource.data.keys().hasAll(['user_id','name','price','image_url','created_at']);

      allow update: if isAuthenticated()
        && resource.data.user_id == request.auth.uid
        && notModifying('user_id')
        && notModifying('created_at')
        && isValidString(request.resource.data.name, 1, 100)
        && isValidPrice(request.resource.data.price);

      allow delete: if isAuthenticated()
        && resource.data.user_id == request.auth.uid;
    }

    // ── orders collection ────────────────────────────────────────
    match /orders/{orderId} {
      // Anyone can create (customers placing orders)
      allow create: if request.resource.data.keys().hasAll(
          ['product_id','seller_id','status','source','created_at']
        )
        && request.resource.data.status == 'pending'
        && request.resource.data.source == 'whatsapp';

      // Only seller can read and update their own orders
      allow read: if isAuthenticated()
        && resource.data.seller_id == request.auth.uid;
      allow update: if isAuthenticated()
        && resource.data.seller_id == request.auth.uid
        && notModifying('seller_id')
        && notModifying('product_id')
        && notModifying('created_at')
        && request.resource.data.status in ['pending','completed','cancelled'];
      allow delete: if false; // Never delete orders
    }
  }
}
```

### 6. Firebase Storage Rules V3

```js
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /products/{userId}/{fileName} {
      allow read: if true;
      allow write: if request.auth != null
        && request.auth.uid == userId
        && request.resource.size < 2 * 1024 * 1024   // 2MB max (compressed)
        && request.resource.contentType.matches('image/(jpeg|jpg|png|webp)')
        && fileName.matches('[a-zA-Z0-9_\\-\\.]+');   // Safe filename
      allow delete: if request.auth != null
        && request.auth.uid == userId;
    }
  }
}
```

### 7. Security HTTP Headers (`vercel.json`)

```json
{
  "rewrites": [
    { "source": "/((?!api/).*)", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "camera=(), microphone=(), geolocation=()"
        },
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=63072000; includeSubDomains; preload"
        },
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.gstatic.com https://www.google.com https://apis.google.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data: https://firebasestorage.googleapis.com blob:; connect-src 'self' https://*.googleapis.com https://*.firebaseio.com wss://*.firebaseio.com https://identitytoolkit.googleapis.com; frame-src https://www.google.com;"
        }
      ]
    },
    {
      "source": "/static/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}
```

### 8. Environment Variable Security

```env
# .env.example — ALL required variables

# Firebase (public — safe to expose in frontend)
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

# Firebase App Check (reCAPTCHA v3)
VITE_RECAPTCHA_SITE_KEY=

# App config
VITE_APP_URL=https://your-app.vercel.app
VITE_APP_NAME=WhatsApp Store Builder
```

**IMPORTANT:** Restrict Firebase API key in Google Cloud Console:
- API Restrictions → Restrict to: Cloud Firestore API, Cloud Storage, Firebase Auth, reCAPTCHA Enterprise
- Application Restrictions → HTTP Referrers → Add your Vercel domain

---

## 🏗️ UPDATED FIRESTORE SCHEMA V3

### `users` collection
```
users/{userId}
  ├── id:                  string  (= Firebase UID)
  ├── phone:               string  (E.164: "+2348012345678")
  ├── store_name:          string  (slug: "adidas-fashion")
  ├── store_display_name:  string  ("Adidas Fashion Store")
  ├── store_description:   string  (optional, max 160 chars)
  ├── store_category:      string  (enum: "fashion"|"food"|"electronics"|"beauty"|"other")
  ├── created_at:          Timestamp
  └── updated_at:          Timestamp
```

### `products` collection
```
products/{productId}
  ├── id:           string
  ├── user_id:      string
  ├── name:         string  (1-100 chars)
  ├── price:        number  (0-9,999,999)
  ├── currency:     string  ("₦"|"$"|"£"|"€"|"GH₵"|"KSh")
  ├── description:  string  (optional, max 300 chars)
  ├── image_url:    string  (Firebase Storage URL)
  ├── is_available: boolean (default: true)
  ├── view_count:   number  (incremented on store page load)
  ├── order_count:  number  (incremented on each WA order click)
  ├── created_at:   Timestamp
  └── updated_at:   Timestamp
```

### `orders` collection
```
orders/{orderId}
  ├── id:             string
  ├── product_id:     string
  ├── product_name:   string  (snapshot at order time)
  ├── product_price:  number  (snapshot at order time)
  ├── product_image:  string  (snapshot)
  ├── seller_id:      string
  ├── seller_phone:   string
  ├── buyer_phone:    string  (optional — if buyer provides)
  ├── status:         "pending"|"completed"|"cancelled"
  ├── source:         "whatsapp"
  ├── store_name:     string
  ├── session_id:     string  (random UUID, for deduplication)
  ├── created_at:     Timestamp
  └── updated_at:     Timestamp
```

---

## 📄 ENHANCED PAGE SPECIFICATIONS V3

---

### PAGE 1: `AuthPage.jsx`

**Visual:** Animated gradient mesh background (3 moving blobs). Floating WhatsApp icon with `float` animation. Glassmorphism login card centered on screen.

**New in V3:**
- Animated blobs in background (`framer-motion` + CSS)
- Country code selector with flag emoji (Nigeria 🇳🇬 default, 10 most common countries)
- OTP input: 6 individual digit boxes (auto-advance, auto-submit at digit 6, backspace returns focus)
- Resend OTP: 60s countdown, visual ring progress animation around "Resend" button
- "Continue with..." subtext explaining the phone won't be shared
- Rate limit enforcement: after 3 failed OTP attempts, lock for 5 minutes with countdown

**OTP 6-Box Implementation:**
```jsx
// Array of 6 refs, one per digit input
// onKeyDown: if Backspace + empty → focus previous
// onChange: extract single digit → auto-focus next
// onPaste: split string across all 6 inputs
// Auto-submit when all 6 filled
```

---

### PAGE 2: `OnboardingPage.jsx`

**Visual:** White card with green gradient top band. 3-step progress dots with animated active indicator. Confetti burst on completion (use inline canvas confetti, no external lib).

**New in V3:**
- Store category selector (6 emoji categories: 👗 Fashion / 🍔 Food / 📱 Electronics / 💄 Beauty / 🏠 Home / ✨ Other)
- Store description field (optional, 160 chars with live counter)
- Real-time slug availability check (Firestore query, debounced 600ms)
- Animated "Checking availability..." indicator
- Completion screen: animated checkmark + confetti + store link + "Open My Store" button

---

### PAGE 3: `DashboardPage.jsx`

**Visual:** Dark header band with gradient, white card body. Bottom tab nav (Dashboard / Orders / Settings).

**New in V3:**
- Animated stats: Product count + Total orders (number count-up animation on mount)
- "Top product" highlight (most ordered, shown with 🏆 badge)
- Product grid: 2 cols on mobile, 3 on tablet, 4 on desktop
- Product card hover: slight lift (`translateY(-4px)`) with shadow
- Swipe-to-delete gesture on mobile (touch events)
- Search/filter bar (client-side filter by product name)
- FAB "+ Add Product" (pulsing green ring, bottom-right)
- Empty state: animated SVG empty shelf illustration

**Stats Bar:**
```jsx
<motion.div key={count} initial={{ scale: 1.3, color: 'var(--brand-primary)' }}
  animate={{ scale: 1, color: 'var(--text-primary)' }}>
  {count}
</motion.div>
```

---

### PAGE 4: `AddProductPage.jsx` & `EditProductPage.jsx`

**Visual:** Full white page, green sticky header.

**New in V3:**
- Image drop zone with drag-and-drop support (`onDragOver`, `onDrop`) + tap to upload
- **Client-side compression** via `validateAndCompressImage()` before upload
- **Compression stats shown:** "Compressed from 3.2MB → 0.7MB ✓"
- Upload progress bar (animated, green fill)
- Currency selector: 6 options with flag (₦ NGN / $ USD / £ GBP / € EUR / GH₵ GHS / KSh KES)
- "In Stock" toggle — if toggled off, product shows "Out of Stock" badge in store
- On Edit: pre-populate all fields from existing product data
- Confirm before leaving if unsaved changes (`useBeforeUnload`)

---

### PAGE 5: `OrdersPage.jsx` *(NEW)*

**Visual:** Clean list view. Each order is a card.

**Spec:**
- Real-time Firestore listener (`onSnapshot`) on orders where `seller_id == uid`
- Orders sorted by `created_at` descending
- Each card shows: product thumbnail, product name, price, timestamp, status badge
- Status chip: 🟡 Pending / ✅ Completed / ❌ Cancelled
- Tap card → bottom sheet with full details + "Mark Complete" / "Mark Cancelled" buttons
- Pull-to-refresh with animated spinner
- Empty state: "No orders yet — share your store to start receiving orders!"
- Pagination: load 20 at a time, "Load more" button

---

### PAGE 6: `SettingsPage.jsx` *(NEW)*

**Sections:**
- **Store Info:** Edit store display name, description, category (saves to Firestore)
- **Appearance:** Dark/Light mode toggle (ThemeToggle component)
- **Share Store:** Store link + QR code modal trigger
- **Danger Zone:** Delete store (with typed confirmation) + Logout

---

### PAGE 7: `StorePage.jsx` (Public — Enhanced V3)

**This is the MOST IMPORTANT page. It must look world-class.**

**Hero Section:**
```
╔══════════════════════════════════════╗
║  [Animated gradient background]      ║
║  [Store Avatar — colored initials]   ║
║  Store Display Name                  ║
║  "Fashion · Lagos, NG"               ║
║  [💬 Chat with Us]   [📤 Share]     ║
╚══════════════════════════════════════╝
```

**New in V3:**
- Dynamic `<Helmet>` meta tags (Open Graph + Twitter Card) using `react-helmet-async`:
  ```jsx
  <Helmet>
    <title>{storeName} — WhatsApp Store</title>
    <meta property="og:title" content={`${storeName} — Order on WhatsApp`} />
    <meta property="og:description" content={`Browse ${productCount} products and order directly on WhatsApp!`} />
    <meta property="og:image" content={firstProductImage || '/og-image.png'} />
    <meta property="og:url" content={window.location.href} />
  </Helmet>
  ```
- Product cards with `loading="lazy"` images + blur-up placeholder
- "Out of Stock" overlay on unavailable products (greyed out, button disabled)
- Floating WhatsApp button (sticky bottom, pulsing)
- Order count badge on product cards: "🛍️ 12 orders" (social proof)
- Category chip shown in hero (e.g., "👗 Fashion")
- Footer: "Powered by WhatsApp Store Builder · Create your free store →"

**Haptic feedback on Order button:**
```js
// src/hooks/useHaptics.js
export const useHaptics = () => ({
  light:  () => navigator.vibrate?.(10),
  medium: () => navigator.vibrate?.(20),
  heavy:  () => navigator.vibrate?.([30, 10, 30]),
  success:() => navigator.vibrate?.([10, 50, 10]),
});
```

---

## 🔄 ROUTING WITH LAZY LOADING (`App.jsx`)

```jsx
import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

// Lazy load all pages — splits into separate chunks
const AuthPage        = lazy(() => import('@/pages/AuthPage'));
const OnboardingPage  = lazy(() => import('@/pages/OnboardingPage'));
const DashboardPage   = lazy(() => import('@/pages/DashboardPage'));
const AddProductPage  = lazy(() => import('@/pages/AddProductPage'));
const EditProductPage = lazy(() => import('@/pages/EditProductPage'));
const OrdersPage      = lazy(() => import('@/pages/OrdersPage'));
const SettingsPage    = lazy(() => import('@/pages/SettingsPage'));
const StorePage       = lazy(() => import('@/pages/StorePage'));
const NotFoundPage    = lazy(() => import('@/pages/NotFoundPage'));

// Wrap all routes in:
// <Suspense fallback={<LoadingSpinner fullScreen />}>
//   <AnimatePresence mode="wait">
//     <Routes location={location} key={location.pathname}>
//       ...
//     </Routes>
//   </AnimatePresence>
// </Suspense>
```

---

## 📲 PWA CONFIGURATION

### `vite.config.js`
```js
import { defineConfig }   from 'vite';
import react              from '@vitejs/plugin-react';
import { VitePWA }        from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
      manifest: {
        name: 'WhatsApp Store Builder',
        short_name: 'WA Store',
        description: 'Build your store in 5 minutes. Sell on WhatsApp instantly.',
        theme_color: '#25D366',
        background_color: '#0A0A0F',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        icons: [
          { src: 'favicon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'favicon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: { cacheName: 'google-fonts', expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 } },
          },
          {
            urlPattern: /^https:\/\/firebasestorage\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: { cacheName: 'product-images', expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 30 } },
          },
        ],
      },
    }),
  ],
  resolve: { alias: { '@': '/src' } },
});
```

### `public/manifest.json`
```json
{
  "name": "WhatsApp Store Builder",
  "short_name": "WA Store",
  "description": "Build your store in 5 minutes. Sell on WhatsApp instantly.",
  "start_url": "/",
  "display": "standalone",
  "orientation": "portrait-primary",
  "theme_color": "#25D366",
  "background_color": "#0A0A0F",
  "icons": [
    { "src": "/favicon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/favicon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "any maskable" }
  ],
  "categories": ["shopping", "business"],
  "lang": "en"
}
```

---

## 🌐 SEO — `index.html` (Full File)

```html
<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />

  <!-- Primary Meta -->
  <title>WhatsApp Store Builder — Sell on WhatsApp in 5 Minutes</title>
  <meta name="description" content="Create a free online store and receive orders via WhatsApp. No coding needed. Start in 5 minutes." />
  <meta name="theme-color" content="#25D366" />

  <!-- PWA -->
  <link rel="manifest" href="/manifest.json" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
  <meta name="apple-mobile-web-app-title" content="WA Store" />

  <!-- Open Graph -->
  <meta property="og:type"        content="website" />
  <meta property="og:url"         content="https://your-app.vercel.app" />
  <meta property="og:title"       content="WhatsApp Store Builder" />
  <meta property="og:description" content="Create a free online store and receive orders via WhatsApp." />
  <meta property="og:image"       content="https://your-app.vercel.app/og-image.png" />

  <!-- Twitter Card -->
  <meta name="twitter:card"        content="summary_large_image" />
  <meta name="twitter:title"       content="WhatsApp Store Builder" />
  <meta name="twitter:description" content="Create a free store and sell on WhatsApp in minutes." />
  <meta name="twitter:image"       content="https://your-app.vercel.app/og-image.png" />

  <!-- Google Fonts (preconnect first for speed) -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>
</html>
```

---

## 🛡️ GLOBAL ERROR BOUNDARY

```jsx
// src/components/errors/ErrorBoundary.jsx — COMPLETE FILE
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    // In production, send to error tracking (e.g., Sentry)
    console.error('App Error:', error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center',
          justifyContent:'center', minHeight:'100vh', padding:'2rem', textAlign:'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>😵</div>
          <h2 style={{ fontFamily:'Syne, sans-serif', fontSize:'22px', marginBottom:'8px' }}>
            Something went wrong
          </h2>
          <p style={{ color:'#6B7280', marginBottom:'24px' }}>
            The app hit an unexpected error. Please refresh the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{ background:'#25D366', color:'#fff', border:'none',
              padding:'12px 32px', borderRadius:'9999px', fontSize:'16px', cursor:'pointer' }}>
            Refresh App
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
```

---

## 🔧 TAILWIND CONFIG V3 (Full)

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body:    ['DM Sans', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },
      colors: {
        brand: {
          green:  '#25D366',
          dark:   '#1DA851',
          teal:   '#128C7E',
          coral:  '#FF6B35',
          gold:   '#F5C518',
          ink:    '#1A1A2E',
        },
      },
      backgroundImage: {
        'hero':    'linear-gradient(135deg, #25D366 0%, #128C7E 40%, #0D4F47 100%)',
        'hero-r':  'linear-gradient(315deg, #25D366 0%, #128C7E 40%, #0D4F47 100%)',
        'card-overlay': 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.72) 100%)',
        'shimmer': 'linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%)',
        'shimmer-dark': 'linear-gradient(90deg, #1c1c26 25%, #232330 50%, #1c1c26 75%)',
      },
      animation: {
        shimmer:    'shimmer 1.6s infinite linear',
        float:      'float 3.5s ease-in-out infinite',
        blob:       'blob 8s infinite ease-in-out',
        'fade-in':  'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.35s ease-out',
        'ping-slow':'ping 2.5s cubic-bezier(0,0,0.2,1) infinite',
      },
      keyframes: {
        shimmer: {
          '0%':   { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%':     { transform: 'translateY(-10px)' },
        },
        blob: {
          '0%,100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '50%':     { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
        },
        fadeIn:  { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp: { from: { transform: 'translateY(20px)', opacity: 0 }, to: { transform: 'translateY(0)', opacity: 1 } },
      },
      backdropBlur: { xs: '2px' },
      boxShadow: {
        'glow-green': '0 0 24px rgba(37,211,102,0.35)',
        'glow-teal':  '0 0 24px rgba(18,140,126,0.35)',
        'card':       '0 4px 16px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)',
        'card-hover': '0 12px 36px rgba(0,0,0,0.10), 0 4px 12px rgba(0,0,0,0.06)',
      },
    },
  },
  plugins: [],
};
```

---

## ✅ UPDATED PRE-DEPLOYMENT CHECKLIST V3

**Security:**
- [ ] Firebase App Check enabled + reCAPTCHA v3 site key added
- [ ] Firestore security rules v3 deployed (`firebase deploy --only firestore:rules`)
- [ ] Storage rules v3 deployed (`firebase deploy --only storage`)
- [ ] Firebase API key restricted to authorized domains in Google Cloud Console
- [ ] All env vars set in Vercel (including `VITE_RECAPTCHA_SITE_KEY`)
- [ ] CSP headers tested — no blocked resources in browser console
- [ ] `HSTS` header present (check with securityheaders.com)

**Performance:**
- [ ] Lighthouse score > 85 on mobile
- [ ] All images loading as WebP (compressed)
- [ ] Route code splitting working (check Network tab — separate chunks per page)
- [ ] Google Fonts cached via service worker
- [ ] Product images served from Firebase CDN

**PWA:**
- [ ] App installable on Android Chrome (shows "Add to Home Screen")
- [ ] App installable on iOS Safari (shows share → "Add to Home Screen")
- [ ] Offline fallback page works when disconnected
- [ ] Theme color shows in browser chrome on mobile

**UI/UX:**
- [ ] Dark mode toggle works + preference persists across refreshes
- [ ] All animations run at 60fps on mid-range Android device
- [ ] OTP 6-box: auto-advance, backspace, paste all work
- [ ] Image compression stats show before upload
- [ ] WhatsApp message format is correct on actual WhatsApp (test on real device)
- [ ] Haptic feedback fires on order button (Android)
- [ ] Open Graph image shows when link shared on WhatsApp

**Routing:**
- [ ] `/store/:storeName` works after page refresh (Vercel rewrite)
- [ ] Protected routes redirect correctly
- [ ] 404 page shown for invalid store slugs

---

## 🧪 FULL TESTING MATRIX V3

```
AUTH:
  ✓ Phone + OTP happy path
  ✓ Wrong OTP → error + counter
  ✓ 3 failed OTPs → rate limit lockout with countdown
  ✓ OTP expired → resend button
  ✓ New user → /onboarding
  ✓ Existing user → /dashboard

ONBOARDING:
  ✓ Taken slug → "Name unavailable" with red indicator
  ✓ Available slug → green checkmark
  ✓ Step progression (dots animate)
  ✓ Completion confetti fires
  ✓ Store saved with sanitized data

PRODUCT MANAGEMENT:
  ✓ Image drop + tap upload both work
  ✓ Image >5MB → error toast (rejected)
  ✓ Non-image file → error toast
  ✓ Compression stats shown
  ✓ Upload progress bar animates 0→100
  ✓ Product saved with sanitized name/description
  ✓ Edit pre-populates form
  ✓ Delete with confirm dialog works
  ✓ Toggle availability — updates in real-time

DASHBOARD:
  ✓ Stats count-up animation plays
  ✓ Skeleton loading for 3 cards
  ✓ Search/filter works client-side
  ✓ Empty state SVG shows when no products
  ✓ FAB pulse visible

ORDERS PAGE:
  ✓ Orders load from Firestore in real-time
  ✓ Status update persists
  ✓ Pagination (load more) works

PUBLIC STORE:
  ✓ All products render
  ✓ Out-of-stock products greyed out
  ✓ WhatsApp link opens correct app with pre-filled message
  ✓ Order logged in Firestore (check Firebase console)
  ✓ Haptics fire on Android order button tap
  ✓ OG meta tags present (use opengraph.xyz to verify)
  ✓ Footer "Create your store" link works
  ✓ Non-existent store → 404 page

DARK MODE:
  ✓ Toggle switches theme
  ✓ Preference saved to localStorage
  ✓ All pages readable in dark mode (no invisible text)
  ✓ System preference honored on first load

SECURITY:
  ✓ Try to POST directly to Firestore as unauthenticated → rejected by rules
  ✓ Try to upload image > 2MB to Storage → rejected by rules
  ✓ HTML/script injection in product name → sanitized, saved as plain text
  ✓ X-Frame-Options header present (DevTools → Network → Response Headers)

PWA:
  ✓ "Add to Home Screen" prompt appears on Android
  ✓ App opens in standalone mode (no browser chrome) from home screen
  ✓ Service worker registered (DevTools → Application → Service Workers)
```

---

## 🎯 FINAL DELIVERY REQUIREMENTS

The AI agent must produce **every file in the folder structure** — complete, no stubs, no TODOs, no "implement this yourself" placeholders. The following must be true on delivery:

1. `npm install && npm run build` completes with **zero errors and zero warnings**
2. `npm run dev` starts without errors
3. All 8 pages render and are navigable
4. Firebase connects when `.env.local` is populated correctly
5. Firestore, Storage, and Auth all work end-to-end
6. Dark mode toggle works on every page
7. PWA installable on Android Chrome
8. Vercel deploy succeeds on first `git push`
9. All security headers present in Vercel response
10. The public store page (`/store/:slug`) is visually stunning and works without login

---

## 💬 WHATSAPP MESSAGE TEMPLATES V3

```
// Order message (rich format with bold + line breaks):
"Hello! I'd like to place an order 🛍️

*{productName}*
💰 Price: {currency}{formattedPrice}

Please confirm availability and we can proceed. Thank you! 🙏"


// Store share message:
"Hey! 👋 Check out my store:

🏪 *{storeDisplayName}*
Browse my products and order directly on WhatsApp!

👉 {storeURL}

Tap the link, pick what you want, and message me to order! 🛒"


// WhatsApp link format:
https://wa.me/{E164Phone}?text={encodeURIComponent(message)}

// Store share (no recipient):
https://wa.me/?text={encodeURIComponent(shareMessage)}
```

---

## 🔁 CONTINUOUS DEPLOYMENT PIPELINE

```
Developer pushes to GitHub (main branch)
         ↓
Vercel detects push via GitHub webhook
         ↓
Vercel runs: npm install → npm run build
         ↓
On success: deploy to production CDN (global edge)
         ↓
Security headers applied from vercel.json
         ↓
Firebase security rules (deployed separately via CLI)
         ↓
App live at: https://your-app.vercel.app
```

**Branch strategy:**
- `main` → production (auto-deploy)
- `dev` → staging (separate Vercel preview URL per push)
- Feature branches → PR → review → merge to dev → merge to main

---

*WhatsApp Store Builder v3.0 · Upgraded Prompt · Security-Hardened · Dark Mode · PWA-Ready*
*Enhanced by Claude for professional AI agent deployment*
