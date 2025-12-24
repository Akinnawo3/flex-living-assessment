import { NormalizedReview } from "@/lib/mockData";
import { Building, Calendar, Globe, Star, X } from "lucide-react";

interface FiltersProps {
  filters: {
    listingId: string;
    channel: string;
    minRating: number;
    status: string;
    needsAttention: boolean;
    startDate: string;
    endDate: string;
    search: string;
  };
  setFilters: (filters: any) => void;
  reviews: NormalizedReview[];
}

export default function Filters({ filters, setFilters, reviews }: FiltersProps) {
  // Get unique values for filters
  const uniqueListings = Array.from(new Set(reviews.map((r) => r.listingName))).map((name) => ({
    id: reviews.find((r) => r.listingName === name)?.listingId || "",
    name,
    count: reviews.filter((r) => r.listingName === name).length,
  }));

  const uniqueChannels = Array.from(new Set(reviews.map((r) => r.channel)));

  const resetFilters = () => {
    setFilters({
      listingId: "",
      channel: "",
      minRating: 0,
      status: "",
      needsAttention: false,
      startDate: "",
      endDate: "",
      search: "",
    });
  };

  const activeFilterCount = [filters.listingId, filters.channel, filters.minRating > 0, filters.status, filters.needsAttention, filters.startDate, filters.endDate].filter(Boolean).length;

  return (
    <div className="space-y-4">
      {/* Active Filter Chips - Simple version */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2 pb-2">
          {filters.listingId && (
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-sm">
              Property: {uniqueListings.find((l) => l.id === filters.listingId)?.name}
              <button onClick={() => setFilters({ ...filters, listingId: "" })} className="ml-2 hover:text-blue-900">
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
          {filters.channel && (
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-green-50 text-green-700 text-sm">
              Channel: {filters.channel}
              <button onClick={() => setFilters({ ...filters, channel: "" })} className="ml-2 hover:text-green-900">
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
          {filters.minRating > 0 && (
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-yellow-50 text-yellow-700 text-sm">
              Rating: {filters.minRating}+
              <button onClick={() => setFilters({ ...filters, minRating: 0 })} className="ml-2 hover:text-yellow-900">
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
          {filters.status && (
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-purple-50 text-purple-700 text-sm">
              Status: {filters.status}
              <button onClick={() => setFilters({ ...filters, status: "" })} className="ml-2 hover:text-purple-900">
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
          {filters.needsAttention && (
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-red-50 text-red-700 text-sm">
              Needs Attention
              <button onClick={() => setFilters({ ...filters, needsAttention: false })} className="ml-2 hover:text-red-900">
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Main Filters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Property Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Property</label>
          <div className="relative">
            <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={filters.listingId}
              onChange={(e) => setFilters({ ...filters, listingId: e.target.value })}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white font-medium text-gray-900"
            >
              <option value="" className="text-gray-500">
                All Properties
              </option>
              {uniqueListings.map((listing) => (
                <option key={listing.id} value={listing.id} className="font-medium">
                  {listing.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Channel Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Channel</label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={filters.channel}
              onChange={(e) => setFilters({ ...filters, channel: e.target.value })}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white font-medium text-gray-900"
            >
              <option value="" className="text-gray-500">
                All Channels
              </option>
              {uniqueChannels.map((channel) => (
                <option key={channel} value={channel} className="font-medium">
                  {channel.charAt(0).toUpperCase() + channel.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Rating Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Minimum Rating</label>
          <div className="relative">
            <Star className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={filters.minRating}
              onChange={(e) => setFilters({ ...filters, minRating: Number(e.target.value) })}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white font-medium text-gray-900"
            >
              <option value="0" className="text-gray-500">
                Any Rating
              </option>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((rating) => (
                <option key={rating} value={rating} className="font-medium">
                  {rating}+
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Status</label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white font-medium text-gray-900"
            >
              <option value="" className="text-gray-500">
                All Status
              </option>
              <option value="published" className="font-medium">
                Published
              </option>
              <option value="pending" className="font-medium">
                Pending
              </option>
              <option value="unpublished" className="font-medium">
                Unpublished
              </option>
            </select>
          </div>
        </div>

        {/* Date Range Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">From Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="date"
                value={filters.startDate}
                onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium text-gray-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">To Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="date"
                value={filters.endDate}
                onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium text-gray-900"
              />
            </div>
          </div>
        </div>

        {/* Needs Attention Filter */}
        <div className="flex items-end">
          <div className="w-full">
            <div className="h-6"></div> {/* Spacer for alignment */}
            <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input type="checkbox" checked={filters.needsAttention} onChange={(e) => setFilters({ ...filters, needsAttention: e.target.checked })} className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
              <span className="ml-3 text-sm font-medium text-gray-700">Needs Attention</span>
            </label>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-2 pt-2">
        <button
          onClick={() =>
            setFilters({
              ...filters,
              minRating: 8,
              status: "published",
              needsAttention: false,
            })
          }
          className="px-4 py-2 text-sm bg-green-50 text-green-700 rounded-lg hover:bg-green-100 font-medium"
        >
          Show Best Reviews (8+)
        </button>
        <button
          onClick={() =>
            setFilters({
              ...filters,
              status: "pending",
              needsAttention: false,
            })
          }
          className="px-4 py-2 text-sm bg-yellow-50 text-yellow-700 rounded-lg hover:bg-yellow-100 font-medium"
        >
          Show Pending Reviews
        </button>
        <button
          onClick={() =>
            setFilters({
              ...filters,
              needsAttention: true,
            })
          }
          className="px-4 py-2 text-sm bg-red-50 text-red-700 rounded-lg hover:bg-red-100 font-medium"
        >
          Show Needs Attention
        </button>
      </div>
    </div>
  );
}
