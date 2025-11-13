"use client"

import Navigation from "@/components/navigation"
import { Sparkles } from "lucide-react"

export default function Products() {
  const products = [
    {
      id: 1,
      name: "Classic Espresso",
      variety: "Dark Roast",
      origin: "Brazil",
      description: "Bold and rich espresso blend with notes of chocolate and nuts.",
      icon: "🤎",
      color: "from-yellow-700 to-orange-700",
    },
    {
      id: 2,
      name: "Morning Brew",
      variety: "Medium Roast",
      origin: "Colombia",
      description: "Smooth and balanced with hints of caramel and citrus.",
      icon: "☕",
      color: "from-orange-600 to-amber-600",
    },
    {
      id: 3,
      name: "Mountain Peaks",
      variety: "Light Roast",
      origin: "Ethiopia",
      description: "Bright and fruity with floral notes and clean finish.",
      icon: "🏔️",
      color: "from-amber-500 to-orange-500",
    },
    {
      id: 4,
      name: "Velvet Nights",
      variety: "Extra Dark Roast",
      origin: "Sumatra",
      description: "Deep and intense with earthy undertones and smooth body.",
      icon: "🌙",
      color: "from-gray-800 to-orange-900",
    },
    {
      id: 5,
      name: "Tropical Escape",
      variety: "Medium Roast",
      origin: "Costa Rica",
      description: "Sweet and fruity with tropical notes and chocolate finish.",
      icon: "🌴",
      color: "from-orange-500 to-yellow-500",
    },
    {
      id: 6,
      name: "Midnight Ritual",
      variety: "Dark Roast",
      origin: "Kenya",
      description: "Complex with berry notes, wine-like body, and crisp acidity.",
      icon: "✨",
      color: "from-slate-900 to-orange-800",
    },
  ]

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Header */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-950/30 to-transparent"></div>
        <div className="absolute -right-40 top-0 w-96 h-96 bg-orange-500/15 rounded-full blur-3xl"></div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-6 h-6 text-primary" />
            <span className="text-sm font-semibold text-primary">PREMIUM COLLECTION</span>
          </div>
          <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
            Our Collection
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Hand-selected premium canned coffees sourced from the world's finest coffee regions.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="group relative bg-card/50 backdrop-blur border border-orange-500/20 rounded-2xl overflow-hidden hover:border-primary transition-all duration-300 hover:bg-card/80"
              >
                <div
                  className={`relative h-72 bg-gradient-to-br ${product.color} flex items-center justify-center overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="text-8xl group-hover:scale-125 transition-transform duration-300">{product.icon}</div>
                </div>

                {/* Product Info */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">{product.variety}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-primary/20 text-primary rounded-full font-medium text-sm border border-primary/30">
                      {product.origin}
                    </span>
                  </div>

                  <p className="text-muted-foreground leading-relaxed">{product.description}</p>

                  <div className="pt-4 flex gap-3">
                    <button className="flex-1 px-4 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-primary-foreground font-bold rounded-lg hover:shadow-lg hover:shadow-orange-500/50 transition-all transform hover:scale-105">
                      Add to Cart
                    </button>
                    <button className="px-4 py-3 border-2 border-primary text-primary font-bold rounded-lg hover:bg-primary/10 transition-all">
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-orange-950/10"></div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: "50+", label: "Coffee Varieties" },
              { number: "15+", label: "Countries Sourced" },
              { number: "100K+", label: "Happy Customers" },
            ].map((stat, i) => (
              <div
                key={i}
                className="text-center p-8 bg-card/50 backdrop-blur border border-orange-500/20 rounded-2xl hover:border-primary transition-all"
              >
                <div className="text-5xl font-black bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <p className="text-muted-foreground font-semibold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
