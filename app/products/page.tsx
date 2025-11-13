"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
// Pastikan semua ikon ini di-import
import { Sparkles, Leaf, Percent, Brain } from "lucide-react"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

// Tipe data produk (tetap sama)
type Product = {
  id: number
  name: string
  variety: string
  origin: string
  description: string
  imageUrl: string
  color: string
  manfaat: string
  cara_pembuatan: string
  gizi: { [key: string]: string }
}

export default function Products() {
  // Data produk (tetap sama)
  const products: Product[] = [
    {
      id: 1,
      name: "Classic Espresso",
      variety: "Dark Roast",
      origin: "Brazil",
      description: "Bold and rich espresso blend with notes of chocolate and nuts.",
      imageUrl: "/images/products/classic-espresso.jpg",
      color: "from-yellow-700 to-orange-700",
      manfaat: "Memberikan tendangan energi instan dan meningkatkan fokus. Kaya akan antioksidan.",
      cara_pembuatan: "Biji kopi Brazil pilihan dipanggang gelap (dark roast) secara perlahan untuk mengeluarkan cita rasa cokelat dan kacang yang intens. Diekstraksi di bawah tekanan tinggi.",
      gizi: {
        "Kalori": "5 kcal",
        "Lemak Total": "0g",
        "Gula": "0g",
        "Protein": "1g",
        "Kafein": "150mg",
      },
    },
    {
      id: 2,
      name: "Morning Brew",
      variety: "Medium Roast",
      origin: "Colombia",
      description: "Smooth and balanced with hints of caramel and citrus.",
      imageUrl: "/images/products/morning-brew.jpg",
      color: "from-orange-600 to-amber-600",
      manfaat: "Pilihan sempurna untuk memulai hari dengan seimbang. Asam lambung (acidity) yang bersahabat.",
      cara_pembuatan: "Biji kopi Supremo Kolombia dipanggang medium untuk menjaga keseimbangan rasa karamel dan asam sitrus yang menyegarkan.",
      gizi: {
        "Kalori": "3 kcal",
        "Lemak Total": "0g",
        "Gula": "0g",
        "Protein": "<1g",
        "Kafein": "120mg",
      },
    },
    {
      id: 3,
      name: "Mountain Peaks",
      variety: "Light Roast",
      origin: "Ethiopia",
      description: "Bright and fruity with floral notes and clean finish.",
      imageUrl: "/images/products/mountain-peaks.jpg",
      color: "from-amber-500 to-orange-500",
      manfaat: "Menonjolkan karakter asli biji kopi. Cocok untuk penikmat kopi yang mencari rasa kompleks dan unik.",
      cara_pembuatan: "Biji Yirgacheffe Ethiopia dipanggang ringan (light roast) untuk memaksimalkan aroma bunga (floral) dan rasa buah-buahan yang cerah.",
      gizi: {
        "Kalori": "2 kcal",
        "Lemak Total": "0g",
        "Gula": "0g",
        "Protein": "<1g",
        "Kafein": "100mg",
      },
    },
    {
      id: 4,
      name: "Velvet Nights",
      variety: "Extra Dark Roast",
      origin: "Sumatra",
      description: "Deep and intense with earthy undertones and smooth body.",
      imageUrl: "/images/products/velvet-nights.jpg",
      color: "from-gray-800 to-orange-900",
      manfaat: "Memberikan pengalaman minum kopi yang kuat dan menenangkan. Rendah asam.",
      cara_pembuatan: "Biji Mandheling dari Sumatra dipanggang hingga level 'French Roast' untuk rasa yang dalam, pekat, dan sedikit smokey.",
      gizi: {
        "Kalori": "5 kcal",
        "Lemak Total": "0g",
        "Gula": "0g",
        "Protein": "1g",
        "Kafein": "180mg",
      },
    },
    {
      id: 5,
      name: "Tropical Escape",
      variety: "Medium Roast",
      origin: "Costa Rica",
      description: "Sweet and fruity with tropical notes and chocolate finish.",
      imageUrl: "/images/products/tropical-escape.jpg",
      color: "from-orange-500 to-yellow-500",
      manfaat: "Memberikan rasa manis alami dan nuansa buah tropis yang menyegarkan pikiran.",
      cara_pembuatan: "Diproses 'honey-processed' yang unik, biji kopi Kosta Rika ini dipanggang medium untuk menonjolkan rasa manis buah dan cokelat.",
      gizi: {
        "Kalori": "3 kcal",
        "Lemak Total": "0g",
        "Gula": "0g",
        "Protein": "<1g",
        "Kafein": "110mg",
      },
    },
    {
      id: 6,
      name: "Midnight Ritual",
      variety: "Dark Roast",
      origin: "Kenya",
      description: "Complex with berry notes, wine-like body, and crisp acidity.",
      imageUrl: "/images/products/midnight-ritual.jpg",
      color: "from-slate-900 to-orange-800",
      manfaat: "Kopi yang kompleks dan kaya rasa, cocok untuk dinikmati saat butuh inspirasi.",
      cara_pembuatan: "Biji AA Kenya berkualitas tinggi dipanggang gelap untuk menyeimbangkan rasa 'wine-like' dan aroma buah berry yang khas.",
      gizi: {
        "Kalori": "4 kcal",
        "Lemak Total": "0g",
        "Gula": "0g",
        "Protein": "<1g",
        "Kafein": "140mg",
      },
    },
  ]

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Header (Tetap Sama) */}
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

      {/* Products Grid (Tetap Sama) */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="group relative bg-card/50 backdrop-blur border border-orange-500/20 rounded-2xl overflow-hidden hover:border-primary transition-all duration-300 hover:bg-card/80 flex flex-col"
              >
                <div className={`relative h-72 overflow-hidden`}>
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                    className="group-hover:scale-110 transition-transform duration-300 ease-in-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                </div>

                <div className="p-6 space-y-4 flex flex-col flex-1">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">{product.variety}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-primary/20 text-primary rounded-full font-medium text-sm border border-primary/30">
                      {product.origin}
                    </span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed flex-1">{product.description}</p>
                  <div className="pt-4 flex gap-3">
                    <button className="flex-1 px-4 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-primary-foreground font-bold rounded-lg hover:shadow-lg hover:shadow-orange-500/50 transition-all transform hover:scale-105">
                      Add to Cart
                    </button>
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="px-4 py-3 border-2 border-primary text-primary font-bold rounded-lg hover:bg-primary/10 transition-all"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section (Tetap Sama) */}
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

      {/* --- BAGIAN DIALOG YANG DIPERBAIKI --- */}
      <Dialog
        open={!!selectedProduct}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setSelectedProduct(null)
          }
        }}
      >
        <DialogContent className="sm:max-w-[600px] bg-card border-orange-500/20">
          {selectedProduct && (
            <>
              <DialogHeader>
                <DialogTitle className="text-3xl font-black bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent mb-2">
                  {selectedProduct.name}
                </DialogTitle>
                <DialogDescription className="text-muted-foreground text-base">
                  {selectedProduct.description}
                </DialogDescription>
              </DialogHeader>

              {/* Gunakan Tabs untuk organize info */}
              <Tabs defaultValue="manfaat" className="w-full mt-4">
                <TabsList className="grid w-full grid-cols-3 bg-background">
                  <TabsTrigger value="manfaat">Manfaat</TabsTrigger>
                  {/* FIX 1: Mengubah value menjadi 'proses' agar konsisten */}
                  <TabsTrigger value="proses">Proses</TabsTrigger>
                  <TabsTrigger value="gizi">Info Gizi</TabsTrigger>
                </TabsList>

                {/* FIX 2: Menambah padding 'px-2' dan 'leading-relaxed' */}
                <TabsContent value="manfaat" className="pt-4 px-2 text-muted-foreground">
                  <div className="flex items-start gap-3">
                    <Leaf className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <p className="leading-relaxed">{selectedProduct.manfaat}</p>
                  </div>
                </TabsContent>

                {/* FIX 3: Menyesuaikan value, padding, dan line-height */}
                <TabsContent value="proses" className="pt-4 px-2 text-muted-foreground">
                   <div className="flex items-start gap-3">
                    <Brain className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <p className="leading-relaxed">{selectedProduct.cara_pembuatan}</p>
                  </div>
                </TabsContent>

                {/* FIX 4: Menambah padding dan line-height */}
                <TabsContent value="gizi" className="pt-4 px-2 text-muted-foreground">
                  <div className="flex items-start gap-3">
                     <Percent className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <ul className="space-y-2 leading-relaxed">
                      {Object.entries(selectedProduct.gizi).map(([key, value]) => (
                        <li key={key}>
                          <span className="font-semibold text-foreground">{key}:</span> {value}
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>
              </Tabs>
            </>
          )}
        </DialogContent>
      </Dialog>
    </main>
  )
}