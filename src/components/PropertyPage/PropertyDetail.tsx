"use client";

import { useState } from "react";
import { Star, MapPin, Users, Bed, Bath, Check, Wifi, Home, Wind, Tv, Droplets, Shield, Calendar, Clock, Award, Heart, Share2, ChevronLeft, ChevronRight, Maximize2, X, Car, Dumbbell, Trees, Key, Coffee, Flame } from "lucide-react";
import ReviewsSection from "./ReviewsSection";
import { NormalizedReview } from "@/lib/mockData";
import { motion, AnimatePresence } from "framer-motion";

interface PropertyDetailProps {
  property: {
    id: string;
    originalId: string;
    name: string;
    title: string;
    description: string;
    fullDescription?: string;
    location: string;
    exactLocation?: string;
    neighborhood?: string;
    bedrooms: number;
    bathrooms: number;
    guests: number;
    beds: number;
    price: number;
    rating: number;
    reviewCount: number;
    images: string[];
    amenities: { name: string; category: string }[];
    houseRules: string[];
    cancellationPolicy: {
      flexible: string;
      moderate: string;
      strict: string;
    };
    host: {
      name: string;
      memberSince: string;
      verified: boolean;
      avatar: string;
      responseRate: string;
      responseTime: string;
      description: string;
    };
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  reviews: NormalizedReview[];
}

// Amenity icons mapping
const amenityIcons: Record<string, any> = {
  WiFi: Wifi,
  Internet: Wifi,
  Kitchen: Home,
  Kitchenette: Home,
  "Full Kitchen": Home,
  "Gourmet Kitchen": Home,
  "Washing Machine": Droplets,
  Washer: Droplets,
  Dryer: Droplets,
  Laundry: Droplets,
  "Air Conditioning": Wind,
  AC: Wind,
  Heating: Flame,
  TV: Tv,
  "Smart TV": Tv,
  "Hair Dryer": Droplets,
  Iron: Home,
  Essentials: Home,
  Shampoo: Droplets,
  "Smoke Detector": Shield,
  "Carbon Monoxide Detector": Shield,
  "Fire Extinguisher": Shield,
  "First Aid Kit": Shield,
  Parking: Car,
  "Gym Access": Dumbbell,
  "Fitness Center": Dumbbell,
  "Hot Tub": Droplets,
  Spa: Droplets,
  Fireplace: Flame,
  Garden: Trees,
  Patio: Trees,
  Balcony: Home,
  BBQ: Flame,
  Grill: Flame,
  Concierge: Shield,
  Security: Shield,
  Safe: Shield,
  "Keyless Entry": Key,
  Coffee: Coffee,
  "Coffee Maker": Coffee,
  Pool: Droplets,
  Workspace: Home,
};

export default function PropertyDetail({ property, reviews }: PropertyDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guestCount, setGuestCount] = useState(property.guests);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  // Group amenities by category for better organization
  const groupedAmenities = property.amenities.reduce((acc, amenity) => {
    if (!acc[amenity.category]) {
      acc[amenity.category] = [];
    }
    acc[amenity.category].push(amenity);
    return acc;
  }, {} as Record<string, typeof property.amenities>);

  return (
    <div className="min-h-screen bg-white pb-3">
      {/* Property Title and Actions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-start">
          <div>
            <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-bold text-gray-900">
              {property.title}
            </motion.h1>
            <div className="flex items-center mt-2 space-x-4">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="ml-1 font-semibold">{property.rating}</span>
                <span className="ml-1 text-gray-600">({property.reviewCount} reviews)</span>
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{property.location}</span>
              </div>
            </div>
          </div>
          <div className="flex space-x-3">
            <button onClick={() => setIsFavorite(!isFavorite)} className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Heart className={`w-5 h-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-500"}`} />
            </button>
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Share2 className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>
      </div>
      {/* Image Gallery */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="relative h-[500px] rounded-xl overflow-hidden">
          <motion.img
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            src={property.images[currentImageIndex]}
            alt={property.title}
            className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
            onClick={() => setIsLightboxOpen(true)}
          />

          <button onClick={prevImage} className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 p-3 rounded-full shadow-lg hover:bg-white transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={nextImage} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 p-3 rounded-full shadow-lg hover:bg-white transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {property.images.map((_, idx) => (
              <button key={idx} onClick={() => setCurrentImageIndex(idx)} className={`w-2 h-2 rounded-full transition-all ${idx === currentImageIndex ? "bg-white scale-125" : "bg-white/50"}`} />
            ))}
          </div>

          <button onClick={() => setIsLightboxOpen(true)} className="absolute right-4 bottom-4 bg-black/70 text-white p-2 rounded-lg hover:bg-black/90 transition-colors">
            <Maximize2 className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-4 gap-3 mt-3">
          {property.images.slice(0, 4).map((img, idx) => (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.02 }}
              onClick={() => setCurrentImageIndex(idx)}
              className={`h-24 rounded-lg overflow-hidden transition-all ${currentImageIndex === idx ? "ring-2 ring-blue-500 ring-offset-2" : "opacity-90 hover:opacity-100"}`}
            >
              <img src={img} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
            </motion.button>
          ))}
          {property.images.length > 4 && <button className="h-24 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors">+{property.images.length - 4} more</button>}
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {" "}
        {/* Added bottom padding */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Property Details */}
          <div className="lg:col-span-2">
            {/* Property Stats */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 bg-gray-50 rounded-2xl mb-10">
              <div className="text-center">
                <Users className="w-10 h-10 text-gray-500 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900">{property.guests}</div>
                <div className="text-sm text-gray-600 mt-1">Guests</div>
              </div>
              <div className="text-center">
                <Bed className="w-10 h-10 text-gray-500 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900">{property.bedrooms}</div>
                <div className="text-sm text-gray-600 mt-1">Bedrooms</div>
              </div>
              <div className="text-center">
                <Bath className="w-10 h-10 text-gray-500 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900">{property.bathrooms}</div>
                <div className="text-sm text-gray-600 mt-1">Bathrooms</div>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 text-gray-500 mx-auto mb-3 flex items-center justify-center">
                  <Bed className="w-7 h-7" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{property.beds}</div>
                <div className="text-sm text-gray-600 mt-1">Beds</div>
              </div>
            </motion.div>

            {/* Property Description */}
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">About this property</h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 mb-6 text-lg leading-relaxed">{property.description}</p>
                <div className="text-gray-700 whitespace-pre-line bg-gray-50 p-6 rounded-xl border border-gray-200">{property.fullDescription || property.description}</div>
              </div>
            </motion.section>

            {/* Amenities - Improved Layout */}
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Amenities</h2>
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
                {Object.entries(groupedAmenities).map(([category, amenities]) => (
                  <div key={category} className="mb-8 last:mb-0">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-300">{category}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {amenities.map((amenity) => {
                        const Icon = amenityIcons[amenity.name] || Check;
                        return (
                          <div key={amenity.name} className="flex items-center p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all">
                            <div className="w-8 h-8 flex items-center justify-center mr-3">
                              <Icon className="w-5 h-5 text-blue-600" />
                            </div>
                            <span className="text-gray-800 font-medium">{amenity.name}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Stay Policies */}
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Stay Policies</h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                {/* Check-in/Check-out */}
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-blue-600" />
                    Check-in & Check-out
                  </h3>
                  <div className="space-y-6">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center text-gray-600 mb-2">
                        <Calendar className="w-4 h-4 mr-2" />
                        Check-in Time
                      </div>
                      <div className="text-gray-900 font-semibold text-lg">3:00 PM</div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center text-gray-600 mb-2">
                        <Calendar className="w-4 h-4 mr-2" />
                        Check-out Time
                      </div>
                      <div className="text-gray-900 font-semibold text-lg">10:00 AM</div>
                    </div>
                  </div>
                </div>

                {/* House Rules */}
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-6">House Rules</h3>
                  <ul className="space-y-3">
                    {property.houseRules.map((rule) => (
                      <li key={rule} className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                        <span className="text-gray-700">{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Cancellation Policy */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <Shield className="w-6 h-6 mr-3 text-blue-600" />
                  Cancellation Policy
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4 text-lg">For stays less than 28 days</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{property.cancellationPolicy.moderate}</span>
                      </li>
                      <li className="flex items-start">
                        <X className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{property.cancellationPolicy.strict}</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4 text-lg">For stays of 28 days or more</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{property.cancellationPolicy.flexible}</span>
                      </li>
                      <li className="flex items-start">
                        <X className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">No refund for bookings less than 30 days before check-in</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Reviews Section */}
            <ReviewsSection reviews={reviews} propertyId={property.id} propertyName={property.name} />
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="sticky top-24 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              {/* Price Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <span className="text-4xl font-bold">£{property.price}</span>
                    <span className="text-blue-100 ml-2">per night</span>
                  </div>
                  <div className="flex items-center bg-white/20 px-3 py-1 rounded-full">
                    <Star className="w-4 h-4 text-yellow-300 fill-current mr-1" />
                    <span className="font-semibold">{property.rating}</span>
                    <span className="text-blue-100 ml-1">({property.reviewCount})</span>
                  </div>
                </div>
                <p className="text-blue-100 text-sm">Includes taxes and fees</p>
              </div>

              {/* Booking Form */}
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Check-in</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="date"
                        value={checkInDate}
                        onChange={(e) => setCheckInDate(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium text-gray-900 bg-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Check-out</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="date"
                        value={checkOutDate}
                        onChange={(e) => setCheckOutDate(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium text-gray-900 bg-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Guests</label>
                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium text-gray-900 bg-white appearance-none"
                  >
                    {[...Array(property.guests)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} guest{i + 1 > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>

                <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-lg font-bold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl mb-4">Book Your Stay</button>

                <p className="text-center text-gray-500 text-sm mb-6">You won't be charged yet • Free cancellation</p>

                <div className="pt-6 border-t border-gray-200">
                  <button className="w-full border-2 border-blue-600 text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors mb-3">Send Inquiry</button>
                  <div className="flex items-center justify-center text-green-600 text-sm">
                    <Check className="w-4 h-4 mr-2" />
                    Instant booking confirmation
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-4">Price breakdown</h4>
                  <div className="space-y-3 text-sm text-gray-400">
                    <div className="flex justify-between">
                      <span className="text-gray-600">£{property.price} × 3 nights</span>
                      <span className="font-medium">£{property.price * 3}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Cleaning fee</span>
                      <span className="font-medium">£45</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Service fee</span>
                      <span className="font-medium">£32</span>
                    </div>
                    <div className="border-t border-gray-200 pt-3 mt-3">
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>£{property.price * 3 + 45 + 32}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Location Info */}
              <div className="p-6 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                  Location
                </h3>
                <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl mb-4 overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center text-gray-600">
                    <div className="text-center">
                      <MapPin className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm">Interactive map</p>
                      <p className="text-xs text-gray-500">Would display here</p>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-800 font-medium mb-2">{property.exactLocation || property.location}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{property.neighborhood || `Conveniently located in ${property.location}`}</p>
              </div>

              {/* Host Info */}
              <div className="p-6 border-t border-gray-200 bg-gray-50">
                <div className="flex items-center mb-6">
                  <img src={property.host.avatar} alt={property.host.name} className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm" />
                  <div className="ml-4">
                    <p className="font-bold text-gray-900">Hosted by {property.host.name}</p>
                    <p className="text-sm text-gray-600">Host since {property.host.memberSince}</p>
                    {property.host.verified && (
                      <div className="flex items-center mt-1">
                        <Award className="w-4 h-4 text-green-500 mr-1" />
                        <span className="text-sm font-medium text-green-600">Verified Host</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white p-3 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 mb-1">Response rate</div>
                    <div className="font-bold text-gray-900">{property.host.responseRate}</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 mb-1">Response time</div>
                    <div className="font-bold text-gray-900">{property.host.responseTime}</div>
                  </div>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed bg-white p-4 rounded-lg border border-gray-200">{property.host.description}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      {/* Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center" onClick={() => setIsLightboxOpen(false)}>
            <button onClick={() => setIsLightboxOpen(false)} className="absolute top-6 right-6 text-white p-2 hover:bg-white/10 rounded-full transition-colors">
              <X className="w-8 h-8" />
            </button>
            <motion.img initial={{ scale: 0.9 }} animate={{ scale: 1 }} src={property.images[currentImageIndex]} alt={property.title} className="max-w-[90vw] max-h-[80vh] object-contain rounded-lg" onClick={(e) => e.stopPropagation()} />
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white p-4 hover:bg-white/10 rounded-full transition-colors"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white p-4 hover:bg-white/10 rounded-full transition-colors"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {property.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(idx);
                  }}
                  className={`w-3 h-3 rounded-full transition-all ${idx === currentImageIndex ? "bg-white scale-125" : "bg-white/40 hover:bg-white/60"}`}
                />
              ))}
            </div>

            <div className="absolute bottom-6 right-6 text-white/70 text-sm">
              {currentImageIndex + 1} / {property.images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
