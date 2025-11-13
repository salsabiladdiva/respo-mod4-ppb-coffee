# Progressive Web App (PWA) Setup Guide

## ✅ PWA Features yang Sudah Diimplementasikan

Project ini telah dikonfigurasi sebagai Progressive Web App dengan fitur-fitur berikut:

### 1. **Service Worker (Enhanced)**
- File: `public/sw.js`
- Fitur:
  - ✅ Network First strategy untuk HTML documents
  - ✅ Cache First strategy untuk images
  - ✅ Stale While Revalidate untuk assets lainnya
  - ✅ Automatic cache cleanup
  - ✅ Offline fallback

### 2. **next-pwa Integration**
- Automatic workbox configuration
- Build-time PWA manifest generation
- Service Worker registration

### 3. **Web App Manifest**
- File: `public/manifest.json`
- Konfigurasi:
  - App name: "BrewCan - Premium Canned Coffee"
  - Display mode: standalone
  - Theme color: #8B4513
  - App icons (192x192 & 512x512)

### 4. **Installable App**
- Support untuk install di mobile dan desktop
- Splash screen support
- Status bar styling

---

## 🧪 Testing Offline Functionality

### Di Browser Desktop (Chrome/Edge):

1. **Buka aplikasi:**
   ```
   http://localhost:3001
   ```

2. **Install PWA:**
   - Buka DevTools (F12)
   - Buka tab "Application" → "Manifest"
   - Klik "Install"
   - Atau klik ikon install di address bar

3. **Test Offline Mode:**
   - Buka DevTools (F12) → Network tab
   - Centang "Offline"
   - Refresh halaman
   - ✅ Aplikasi tetap bisa diakses dari cache

4. **Test Service Worker:**
   - Buka DevTools → Application → Service Workers
   - Lihat status "Active and running"

### Di Mobile (Android):

1. Buka aplikasi di Chrome mobile
2. Klik menu (3 titik) → "Install app"
3. Buka Settings → Apps → BrewCan
4. Coba mode offline → aplikasi tetap jalan

---

## 📦 Dependencies yang Digunakan

```json
{
  "next-pwa": "^5.6.0"  // PWA middleware untuk Next.js
}
```

---

## 🔄 Caching Strategy

### 1. Static Assets (Cache First)
- Google Fonts stylesheets
- Google Fonts webfonts
- CDN resources (CDN.jsdelivr.net)
- Cache duration: 365 days

### 2. Images (Cache First)
- API images
- Cache duration: 24 hours
- Max entries: 16

### 3. HTML Pages (Network First)
- Primary pages (/, /products, /profile)
- First tries network, fallback ke cache

### 4. Other Assets (Stale While Revalidate)
- CSS, JS files
- Serve from cache while fetching update

---

## 🔧 Konfigurasi Files

### `next.config.mjs`
```javascript
import withPWA from "next-pwa";

const withPWAConfig = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  runtimeCaching: [
    // ... caching strategies
  ],
});

export default withPWAConfig(nextConfig);
```

### `public/sw.js`
- Enhanced service worker dengan multiple caching strategies
- Offline fallback dengan pesan yang user-friendly

### `components/pwa-register.tsx`
- Client-side component untuk mendaftar Service Worker
- Auto-registration on page load

---

## 📊 Production Build

Untuk production build dengan PWA optimization:

```bash
npm run build
npm start
```

Aplikasi akan memiliki:
- ✅ Automatic Service Worker generation
- ✅ Optimized caching strategy
- ✅ Offline-first experience
- ✅ Installable app capability

---

## 🚀 Features untuk Offline Experience

1. **Automatic Caching**
   - Pages yang diakses otomatis dicache
   - Static assets dicache di awal install

2. **Smart Fallback**
   - Jika offline dan page belum dicache → error page
   - Images fallback ke placeholder (jika ada)

3. **Persistent Storage**
   - Data tersimpan di browser cache
   - Dapat diakses kembali setelah offline

4. **Background Sync** (Optional)
   - Dapat diimplementasikan untuk sync data saat online

---

## ✨ Testing Checklist

- [ ] Service Worker registered di DevTools
- [ ] Manifest dapat diakses di `/manifest.json`
- [ ] App dapat diinstall (ada install button)
- [ ] Dapat diakses offline
- [ ] Cache working di DevTools → Application → Cache Storage
- [ ] No errors di DevTools Console

---

## 🔗 Resources

- [MDN - Progressive Web Apps](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- [next-pwa Documentation](https://github.com/shadowwalker/next-pwa)
- [Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest)
- [Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)

---

## 🐛 Troubleshooting

### Service Worker tidak teregistrasi?
- Pastikan HTTPS (atau localhost)
- Buka DevTools → Console untuk error messages

### App tidak bisa diinstall?
- Pastikan manifest.json valid
- Pastikan ada app icons di public/

### Cache tidak terupdate?
- next-pwa akan auto update sesuai versioning
- Clear cache di DevTools jika perlu

---

Aplikasi BrewCan sekarang adalah PWA yang siap digunakan offline! 🎉
