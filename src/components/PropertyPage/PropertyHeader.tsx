import { Star, MapPin, Users, Bed, Bath } from "lucide-react";

interface PropertyHeaderProps {
  property: {
    title: string;
    location: string;
    bedrooms: number;
    bathrooms: number;
    guests: number;
    rating: number;
    reviewCount: number;
  };
}

export default function PropertyHeader({ property }: PropertyHeaderProps) {
  return (
    <div className="border-b border-gray-200 pb-6">
      <div className="flex flex-wrap items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{property.title}</h1>
          <div className="flex items-center mt-2 text-gray-600">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{property.location}</span>
          </div>
        </div>

        <div className="flex items-center mt-4 lg:mt-0">
          <Star className="w-5 h-5 text-yellow-400 fill-current" />
          <span className="ml-1 text-lg font-semibold">{property.rating}</span>
          <span className="ml-1 text-gray-600">({property.reviewCount} reviews)</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
        <div className="flex items-center">
          <Users className="w-6 h-6 text-gray-400 mr-3" />
          <div>
            <p className="text-sm text-gray-600">Guests</p>
            <p className="font-semibold">{property.guests}</p>
          </div>
        </div>

        <div className="flex items-center">
          <Bed className="w-6 h-6 text-gray-400 mr-3" />
          <div>
            <p className="text-sm text-gray-600">Bedrooms</p>
            <p className="font-semibold">{property.bedrooms}</p>
          </div>
        </div>

        <div className="flex items-center">
          <Bath className="w-6 h-6 text-gray-400 mr-3" />
          <div>
            <p className="text-sm text-gray-600">Bathrooms</p>
            <p className="font-semibold">{property.bathrooms}</p>
          </div>
        </div>

        <div className="flex items-center">
          <div className="w-6 h-6 text-gray-400 mr-3 flex items-center justify-center">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-600">Property Type</p>
            <p className="font-semibold">Apartment</p>
          </div>
        </div>
      </div>
    </div>
  );
}
