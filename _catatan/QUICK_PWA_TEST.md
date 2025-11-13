# Quick PWA Testing Guide - BrewCan Coffee App

## 🚀 Jalankan Development Server

```bash
cd e:\responsi-ppb-mod4-coffee
npm run dev -- --port 3001
# atau
$env:PORT=3001; npm run dev
```

Server akan berjalan di: **http://localhost:3001**

---

## 🧪 Test PWA Offline Features

### Step 1: Buka Browser Developer Tools
```
Tekan: F12 (Chrome/Edge) atau Cmd+Option+I (Mac)
```

### Step 2: Go to Application Tab
```
DevTools → Application → Service Workers
```

### Step 3: Aktifkan Offline Mode
```
DevTools → Network → Centang "Offline"
```

### Step 4: Refresh Aplikasi
```
Tekan: Ctrl+R (atau Cmd+R)
```

✅ **Expected Result:** Aplikasi tetap berjalan dengan konten dari cache!

---

## 📱 Test Installation (Mock)

### Chrome/Edge Desktop:
1. Buka **http://localhost:3001**
2. Lihat icon "Install" di address bar (jika ada)
3. Klik untuk install app
4. App akan buka di window terpisah (standalone mode)

### Chrome Mobile:
1. Buka aplikasi di Android Chrome
2. Menu (3 titik) → "Install app"
3. Akan muncul di home screen
4. Tap untuk buka in standalone mode

---

## 📊 Check Cache Storage

```
DevTools → Application → Cache Storage
```

Anda akan melihat:
- ✅ `brewcan-static-v1` - Static assets (HTML pages)
- ✅ `brewcan-dynamic-v1` - Dynamic cached content (images, API responses)
- ✅ `next-pwa-workbox-*` - next-pwa workbox caches

### Cache Contents:
```
brewcan-static-v1
├── / (home page)
├── /products
├── /profile
└── /manifest.json

brewcan-dynamic-v1
├── /images/* (cached images)
├── /api/* (API responses)
└── fonts/... (Google Fonts)
```

---

## ✅ PWA Verification Checklist

Di DevTools → Application:

- [ ] **Manifest**: ✓ Valid manifest.json
  ```
  Application → Manifest
  Show installed app dialog → ada tombol Install
  ```

- [ ] **Service Worker**: ✓ Status "activated and running"
  ```
  Application → Service Workers
  Lihat: "http://localhost:3001/sw.js is running"
  ```

- [ ] **Caches**: ✓ Multiple cache storage
  ```
  Application → Cache Storage
  Lihat: brewcan-static-v1, brewcan-dynamic-v1
  ```

- [ ] **Offline**: ✓ Bisa akses saat offline
  ```
  Network → centang Offline
  Refresh halaman → tetap bisa akses
  ```

---

## 🔍 Console Logs untuk Debug

Buka Console (DevTools → Console) untuk lihat:

```javascript
// Service Worker registration
"Service Worker registered successfully: ..."

// Service Worker activation
"Service Worker activating..."

// Cache operations
"Deleting old cache: ..."
```

---

## 🚨 Common Issues & Solutions

### ❌ "Service Worker registration failed"
- **Solusi**: Buka di HTTPS atau localhost (http://localhost:3001 ✅)

### ❌ "sw.js not found"
- **Solusi**: Pastikan file ada di `public/sw.js`
- **Fix**: Restart dev server

### ❌ "Cache tidak ada"
- **Solusi**: 
  1. Refresh halaman beberapa kali
  2. Close dan buka ulang browser
  3. Clear cache di DevTools → Application → Storage → Clear

### ❌ "Offline tapi blank page"
- **Solusi**: Page tersebut belum di-cache
- Pastikan refresh online dulu sebelum test offline

---

## 📈 Performance Tips

1. **First Visit (Online)**
   - Caches static assets
   - Mulai caching dynamic content

2. **Second Visit (Online)**
   - Lebih cepat (mostly dari cache)
   - Background update dari network

3. **Offline Visit**
   - Instant load dari cache
   - Seamless experience

---

## 🔄 Force Update Cache

Jika cache stuck, clear di DevTools:

```
DevTools → Application → Storage → Clear site data
✓ Cookies
✓ Local Storage
✓ Cache Storage
✓ Service Workers

Klik "Clear" → Refresh halaman
```

---

## 📚 File Structure

```
e:\responsi-ppb-mod4-coffee\
├── public/
│   ├── sw.js ✨ (Enhanced Service Worker)
│   ├── manifest.json ✨ (PWA Manifest)
│   └── ... (icons, assets)
│
├── components/
│   ├── pwa-register.tsx ✨ (PWA Registration)
│   └── ...
│
├── app/
│   ├── layout.tsx ✨ (Updated with PWARegister)
│   ├── page.tsx
│   └── ...
│
├── next.config.mjs ✨ (PWA Configuration)
├── package.json ✨ (next-pwa added)
└── PWA_SETUP.md ✨ (Detailed guide)
```

---

## 🎯 Selesai!

Aplikasi BrewCan Coffee sekarang adalah **Progressive Web App** lengkap dengan:

✅ Service Worker
✅ Web App Manifest
✅ Offline Support
✅ Installable App
✅ Smart Caching
✅ Offline Fallback

**Siap digunakan di device manapun!** 🚀☕

