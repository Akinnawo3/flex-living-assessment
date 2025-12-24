"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, BarChart3, Building, Menu, X, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function DashboardNavigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPropertiesOpen, setIsPropertiesOpen] = useState(false);

  const properties = [
    { id: "2b-n1-a", name: "29 Shoreditch Heights" },
    { id: "studio-3c", name: "Downtown Loft" },
    { id: "3b-n2-b", name: "Lakeside Villa" },
    { id: "penthouse-a", name: "Skyline View" },
  ];

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsPropertiesOpen(false);
  }, [pathname]);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="relative h-10 w-10">
                <Image src="/brand-logo.png" alt="Flex Living" width={40} height={40} className="object-contain" />
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900 hidden sm:block">Flex Living</span>
            </div>
            {/* Desktop Navigation */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8 sm:items-center">
              <Link href="/" className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${pathname === "/" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}>
                <Home className="w-4 h-4 mr-2" />
                Home
              </Link>
              <Link href="/dashboard" className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${pathname === "/dashboard" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}>
                <BarChart3 className="w-4 h-4 mr-2" />
                Dashboard
              </Link>

              {/* Desktop Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsPropertiesOpen(!isPropertiesOpen)}
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${pathname?.startsWith("/properties") ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
                >
                  <span>Properties</span>
                  <ChevronDown className="w-4 h-4 ml-1" />
                </button>

                {isPropertiesOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsPropertiesOpen(false)}></div>
                    <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                      <div className="py-1">
                        <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">View Properties</div>
                        {properties.map((property) => (
                          <button
                            key={property.id}
                            onClick={() => {
                              router.push(`/properties/${property.id}`);
                              setIsPropertiesOpen(false);
                            }}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          >
                            {property.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100">
              {isMobileMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className={`flex items-center pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                pathname === "/" ? "bg-blue-50 border-blue-500 text-blue-700" : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
              }`}
            >
              <Home className="w-5 h-5 mr-3" />
              Home
            </Link>
            <Link
              href="/dashboard"
              className={`flex items-center pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                pathname === "/dashboard" ? "bg-blue-50 border-blue-500 text-blue-700" : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
              }`}
            >
              <BarChart3 className="w-5 h-5 mr-3" />
              Dashboard
            </Link>
            <div className="pl-3 pr-4 py-2">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Properties</div>
              <div className="space-y-1">
                {properties.map((property) => (
                  <Link
                    key={property.id}
                    href={`/properties/${property.id}`}
                    className={`block pl-6 pr-4 py-2 text-base font-medium rounded-md ${pathname === `/properties/${property.id}` ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"}`}
                  >
                    {property.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
