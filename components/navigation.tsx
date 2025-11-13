"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Coffee, Home, Package, User } from "lucide-react"

export default function Navigation() {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/products", label: "Products", icon: Package },
    { path: "/profile", label: "Profile", icon: User },
  ]

  return (
    <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-orange-500/20 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-2xl font-black bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent hover:scale-110 transition-transform"
          >
            <Coffee className="w-8 h-8 text-primary" />
            <span>BrewCan</span>
          </Link>

          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-2 font-bold transition-all duration-300 px-4 py-2 rounded-lg ${
                  isActive(item.path)
                    ? "text-primary bg-primary/10 border border-primary/50"
                    : "text-muted-foreground hover:text-foreground hover:bg-primary/5"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center gap-2">
            <nav className="flex gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`p-3 rounded-lg transition-all duration-300 ${
                    isActive(item.path)
                      ? "bg-primary/20 text-primary border border-primary/50"
                      : "text-muted-foreground hover:bg-primary/10"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
