"use client";

import Filters from "@/components/dashboard/Filters";
import ReviewTable from "@/components/dashboard/ReviewTable";
import StatsCards from "@/components/dashboard/StatsCards";
import { NormalizedReview } from "@/lib/mockData";
import { Download, Filter, Search } from "lucide-react";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [reviews, setReviews] = useState<NormalizedReview[]>([]);
  const [filteredReviews, setFilteredReviews] = useState<NormalizedReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    listingId: "",
    channel: "",
    minRating: 0,
    status: "",
    needsAttention: false,
    startDate: "",
    endDate: "",
    search: "",
  });

  // Fetch reviews on mount
  useEffect(() => {
    fetchReviews();
  }, []);

  // Apply filters when reviews or filters change
  useEffect(() => {
    applyFilters();
  }, [reviews, filters]);

  const fetchReviews = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/reviews/hostaway");
      const data = await response.json();
      setReviews(data.reviews || []);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...reviews];

    // Apply each filter
    if (filters.listingId) {
      filtered = filtered.filter((review) => review.listingId === filters.listingId);
    }

    if (filters.channel) {
      filtered = filtered.filter((review) => review.channel === filters.channel);
    }

    if (filters.minRating > 0) {
      filtered = filtered.filter((review) => review.overallRating >= filters.minRating);
    }

    if (filters.status) {
      filtered = filtered.filter((review) => review.status === filters.status);
    }

    if (filters.needsAttention) {
      filtered = filtered.filter((review) => review.needsAttention);
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter((review) => review.publicReview.toLowerCase().includes(searchLower) || review.guestName.toLowerCase().includes(searchLower) || review.listingName.toLowerCase().includes(searchLower));
    }

    // Date filtering
    if (filters.startDate) {
      filtered = filtered.filter((review) => new Date(review.submittedAt) >= new Date(filters.startDate));
    }

    if (filters.endDate) {
      filtered = filtered.filter((review) => new Date(review.submittedAt) <= new Date(filters.endDate));
    }

    setFilteredReviews(filtered);
  };

  const handleApproveToggle = async (reviewId: number, approved: boolean) => {
    // In a real app, this would update the backend
    setReviews((prev) => prev.map((review) => (review.id === reviewId ? { ...review, isApproved: approved, status: approved ? "published" : "unpublished" } : review)));
  };

  const handleExportCSV = () => {
    const headers = ["ID", "Listing", "Guest", "Rating", "Channel", "Status", "Date", "Review"];
    const csvContent = [
      headers.join(","),
      ...filteredReviews.map((review) => [review.id, `"${review.listingName}"`, `"${review.guestName}"`, review.overallRating, review.channel, review.status, review.submittedAt, `"${review.publicReview.replace(/"/g, '""')}"`].join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `reviews-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Reviews Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage and monitor guest reviews across all properties</p>
            </div>
            <div className="flex items-center space-x-4">
              <button onClick={handleExportCSV} className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Publish Selected</button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <StatsCards reviews={filteredReviews} />

        {/* Filters Section */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Filter className="w-5 h-5 text-gray-500 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
            </div>
            <button
              onClick={() =>
                setFilters({
                  listingId: "",
                  channel: "",
                  minRating: 0,
                  status: "",
                  needsAttention: false,
                  startDate: "",
                  endDate: "",
                  search: "",
                })
              }
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Clear all
            </button>
          </div>
          <Filters filters={filters} setFilters={setFilters} reviews={reviews} />
        </div>

        {/* Reviews Table */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">All Reviews</h2>
                <p className="text-sm text-gray-600">{filteredReviews.length} reviews found</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search reviews..."
                    value={filters.search}
                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <ReviewTable reviews={filteredReviews} onApproveToggle={handleApproveToggle} />
          )}
        </div>
      </main>
    </div>
  );
}
