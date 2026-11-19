"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, ShoppingBag, Menu, X } from "lucide-react"
import {
  SignInButton,
  SignUpButton,
  UserButton,
  useAuth,
} from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { isLoaded, isSignedIn } = useAuth()

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
        isScrolled ? "bg-blue-600  shadow-sm" : "bg-blue-800"
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
            <Link href="/sneakers" className="text-white hover:text-yellow-200 transition-colors">
              Sneakers
            </Link>
            <Link href="/running" className="text-white hover:text-yellow-200 transition-colors">
              Running
            </Link>
              <Link href="/boots" className="block px-4 py-3 text-slate-100 hover:text-accent/80">
                Boots
              </Link>
            <Link href="/formal" className="text-white hover:text-yellow-200 transition-colors">
              Formal
            </Link>
            <Link href="/sandals" className="text-white hover:text-yellow-200 transition-colors">
              Sandals
            </Link>
            <Link href="/casual" className="text-slate-200 hover:text-accent/80 transition-colors font-medium">
              Casual
            </Link>
              <Link href="/sale" className="block px-4 py-3 text-slate-100 hover:text-accent/80">
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
            {isLoaded && !isSignedIn && (
              <>
                <SignInButton mode="modal">
                  <Button variant="ghost" className="text-white hover:text-yellow-200">
                    Sign in
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button className="bg-yellow-400 text-blue-950 hover:bg-yellow-300">
                    Sign up
                  </Button>
                </SignUpButton>
              </>
            )}
            {isLoaded && isSignedIn && (
              <>
                <Link
                  href="/account"
                  className="text-white hover:text-yellow-200 transition-colors"
                >
                  Account
                </Link>
                <UserButton />
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-background border-t border-border">
            <div className="px-4 sm:px-6 pt-4 pb-6 space-y-2">
              <Link href="/sneakers" className="block px-4 py-3 text-white hover:text-yellow-200">
                Sneakers
              </Link>
              <Link href="/running" className="block px-4 py-3 text-white hover:text-yellow-200">
                Running
              </Link>
               <Link href="/boots" className="block px-4 py-3 text-white hover:text-yellow-200">
               Boots
              </Link>
              <Link href="/formal" className="block px-4 py-3 text-white hover:text-yellow-200">
                Formal
              </Link>
              <Link href="/category/sandals" className="block px-4 py-3 text-white hover:text-yellow-200">
                Sandals
              </Link>
              <Link href="/category/casual" className="block px-4 py-3 text-slate-100 hover:text-accent/80">
                Casual
              </Link>
              <Link href="/sale" className="block px-4 py-3 text-slate-100 hover:text-accent/80">
                Sale
              </Link>
              <div className="px-4 py-3">
                <Input placeholder="Search shoes..." />
              </div>
              <div className="px-4 py-3">
                {isLoaded && !isSignedIn && (
                  <div className="flex gap-3">
                    <SignInButton mode="modal">
                      <Button variant="outline" className="flex-1">
                        Sign in
                      </Button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <Button className="flex-1">Sign up</Button>
                    </SignUpButton>
                  </div>
                )}
                {isLoaded && isSignedIn && (
                  <div className="flex items-center justify-between">
                    <Link
                      href="/account"
                      className="text-white hover:text-yellow-200"
                    >
                      Account
                    </Link>
                    <UserButton />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
