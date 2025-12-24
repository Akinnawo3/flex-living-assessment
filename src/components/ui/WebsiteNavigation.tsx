"use client";

import { ArrowLeft, Building, Globe, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function WebsiteNavigation() {
  const pathname = usePathname();
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}

          <Link href={"/"}>
            <div className="flex items-center cursor-pointer">
              <div className="relative h-10 w-10">
                <Image src="/brand-logo.png" alt="Flex Living" width={40} height={40} className="object-contain" />
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900 hidden sm:block">the flex.</span>
            </div>{" "}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">
              Londons
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">
              About Us
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">
              Careers
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">
              Contact
            </a>

            {/* Dashboard Link */}
            <Link href="/dashboard" className="flex items-center text-blue-600 hover:text-blue-800 font-medium">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go to Dashboard
            </Link>

            {/* Language Selector */}
            <div className="relative">
              <button onClick={() => setIsLanguageOpen(!isLanguageOpen)} className="flex items-center text-gray-700 hover:text-gray-900">
                <Globe className="w-4 h-4 mr-2" />
                English
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isLanguageOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsLanguageOpen(false)}></div>
                  <div className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1">
                      <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">English</button>
                      <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Español</button>
                      <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Français</button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Currency Selector */}
            <div className="relative">
              <button onClick={() => setIsCurrencyOpen(!isCurrencyOpen)} className="flex items-center text-gray-700 hover:text-gray-900">
                <span className="font-medium">GBP £</span>
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isCurrencyOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsCurrencyOpen(false)}></div>
                  <div className="absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1">
                      <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">GBP £</button>
                      <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">USD $</button>
                      <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">EUR €</button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* User Menu */}
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <User className="w-5 h-5 text-gray-600" />
            </button>
          </nav>
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <Link href="/dashboard" className="flex items-center text-blue-600 hover:text-blue-800 mr-4">
              <ArrowLeft className="w-4 h-4 mr-1" />
              <span className="text-sm font-medium">Dashboard</span>
            </Link>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100">
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
              Londons
            </a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
              About Us
            </a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
              Careers
            </a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
              Contact
            </a>
            <div className="px-3 py-2">
              <div className="text-sm font-medium text-gray-500 mb-2">Language</div>
              <div className="space-y-1">
                <button className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md">English</button>
                <button className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md">Español</button>
                <button className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md">Français</button>
              </div>
            </div>
            <div className="px-3 py-2">
              <div className="text-sm font-medium text-gray-500 mb-2">Currency</div>
              <div className="space-y-1">
                <button className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md">GBP £</button>
                <button className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md">USD $</button>
                <button className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md">EUR €</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
