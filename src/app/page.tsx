import Link from "next/link";
import { ArrowRight, Star, BarChart3, Shield, Zap } from "lucide-react";

export default function HomePage() {
  const features = [
    {
      icon: BarChart3,
      title: "Smart Dashboard",
      description: "Monitor and manage all guest reviews from one central dashboard with powerful analytics.",
    },
    {
      icon: Shield,
      title: "Quality Control",
      description: "Approve which reviews appear on your property pages to maintain your brand reputation.",
    },
    {
      icon: Zap,
      title: "Quick Insights",
      description: "Spot trends and recurring issues with sentiment analysis and category ratings.",
    },
  ];

  const properties = [
    {
      id: "2B N1 A",
      name: "29 Shoreditch Heights",
      location: "Shoreditch, London",
      rating: 4.8,
      reviews: 127,
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop",
    },
    {
      id: "Studio 3C",
      name: "Downtown Loft",
      location: "Manchester City Center",
      rating: 4.5,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop",
    },
    {
      id: "3B N2 B",
      name: "Lakeside Villa",
      location: "Lake District",
      rating: 4.9,
      reviews: 64,
      image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&auto=format&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="absolute inset-0 bg-black opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to Flex Living
              <span className="block text-3xl md:text-4xl mt-2">Reviews Management</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">Monitor guest feedback, improve property performance, and showcase the best reviews.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 flex items-center justify-center">
                Go to Dashboard
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link href="/properties/2B N1 A" className="bg-transparent border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 flex items-center justify-center">
                View Example Property
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Powerful Review Management</h2>
          <p className="text-gray-600 mt-2">Everything you need to handle guest feedback effectively</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="bg-white p-8 rounded-xl shadow-md">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <feature.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Properties Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Our Properties</h2>
            <p className="text-gray-600 mt-2">See how reviews enhance our property listings</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {properties.map((property) => (
              <Link key={property.id} href={`/properties/${property.id}`} className="group">
                <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="relative h-48">
                    <img src={property.image} alt={property.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{property.name}</h3>
                    <p className="text-gray-600 mb-4">{property.location}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                        <span className="font-semibold">{property.rating}</span>
                        <span className="text-gray-500 ml-1">({property.reviews} reviews)</span>
                      </div>
                      <span className="text-blue-600 font-semibold group-hover:underline">View property →</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Manage Your Reviews?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Start optimizing your property performance with our comprehensive review management system.</p>
          <Link href="/dashboard" className="inline-flex items-center bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100">
            Access Dashboard
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
