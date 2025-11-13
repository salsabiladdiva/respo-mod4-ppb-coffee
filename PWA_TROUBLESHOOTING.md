# PWA Troubleshooting Guide

## 🔍 Diagnostic Checklist

Gunakan checklist ini jika mengalami masalah dengan PWA:

---

## ❌ Service Worker Tidak Teregistrasi

### Symptoms:
- DevTools → Application → Service Workers → (kosong)
- Console: "Service Worker registration failed"

### Causes & Solutions:

#### 1️⃣ HTTPS Requirement (Production)
```
❌ http://example.com (production)
✅ http://localhost:3000 (development)
✅ https://example.com (with cert)
```
**Solution**: Gunakan localhost untuk development

#### 2️⃣ Service Worker File Missing
```
❌ File tidak ada di public/sw.js
✅ File ada di public/sw.js
```
**Solution**: Pastikan file `public/sw.js` ada

#### 3️⃣ Browser Tidak Support
```
❌ Internet Explorer
✅ Chrome, Firefox, Safari, Edge
```
**Solution**: Update browser

#### 4️⃣ Scope Mismatch
```javascript
// ❌ Wrong
navigator.serviceWorker.register("/sw.js", { scope: "/admin" });

// ✅ Correct
navigator.serviceWorker.register("/sw.js", { scope: "/" });
```
**Solution**: Pastikan scope = "/"

### Debug Steps:
```
1. DevTools → F12
2. Console tab
3. Cari error messages
4. Copy error → paste ke console
5. Check browser compatibility
```

---

## ❌ App Tidak Bisa Diinstall

### Symptoms:
- Tidak ada tombol "Install" di address bar
- DevTools → Application → Manifest → (ada error)

### Causes & Solutions:

#### 1️⃣ Manifest Missing/Invalid
```
❌ Manifest tidak ada
❌ manifest.json tidak valid JSON
✅ public/manifest.json valid
```
**Debug**:
```javascript
// Open Console & run:
fetch('/manifest.json').then(r => r.json()).then(console.log)
```

#### 2️⃣ Manifest Requirements
```json
{
  "name": "App Name",              ✓ Required
  "short_name": "Short",           ✓ Required
  "icons": [{...}],                ✓ Required (192+512)
  "start_url": "/",                ✓ Required
  "display": "standalone"          ✓ Required
}
```
**Solution**: Check manifest.json has all required fields

#### 3️⃣ Icons Missing
```
❌ Icon files tidak ada di public/
✅ public/icon-192x192.png (ada)
✅ public/icon-512x512.png (ada)
```
**Solution**: Tambahkan icon files ke public/

#### 4️⃣ Service Worker Not Ready
- Must have SW registered & active
- Install depends on SW

**Solution**: 
1. Wait for SW to be active
2. Check DevTools → Service Workers → "active and running"

### Debug Steps:
```
1. DevTools → Application → Manifest
2. Check "Show install prompt"
3. Look for error messages
4. Validate manifest at: https://manifest-validator.appspot.com/
```

---

## ❌ Offline Tidak Berfungsi

### Symptoms:
- Offline mode → halaman blank/error
- Cache tidak digunakan
- Network → Offline → page muncul error

### Causes & Solutions:

#### 1️⃣ Halaman Belum Dicache
```
❌ Offline sebelum visit online
✅ Visit online → cache → offline
```
**Solution**: 
- Kunjungi halaman online dulu
- Tunggu SW caching
- Baru test offline

#### 2️⃣ Service Worker Stop
```
DevTools → Application → Service Workers → (tidak ada)
```
**Solution**:
- Reload page
- Check browser console for errors
- Restart browser

#### 3️⃣ Cache Storage Penuh
```
❌ Browser cache storage > limit
✅ Clear cache & retry
```
**Solution**:
```
DevTools → Application → Storage → Clear site data
- ✓ Cookies
- ✓ Local Storage  
- ✓ Cache Storage
- ✓ Service Workers
→ Clear
```

#### 4️⃣ Wrong Caching Strategy
```
// sw.js caching strategy mungkin salah
Network First → bisa offline tapi lambat
Cache First → bisa offline tapi konten stale
Stale While Revalidate → balanced
```
**Solution**: Check sw.js caching logic

### Debug Steps:
```javascript
// Open Console & run:

// Check SW status
navigator.serviceWorker.ready.then(r => console.log(r))

// List all caches
caches.keys().then(names => console.log(names))

// Check specific cache
caches.open('brewcan-static-v1').then(cache => {
  cache.keys().then(reqs => console.log(reqs))
})

// Test offline
// 1. Network tab → Offline (centang)
// 2. Refresh page (F5)
// 3. Should load from cache
```

---

## ❌ Cache Tidak Terupdate

### Symptoms:
- Old content showing
- Updated files not appearing
- Cache outdated

### Causes & Solutions:

#### 1️⃣ Service Worker Tidak Skip Waiting
```javascript
// ✓ Should be in sw.js install event
self.skipWaiting()

// ✓ Should be in next.config.mjs
skipWaiting: true
```
**Solution**: Ensure both settings active

#### 2️⃣ Browser Cache Aggressive
```
DevTools → Network → disable cache (centang)
```
**Solution**: Clear browser cache

#### 3️⃣ Cache Version Mismatch
```javascript
// sw.js menggunakan nama cache berbeda
const STATIC_CACHE = "brewcan-static-v1"
// Jika ada perubahan major → ubah nama:
const STATIC_CACHE = "brewcan-static-v2"
```
**Solution**: Increment version number

### Debug Steps:
```
1. DevTools → Application → Cache Storage
2. Check cache names & contents
3. DevTools → Network → check what's cached
4. Clear cache → reload → check again
```

---

## ❌ Performance Lambat

### Symptoms:
- Page loading slow
- Cache tidak membantu
- Network requests banyak

### Causes & Solutions:

#### 1️⃣ Service Worker Overhead
- First load selalu lebih lambat (SW registrasi)
- Second load + harus lebih cepat

**Solution**: 
```javascript
// Disable SW in development
disable: process.env.NODE_ENV === "development"
```

#### 2️⃣ Caching Strategy Suboptimal
```javascript
// ❌ Salah caching semua
// ✅ Smart caching per type
// - HTML: Network First
// - Images: Cache First  
// - CSS/JS: Stale While Revalidate
```

#### 3️⃣ Large Cache Size
- Browser cache storage limited (~50MB)
- Too many cached items = slower lookup

**Solution**: Limit cache entries
```javascript
expiration: {
  maxEntries: 32,
  maxAgeSeconds: 24 * 60 * 60  // 24 hours
}
```

### Optimization Tips:
```
1. Monitor cache size
2. Set reasonable TTL (Time To Live)
3. Limit max entries
4. Remove unused caches
5. Use compression
```

---

## ❌ Installation Error di Mobile

### Android Chrome Issues:

#### Issue: "App not available"
```
❌ Manifest missing or invalid
✅ Manifest valid & complete

Solution:
1. Check manifest.json
2. Ensure display: "standalone"
3. Ensure icons exist
4. Check colors are valid
```

#### Issue: "Install not available"
```
❌ Must be served over HTTPS
❌ Service Worker not active

Solution:
1. Use HTTPS (production)
2. Wait for SW activation
3. Refresh page
4. Try again
```

### iOS Safari Issues:

#### Issue: Can't install
```
❌ iOS doesn't fully support PWA
✅ Apple's "Add to Home Screen"

Solution:
1. Tap Share button
2. Select "Add to Home Screen"
3. Confirm name
4. App added to home screen
```

#### Issue: No status bar theming
```
❌ iOS ignores theme-color
✅ Use apple-mobile-web-app-status-bar-style

Solution: In layout.tsx meta tags:
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
```

---

## 🆘 Emergency Fixes

### Clear Everything & Start Fresh
```
1. DevTools → Application → Storage
2. Click "Clear site data"
   ✓ Cookies
   ✓ Local Storage
   ✓ Cache Storage
   ✓ Service Workers
3. Refresh page (Ctrl+Shift+R)
4. Wait for SW to reregister
```

### Unregister Service Worker Manually
```javascript
// Open Console & run:
navigator.serviceWorker.getRegistrations()
  .then(registrations => {
    registrations.forEach(r => r.unregister())
  })
```

### Force Update Service Worker
```javascript
// In console:
navigator.serviceWorker.ready
  .then(registration => {
    registration.update()
  })
```

### Check All Registrations
```javascript
// In console:
navigator.serviceWorker.getRegistrations()
  .then(regs => regs.forEach(r => console.log(r)))
```

---

## 🐛 Common Console Errors & Fixes

### ❌ "Failed to register a ServiceWorker"
```
Cause: File not found or syntax error
Fix: Check public/sw.js exists and valid JavaScript
```

### ❌ "Cannot read properties of undefined"
```
Cause: navigator.serviceWorker not available
Fix: Must use HTTPS (or localhost)
```

### ❌ "Cross-Origin Request Blocked"
```
Cause: CORS issue
Fix: Check if resource is same-origin
Solution: Use relative URLs
```

### ❌ "TypeError: Cannot find module"
```
Cause: Module not installed
Fix: Run npm install
```

### ❌ "next-pwa not found"
```
Cause: next-pwa not installed
Fix: npm install next-pwa
```

---

## ✅ Verification Commands

```bash
# Check if sw.js exists
ls -la public/sw.js

# Check if manifest.json exists  
cat public/manifest.json

# Validate JSON
node -e "console.log(JSON.parse(require('fs').readFileSync('public/manifest.json')))"

# Check next.config.mjs
grep "withPWA\|next-pwa" next.config.mjs

# Check package.json
grep "next-pwa" package.json

# Rebuild project
npm run build

# Start dev server
npm run dev
```

---

## 📞 Getting Help

### Check These Resources:
1. **Console**: DevTools → Console (errors)
2. **Network**: DevTools → Network (requests)
3. **Application**: DevTools → Application → SW/Cache
4. **Manifest**: Browse to `/manifest.json`
5. **SW File**: Browse to `/sw.js`

### Documentation:
- `PWA_SETUP.md` - Full setup guide
- `QUICK_PWA_TEST.md` - Quick testing reference
- `PWA_ARCHITECTURE.md` - Architecture details

### External Resources:
- [MDN PWA Docs](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- [web.dev PWA](https://web.dev/progressive-web-apps/)
- [next-pwa GitHub Issues](https://github.com/shadowwalker/next-pwa/issues)

---

## 🎯 Quick Diagnostic Flowchart

```
┌─ PWA Not Working? ─────────────┐
│                                │
│ 1. Check Console (F12)         │
│    Any errors?                 │
│    ├─ Yes → Read error         │
│    └─ No → Continue            │
│                                │
│ 2. Check Application Tab       │
│    Service Worker active?      │
│    ├─ No → Restart browser     │
│    └─ Yes → Continue           │
│                                │
│ 3. Check Cache Storage         │
│    Caches exist?               │
│    ├─ No → Visit page online   │
│    └─ Yes → Continue           │
│                                │
│ 4. Test Offline                │
│    Network → Offline (✓)       │
│    Refresh → Works?            │
│    ├─ No → Check cache         │
│    └─ Yes → ✅ PWA Working     │
│                                │
│ 5. Still not working?          │
│    → Clear site data           │
│    → Restart browser           │
│    → Check documentation       │
│                                │
└────────────────────────────────┘
```

---

**Happy debugging! ☕🔧**

Last Updated: November 12, 2025
