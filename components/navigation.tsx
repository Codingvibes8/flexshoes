"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, ShoppingBag, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
      <nav
          className={`fixed top-0 w-full z-50 transition-all duration-300 ${
              isScrolled ? "bg-red-700 backdrop-blur-sm shadow-sm" : "bg-red-800"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-900 rounded-lg flex items-center justify-center">
                <span className="text-slate-100 font-bold text-lg font-sans">F</span>
              </div>
              <span className="text-xl font-bold font-sans text-slate-100">FlexShoes</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/men" className="text-white hover:text-yellow-200 transition-colors">
                Men&apos;s
              </Link>
              <Link href="/women" className="text-white hover:text-yellow-200 transition-colors">
                Women&apos;s
              </Link>
              <Link href="/kids" className="text-white hover:text-yellow-200 transition-colors">
                Kids
              </Link>
              <Link href="/sale" className="text-slate-200 hover:text-accent/80 transition-colors font-medium">
                Sale
              </Link>
            </div>

            {/* Search and Cart */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white w-4 h-4" />
                <Input placeholder="Search shoes..." className="pl-10 w-64" />
              </div>
              <Button variant="ghost" size="icon">
                <ShoppingBag className="w-5 h-5" />
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
              <div className="md:hidden bg-background border-t border-border">
                <div className="px-4 sm:px-6 pt-4 pb-6 space-y-2">
                  <Link href="/men" className="block px-4 py-3 text-white hover:text-yellow-200">
                    Men&apos;s
                  </Link>
                  <Link href="/women" className="block px-4 py-3 text-white hover:text-yellow-200">
                    Women&apos;s
                  </Link>
                  <Link href="/kids" className="block px-4 py-3 text-white hover:text-yellow-200">
                    Kids
                  </Link>
                  <Link href="/sale" className="block px-4 py-3 text-slate-100 hover:text-accent/80">
                    Sale
                  </Link>
                  <div className="px-4 py-3">
                    <Input placeholder="Search shoes..." />
                  </div>
                </div>
              </div>
          )}
        </div>
      </nav>
  )
}
