import { Wifi, Car, Tv, Wind, Droplets, Dumbbell, Coffee, Home, Flame, Trees, Shield, Key } from "lucide-react";

interface AmenitiesSectionProps {
  amenities: string[];
}

const amenityIcons: Record<string, any> = {
  WiFi: Wifi,
  Internet: Wifi,
  Kitchen: Home,
  "Full Kitchen": Home,
  Kitchenette: Home,
  Parking: Car,
  TV: Tv,
  "Smart TV": Tv,
  AC: Wind,
  "Air Conditioning": Wind,
  Heating: Flame,
  Washer: Droplets,
  Dryer: Droplets,
  Laundry: Droplets,
  "Gym Access": Dumbbell,
  "Fitness Center": Dumbbell,
  Coffee: Coffee,
  "Coffee Maker": Coffee,
  "Hot Tub": Droplets,
  Spa: Droplets,
  Fireplace: Flame,
  Garden: Trees,
  Patio: Trees,
  BBQ: Flame,
  Grill: Flame,
  Balcony: Home,
  Concierge: Shield,
  Security: Shield,
  Safe: Shield,
  "Keyless Entry": Key,
  Pool: Droplets,
  Elevator: Car, // Using Car as placeholder
  "Wheelchair Accessible": Car, // Using Car as placeholder
  "Pet Friendly": Home, // Using Home as placeholder
  "Family Friendly": Home,
  Workspace: Home,
};

export default function AmenitiesSection({ amenities }: AmenitiesSectionProps) {
  return (
    <div className="mt-8 border-t border-gray-200 pt-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">What this place offers</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {amenities.map((amenity) => {
          const Icon = amenityIcons[amenity] || Home; // Default to Home icon
          return (
            <div key={amenity} className="flex items-center">
              <Icon className="w-5 h-5 text-gray-600 mr-3" />
              <span className="text-gray-700">{amenity}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
