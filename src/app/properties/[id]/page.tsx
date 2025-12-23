import { notFound } from "next/navigation";
import ReviewsSection from "@/components/PropertyPage/ReviewsSection";
import { mockReviews, normalizeReviews } from "@/lib/mockData";
import PropertyHeader from "@/components/PropertyPage/PropertyHeader";
import AmenitiesSection from "@/components/PropertyPage/AmenitiesSection";

// Mock property data - in real app, this would come from an API
const mockProperties = [
  {
    id: "2B N1 A",
    name: "29 Shoreditch Heights",
    title: "Modern 2-Bedroom Apartment in Shoreditch",
    description: "A beautifully renovated 2-bedroom apartment in the heart of Shoreditch. Perfect for business travelers or families looking to explore London. Features high-speed WiFi, modern kitchen, and stunning city views.",
    location: "Shoreditch, London",
    bedrooms: 2,
    bathrooms: 2,
    guests: 4,
    price: 189,
    rating: 4.8,
    reviewCount: 127,
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w-800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&auto=format&fit=crop",
    ],
    amenities: ["WiFi", "Kitchen", "Washer", "Dryer", "AC", "Heating", "TV", "Parking"],
    host: {
      name: "Sarah Johnson",
      memberSince: "2018",
      verified: true,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&auto=format&fit=crop&q=80",
    },
  },
  {
    id: "Studio 3C",
    name: "Downtown Loft",
    title: "Stylish Studio Loft in Downtown",
    description: "Industrial-chic studio loft with exposed brick walls and high ceilings. Located in the vibrant downtown area, walking distance to restaurants, shops, and nightlife.",
    location: "Downtown, Manchester",
    bedrooms: 1,
    bathrooms: 1,
    guests: 2,
    price: 145,
    rating: 4.5,
    reviewCount: 89,
    images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=800&auto=format&fit=crop"],
    amenities: ["WiFi", "Kitchenette", "Washer", "AC", "TV", "Gym Access"],
    host: {
      name: "Michael Chen",
      memberSince: "2019",
      verified: true,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80",
    },
  },
  {
    id: "3B N2 B",
    name: "Lakeside Villa",
    title: "Luxury 3-Bedroom Villa with Lake View",
    description: "Stunning modern villa overlooking the lake. Perfect for large families or groups. Features a private garden, hot tub, and panoramic views of the surrounding countryside.",
    location: "Lake District",
    bedrooms: 3,
    bathrooms: 2,
    guests: 6,
    price: 325,
    rating: 4.9,
    reviewCount: 64,
    images: ["https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop"],
    amenities: ["WiFi", "Full Kitchen", "Hot Tub", "Fireplace", "Parking", "Garden", "BBQ"],
    host: {
      name: "Emma Wilson",
      memberSince: "2017",
      verified: true,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80",
    },
  },
  {
    id: "Penthouse A",
    name: "Skyline View",
    title: "Penthouse with Panoramic Skyline Views",
    description: "Luxury penthouse apartment with 360-degree city views. Features floor-to-ceiling windows, private balcony, and premium finishes throughout.",
    location: "City Center, Birmingham",
    bedrooms: 2,
    bathrooms: 2,
    guests: 4,
    price: 275,
    rating: 4.7,
    reviewCount: 42,
    images: ["https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1487956382158-bb926046304a?w=800&auto=format&fit=crop"],
    amenities: ["WiFi", "Gourmet Kitchen", "Balcony", "AC", "Smart TV", "Concierge", "Parking"],
    host: {
      name: "David Park",
      memberSince: "2020",
      verified: true,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
    },
  },
];

interface PropertyPageProps {
  params: Promise<{ id: string }>;
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { id } = await params;
  const property = mockProperties.find((p) => p.id === id);

  if (!property) {
    notFound();
  }

  // Get approved reviews for this property
  const allReviews = normalizeReviews(mockReviews);
  const propertyReviews = allReviews.filter((review) => review.listingId === id && review.isApproved && review.status === "published");

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Image */}
      <div className="relative h-[60vh]">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 z-10" />
        <img src={property.images[0]} alt={property.title} className="w-full h-full object-cover" />
        <div className="absolute bottom-0 left-0 right-0 z-20 p-8 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">{property.title}</h1>
          <p className="text-xl">{property.location}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            <PropertyHeader property={property} />

            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About this property</h2>
              <p className="text-gray-600 leading-relaxed">{property.description}</p>
            </div>

            <AmenitiesSection amenities={property.amenities} />

            {/* Reviews Section - This only shows approved reviews */}
            <ReviewsSection reviews={propertyReviews} propertyId={property.id} propertyName={property.name} />
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-3xl font-bold text-gray-900">£{property.price}</span>
                  <span className="text-gray-600 ml-2">per night</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="ml-1 font-semibold">{property.rating}</span>
                  <span className="text-gray-600 ml-1">({property.reviewCount} reviews)</span>
                </div>
              </div>

              {/* Booking Form */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
                    <input type="date" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
                    <input type="date" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    {[...Array(property.guests)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} guest{i + 1 > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>

                <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200">Reserve</button>

                <p className="text-center text-gray-500 text-sm">You won't be charged yet</p>
              </div>

              {/* Host Info */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="flex items-center">
                  <img src={property.host.avatar} alt={property.host.name} className="w-12 h-12 rounded-full object-cover" />
                  <div className="ml-4">
                    <p className="font-semibold text-gray-900">Hosted by {property.host.name}</p>
                    <p className="text-sm text-gray-600">Host since {property.host.memberSince}</p>
                    {property.host.verified && <p className="text-sm text-green-600">✓ Verified Host</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Generate static paths for our mock properties
export async function generateStaticParams() {
  return mockProperties.map((property) => ({
    id: property.id,
  }));
}
