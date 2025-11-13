const CACHE_NAME = "brewcan-v1"
const STATIC_CACHE = "brewcan-static-v1"
const DYNAMIC_CACHE = "brewcan-dynamic-v1"
const URLS_TO_CACHE = [
  "/",
  "/products",
  "/profile",
]

// Install event - cache static assets
self.addEventListener("install", (event) => {
  console.log("Service Worker installing...")
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      console.log("Caching static assets...")
      // Cache each URL individually to avoid failing on one error
      return Promise.allSettled(
        URLS_TO_CACHE.map((url) =>
          cache.add(url).catch((err) => {
            console.warn(`Failed to cache ${url}:`, err)
            // Continue even if one fails
            return Promise.resolve()
          })
        ),
      )
    }),
  )
  self.skipWaiting()
})

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  console.log("Service Worker activating...")
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            console.log("Deleting old cache:", cacheName)
            return caches.delete(cacheName)
          }
        }),
      )
    }),
  )
  self.clients.claim()
})

// Fetch event - Network first, then cache
self.addEventListener("fetch", (event) => {
  const { request } = event

  // Skip cross-origin requests
  if (!request.url.startsWith(self.location.origin)) {
    return
  }

  // For HTML documents, use Network First strategy
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Only cache successful responses
          if (response && response.status === 200) {
            const clonedResponse = response.clone()
            caches.open(DYNAMIC_CACHE).then((cache) => {
              cache.put(request, clonedResponse)
            })
          }
          return response
        })
        .catch((networkError) => {
          console.log("Network failed, trying cache:", request.url, networkError)
          // Fallback to cache if offline
          return caches.match(request).then((cachedResponse) => {
            if (cachedResponse) {
              console.log("Serving from cache:", request.url)
              return cachedResponse
            }
            // If not in cache, try to serve a fallback page
            return caches.match("/").then((fallback) => {
              if (fallback) {
                return fallback
              }
              return new Response(
                "<!DOCTYPE html><html><head><title>Offline</title></head><body><h1>You are offline</h1><p>This page is not available offline. Please check your internet connection.</p></body></html>",
                {
                  status: 200,
                  headers: new Headers({
                    "Content-Type": "text/html; charset=utf-8",
                  }),
                },
              )
            })
          })
        }),
    )
    return
  }

  // For images, use Cache First strategy
  if (request.destination === "image") {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse
        }
        return fetch(request)
          .then((response) => {
            if (response && response.status === 200) {
              const clonedResponse = response.clone()
              caches.open(DYNAMIC_CACHE).then((cache) => {
                cache.put(request, clonedResponse)
              })
            }
            return response
          })
          .catch((err) => {
            console.log("Image fetch failed:", request.url)
            // Return a transparent 1x1 image as fallback
            return new Response(
              new Uint8Array([
                0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00,
                0x00, 0x0d, 0x49, 0x48, 0x44, 0x52, 0x00, 0x00, 0x00, 0x01,
                0x00, 0x00, 0x00, 0x01, 0x08, 0x06, 0x00, 0x00, 0x00, 0x1f,
                0x15, 0xc4, 0x89, 0x00, 0x00, 0x00, 0x0a, 0x49, 0x44, 0x41,
                0x54, 0x78, 0x9c, 0x63, 0x00, 0x01, 0x00, 0x00, 0x05, 0x00,
                0x01, 0x0d, 0x0a, 0x2d, 0xb4, 0x00, 0x00, 0x00, 0x00, 0x49,
                0x45, 0x4e, 0x44, 0xae, 0x42, 0x60, 0x82,
              ]),
              {
                status: 200,
                headers: {
                  "Content-Type": "image/png",
                },
              },
            )
          })
      }),
    )
    return
  }

  // For other resources (CSS, JS, etc), use Stale While Revalidate
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const fetchPromise = fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            const clonedResponse = response.clone()
            caches.open(DYNAMIC_CACHE).then((cache) => {
              cache.put(request, clonedResponse)
            })
          }
          return response
        })
        .catch((err) => {
          console.log("Fetch failed for:", request.url, err)
          if (cachedResponse) {
            return cachedResponse
          }
          throw err
        })

      return cachedResponse || fetchPromise
    }),
  )
})
