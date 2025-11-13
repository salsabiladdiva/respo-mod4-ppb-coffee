"use client"

import { useEffect } from "react"

export function PWARegister() {
  useEffect(() => {
    // Only run in browser
    if (typeof window === "undefined") return

    // Check if service workers are supported
    if (!("serviceWorker" in navigator)) {
      console.log("Service Workers not supported in this browser")
      return
    }

    // Register service worker after page load
    const registerServiceWorker = async () => {
      try {
        const registration = await navigator.serviceWorker.register("/sw.js", {
          scope: "/",
        })
        console.log("Service Worker registered successfully:", registration)
      } catch (error) {
        console.error("Service Worker registration failed:", error)
      }
    }

    // Wait for page to load
    if (document.readyState === "loading") {
      window.addEventListener("load", registerServiceWorker)
      return () => {
        window.removeEventListener("load", registerServiceWorker)
      }
    } else {
      // Page already loaded
      registerServiceWorker()
    }
  }, [])

  return null
}
