"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Navigation from "@/components/navigation"
import { Coffee, Zap, Shield } from "lucide-react"
// Hapus import CoffeeCan3D
// import CoffeeCan3D from "@/components/coffee-can-3d" 
// Tambahkan import Image
import Image from "next/image" 

export default function Home() {
  const [isInstalled, setIsInstalled] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        console.log("Service Worker registration failed")
      })
    }

    window.addEventListener("beforeinstallprompt", () => {
      setIsInstalled(true)
    })

    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-950/40 via-transparent to-transparent animate-gradient-shift"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl"></div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Konten Teks (Kiri) */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-block px-4 py-2 bg-primary/20 border border-primary/50 rounded-full">
                  <p className="text-sm font-semibold text-primary flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Premium Coffee Experience
                  </p>
                </div>
                <h1 className="text-6xl md:text-7xl font-black text-balance bg-gradient-to-r from-amber-300 via-orange-400 to-orange-500 bg-clip-text text-transparent">
                  BrewCan
                </h1>
                <h2 className="text-2xl md:text-3xl font-light text-muted-foreground">Freshly Roasted, Ready to Sip</h2>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                Experience the finest specialty coffee in convenient, ready-to-drink cans. Carefully sourced from
                world-class roasters, expertly crafted for your perfect moment.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-primary-foreground font-bold rounded-xl hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 transform hover:scale-105"
                >
                  <Coffee className="w-5 h-5 mr-2" />
                  Explore Products
                </Link>
                <a
                  href="#about"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary text-primary font-bold rounded-xl hover:bg-primary/10 transition-all duration-300"
                >
                  Learn More
                </a>
              </div>

              {isInstalled && (
                <div className="bg-primary/15 border border-primary/50 rounded-xl p-4 backdrop-blur-sm">
                  <p className="text-sm font-semibold text-primary">
                    ✨ Install BrewCan on your device for offline access and seamless experience!
                  </p>
                </div>
              )}
            </div>

            {/* --- BLOK YANG DIUBAH (Gambar 3D) --- */}
            <div className="flex justify-center items-center relative">
              {/* <CoffeeCan3D /> <-- Komponen lama dihapus */}
              
              <Image
                src="/images/products/coffee-can-fix.png" // Path ke gambar baru Anda
                alt="Highly detailed 3D model of a BrewCan premium coffee can"
                width={420}
                height={600}
                priority // Penting untuk gambar hero agar dimuat cepat
                className="relative z-10 drop-shadow-2xl hover:drop-shadow-2xl transition-all duration-300 hover:scale-105"
              />
            </div>
            {/* --- AKHIR BLOK YANG DIUBAH --- */}

          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="about" className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-orange-950/10"></div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-5xl font-black bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
              Why Choose BrewCan?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Discover what makes us different</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Coffee,
                title: "Premium Quality",
                description: "Single-origin, specialty-grade coffee beans sourced from sustainable farms worldwide.",
                color: "from-orange-500",
              },
              {
                icon: Shield,
                title: "Fresh Sealed",
                description: "Innovative can technology preserves optimal flavor and keeps coffee fresh for months.",
                color: "from-amber-500",
              },
              {
                icon: Zap,
                title: "Ready to Go",
                description: "No brewing needed. Open, sip, and enjoy perfection anytime, anywhere.",
                color: "from-orange-400",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="group bg-card/50 backdrop-blur border border-orange-500/20 rounded-2xl p-8 hover:border-primary transition-all duration-300 hover:bg-card/80"
              >
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} to-amber-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 via-amber-600/20 to-orange-600/20 animate-gradient-shift"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/15 rounded-full blur-3xl"></div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
            Your Next Favorite Brew
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Discover our carefully curated collection of premium canned coffees from around the globe.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-orange-500 to-amber-500 text-primary-foreground font-bold rounded-xl hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 transform hover:scale-105"
          >
            <Coffee className="w-5 h-5 mr-2" />
            Explore Collection
          </Link>
        </div>
      </section>
    </main>
  )
}