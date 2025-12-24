import { notFound } from "next/navigation";
import PropertyDetail from "@/components/PropertyPage/PropertyDetail";

// Mock property data
const mockProperties = [
  {
    id: "2b-n1-a",
    originalId: "2B N1 A",
    name: "29 Shoreditch Heights",
    title: "Central Flat in Spitalfields - The Flex London",
    description:
      "This apartment is located on Strype Street, a quiet yet convenient spot in the heart of London. It's a spacious unit with all the essentials you'll need, including top-quality amenities. The location is ideal, with easy access to transport and nearby shops and cafes.",
    fullDescription: `This beautifully designed apartment combines modern comfort with the historic charm of Spitalfields. Located on Strype Street, a quiet yet convenient spot in the heart of London, this spacious unit comes with all the essentials you'll need for a comfortable stay.\n\nThe open-plan living area features large windows that flood the space with natural light, comfortable seating, and a smart TV. The fully equipped kitchen includes modern appliances, cookware, and everything needed to prepare meals.\n\nThe bedroom offers a luxurious king-size bed with premium linens, ample storage, and a peaceful atmosphere for restful nights. The bathroom is modern and clean with excellent water pressure.\n\nTOP FEATURES:\n• Prime Spitalfields location\n• High-speed WiFi (100MB+)\n• Fully equipped kitchen\n• Smart TV with streaming\n• Luxury bedding & towels\n• 24/7 check-in available\n• Professional cleaning between guests`,
    location: "Spitalfields, London, United Kingdom",
    exactLocation: "Strype Street, London E1 6LQ",
    neighborhood: "Located in the vibrant Spitalfields neighborhood, known for its historic market, independent boutiques, and diverse dining options. Walking distance to Brick Lane, Shoreditch, and the City of London.",
    bedrooms: 1,
    bathrooms: 1,
    guests: 4,
    beds: 2,
    price: 189,
    rating: 4.8,
    reviewCount: 127,
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=1200&auto=format&fit=crop",
    ],
    amenities: [
      { name: "WiFi", category: "Internet" },
      { name: "Kitchen", category: "Kitchen" },
      { name: "Washing Machine", category: "Laundry" },
      { name: "Dryer", category: "Laundry" },
      { name: "Air Conditioning", category: "Climate" },
      { name: "Heating", category: "Climate" },
      { name: "TV", category: "Entertainment" },
      { name: "Hair Dryer", category: "Bathroom" },
      { name: "Iron", category: "Essentials" },
      { name: "Essentials", category: "Essentials" },
      { name: "Shampoo", category: "Bathroom" },
      { name: "Smoke Detector", category: "Safety" },
      { name: "Carbon Monoxide Detector", category: "Safety" },
      { name: "Fire Extinguisher", category: "Safety" },
      { name: "First Aid Kit", category: "Safety" },
    ],
    houseRules: ["No smoking", "No pets", "No parties or events", "Check-in after 3:00 PM", "Check-out before 10:00 AM", "Security deposit required"],
    cancellationPolicy: {
      flexible: "Full refund up to 30 days before check-in",
      moderate: "Full refund up to 14 days before check-in for stays less than 28 days",
      strict: "No refund for bookings less than 14 days before check-in",
    },
    host: {
      name: "Sarah Johnson",
      memberSince: "2018",
      verified: true,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&auto=format&fit=crop&q=80",
      responseRate: "100%",
      responseTime: "within an hour",
      description: "Professional host with 5 years experience. I take pride in providing comfortable, clean, and well-equipped spaces for my guests.",
    },
    coordinates: {
      lat: 51.52,
      lng: -0.075,
    },
  },
  {
    id: "studio-3c",
    originalId: "Studio 3C",
    name: "Downtown Loft",
    title: "Stylish Studio Loft in Downtown",
    description: "Industrial-chic studio loft with exposed brick walls and high ceilings. Located in the vibrant downtown area, walking distance to restaurants, shops, and nightlife.",
    fullDescription: "Industrial-chic studio loft with exposed brick walls and high ceilings. Located in the vibrant downtown area, walking distance to restaurants, shops, and nightlife. Features modern amenities and comfortable furnishings.",
    location: "Downtown, Manchester",
    exactLocation: "Manchester City Center, M1 1AB",
    neighborhood: "Located in the heart of Manchester's city center, close to shopping, dining, and entertainment venues.",
    bedrooms: 1,
    bathrooms: 1,
    guests: 2,
    beds: 1,
    price: 145,
    rating: 4.5,
    reviewCount: 89,
    images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&auto=format&fit=crop", "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=1200&auto=format&fit=crop"],
    amenities: [
      { name: "WiFi", category: "Internet" },
      { name: "Kitchenette", category: "Kitchen" },
      { name: "Washer", category: "Laundry" },
      { name: "AC", category: "Climate" },
      { name: "TV", category: "Entertainment" },
      { name: "Gym Access", category: "Facilities" },
    ],
    houseRules: ["No smoking", "Check-in after 2:00 PM", "Check-out before 11:00 AM"],
    cancellationPolicy: {
      flexible: "Full refund up to 30 days before check-in",
      moderate: "Full refund up to 7 days before check-in",
      strict: "No refund for bookings less than 7 days before check-in",
    },
    host: {
      name: "Michael Chen",
      memberSince: "2019",
      verified: true,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80",
      responseRate: "95%",
      responseTime: "within 2 hours",
      description: "Architect turned host. I design spaces that are both beautiful and functional.",
    },
    coordinates: {
      lat: 53.4808,
      lng: -2.2426,
    },
  },
  {
    id: "3b-n2-b",
    originalId: "3B N2 B",
    name: "Lakeside Villa",
    title: "Luxury 3-Bedroom Villa with Lake View",
    description: "Stunning modern villa overlooking the lake. Perfect for large families or groups. Features a private garden, hot tub, and panoramic views of the surrounding countryside.",
    fullDescription:
      "Stunning modern villa overlooking the lake. Perfect for large families or groups. Features a private garden, hot tub, and panoramic views of the surrounding countryside. The villa includes three spacious bedrooms, two modern bathrooms, and an open-plan living area with floor-to-ceiling windows.",
    location: "Lake District",
    exactLocation: "Lake District National Park",
    neighborhood: "Set in the picturesque Lake District National Park, surrounded by beautiful scenery and outdoor activities.",
    bedrooms: 3,
    bathrooms: 2,
    guests: 6,
    beds: 3,
    price: 325,
    rating: 4.9,
    reviewCount: 64,
    images: ["https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&auto=format&fit=crop", "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop"],
    amenities: [
      { name: "WiFi", category: "Internet" },
      { name: "Full Kitchen", category: "Kitchen" },
      { name: "Hot Tub", category: "Facilities" },
      { name: "Fireplace", category: "Climate" },
      { name: "Parking", category: "Parking" },
      { name: "Garden", category: "Outdoor" },
      { name: "BBQ", category: "Outdoor" },
    ],
    houseRules: ["No smoking", "No pets", "Check-in after 4:00 PM", "Check-out before 10:00 AM", "Quiet hours after 10 PM"],
    cancellationPolicy: {
      flexible: "Full refund up to 60 days before check-in",
      moderate: "Full refund up to 30 days before check-in",
      strict: "No refund for bookings less than 30 days before check-in",
    },
    host: {
      name: "Emma Wilson",
      memberSince: "2017",
      verified: true,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&auto=format&fit=crop&q=80",
      responseRate: "100%",
      responseTime: "within an hour",
      description: "Nature lover and hospitality enthusiast. I love sharing our beautiful villa with guests.",
    },
    coordinates: {
      lat: 54.4609,
      lng: -3.0886,
    },
  },
  {
    id: "penthouse-a",
    originalId: "Penthouse A",
    name: "Skyline View",
    title: "Penthouse with Panoramic Skyline Views",
    description: "Luxury penthouse apartment with 360-degree city views. Features floor-to-ceiling windows, private balcony, and premium finishes throughout.",
    fullDescription:
      "Luxury penthouse apartment with 360-degree city views. Features floor-to-ceiling windows, private balcony, and premium finishes throughout. The penthouse offers two spacious bedrooms, two modern bathrooms, and a gourmet kitchen with high-end appliances.",
    location: "City Center, Birmingham",
    exactLocation: "Birmingham City Center, B1 1BB",
    neighborhood: "Located in the heart of Birmingham's city center, with easy access to shopping, dining, and cultural attractions.",
    bedrooms: 2,
    bathrooms: 2,
    guests: 4,
    beds: 2,
    price: 275,
    rating: 4.7,
    reviewCount: 42,
    images: ["https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1200&auto=format&fit=crop", "https://images.unsplash.com/photo-1487956382158-bb926046304a?w=1200&auto=format&fit=crop"],
    amenities: [
      { name: "WiFi", category: "Internet" },
      { name: "Gourmet Kitchen", category: "Kitchen" },
      { name: "Balcony", category: "Outdoor" },
      { name: "AC", category: "Climate" },
      { name: "Smart TV", category: "Entertainment" },
      { name: "Concierge", category: "Services" },
      { name: "Parking", category: "Parking" },
    ],
    houseRules: ["No smoking", "No parties", "Check-in after 3:00 PM", "Check-out before 11:00 AM"],
    cancellationPolicy: {
      flexible: "Full refund up to 30 days before check-in",
      moderate: "Full refund up to 14 days before check-in",
      strict: "No refund for bookings less than 14 days before check-in",
    },
    host: {
      name: "David Park",
      memberSince: "2020",
      verified: true,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
      responseRate: "90%",
      responseTime: "within 2 hours",
      description: "Business professional who enjoys hosting fellow travelers in our luxury properties.",
    },
    coordinates: {
      lat: 52.4862,
      lng: -1.8904,
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

  try {
    // Fetch ONLY approved reviews for this property from server
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/reviews/hostaway?listingId=${id}&onlyApproved=true`, {
      cache: "no-store", // Don't cache, get fresh data
      next: { revalidate: 0 }, // Always revalidate
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.status === "success") {
      // Update property stats based on actual approved reviews
      const propertyWithUpdatedStats = {
        ...property,
        reviewCount: data.reviews.length,
        rating: data.reviews.length > 0 ? parseFloat((data.reviews.reduce((sum: number, r: any) => sum + r.overallRating, 0) / data.reviews.length).toFixed(1)) : property.rating,
      };

      console.log(`Property page: Loaded ${data.reviews.length} approved reviews for ${property.name}`);

      return <PropertyDetail property={propertyWithUpdatedStats} reviews={data.reviews} />;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error("Error fetching approved reviews:", error);

    // Fallback: Return property with empty reviews
    const propertyWithNoReviews = {
      ...property,
      reviewCount: 0,
      rating: property.rating,
    };

    return <PropertyDetail property={propertyWithNoReviews} reviews={[]} />;
  }
}

// Generate static paths
export async function generateStaticParams() {
  return mockProperties.map((property) => ({
    id: property.id,
  }));
}
