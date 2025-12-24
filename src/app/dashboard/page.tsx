"use client";

import Filters from "@/components/dashboard/Filters";
import ReviewTable from "@/components/dashboard/ReviewTable";
import StatsCards from "@/components/dashboard/StatsCards";
import { NormalizedReview } from "@/lib/mockData";
import { motion } from "framer-motion";
import { Download, Filter, RefreshCw, Search } from "lucide-react";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [reviews, setReviews] = useState<NormalizedReview[]>([]);
  const [filteredReviews, setFilteredReviews] = useState<NormalizedReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
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

  const fetchReviews = async (showLoading = true) => {
    try {
      if (showLoading) {
        setIsLoading(true);
      } else {
        setIsRefreshing(true);
      }

      console.log("Fetching reviews from API...");
      const response = await fetch("/api/reviews/hostaway");
      const data = await response.json();

      if (data.status === "success") {
        console.log("Fetched", data.reviews?.length || 0, "reviews");
        setReviews(data.reviews || []);
      } else {
        throw new Error(data.message || "Failed to fetch reviews");
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
      alert("Failed to fetch reviews. Please try again.");
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
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
    console.log("Toggling review approval:", { reviewId, approved });

    try {
      // Optimistically update the UI immediately
      setReviews((prev) =>
        prev.map((review) =>
          review.id === reviewId
            ? {
                ...review,
                isApproved: approved,
                status: approved ? "published" : "unpublished",
              }
            : review
        )
      );

      // Call API to update on server
      const response = await fetch("/api/reviews/hostaway", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reviewId, approved }),
      });

      const data = await response.json();

      if (data.status !== "success") {
        // If API fails, revert the optimistic update
        setReviews((prev) =>
          prev.map((review) =>
            review.id === reviewId
              ? {
                  ...review,
                  isApproved: !approved,
                  status: !approved ? "published" : "unpublished",
                }
              : review
          )
        );
        throw new Error(data.message || "Failed to update review");
      }

      console.log("Review updated successfully:", data.message);

      // Refresh the reviews to ensure sync with server
      setTimeout(() => {
        fetchReviews(false);
      }, 100);
    } catch (error) {
      console.error("Error updating review:", error);
      alert(`Failed to update review status`);
    }
  };

  const handleExportCSV = () => {
    const headers = ["ID", "Listing", "Guest", "Rating", "Channel", "Status", "Date", "Review"];
    const csvContent = [
      headers.join(","),
      ...filteredReviews.map((review) =>
        [review.id, `"${review.listingName.replace(/"/g, '""')}"`, `"${review.guestName.replace(/"/g, '""')}"`, review.overallRating, review.channel, review.status, review.submittedAt, `"${review.publicReview.replace(/"/g, '""')}"`].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `reviews-${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePublishSelected = () => {
    const selectedRows = document.querySelectorAll('input[type="checkbox"]:checked');
    if (selectedRows.length === 0) {
      alert("Please select reviews to publish");
      return;
    }

    if (confirm(`Publish ${selectedRows.length} selected reviews?`)) {
      alert(`${selectedRows.length} reviews published successfully!`);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          {/* Title and button in separate rows on mobile */}
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:items-center sm:space-y-0">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Reviews Dashboard</h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1">Manage and monitor guest reviews across all properties</p>
            </div>

            <div className="flex-shrink-0">
              <button onClick={handleExportCSV} className="w-full sm:w-auto flex items-center justify-center px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <StatsCards reviews={filteredReviews} />

        {/* Filters Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }} className="bg-white rounded-xl shadow p-6 mb-8">
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
              className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
            >
              Clear all
            </button>
          </div>
          <Filters filters={filters} setFilters={setFilters} reviews={reviews} />
        </motion.div>

        {/* Reviews Table */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.2 }} className="bg-white rounded-xl shadow overflow-hidden">
          <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
            {/* Stack on mobile, row on larger screens */}
            <div className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:items-center sm:space-y-0">
              {/* Title and stats section */}
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-900">All Reviews</h2>
                <div className="mt-1">
                  {/* Stats - stacked on mobile, inline on larger screens */}
                  <div className="flex flex-wrap items-center gap-1 sm:gap-0">
                    <span className="text-sm text-gray-600">{filteredReviews.length} reviews found</span>
                    <span className=" sm:inline mx-2 text-gray-400">•</span>
                    <span className="text-sm text-green-600 font-medium">{filteredReviews.filter((r) => r.isApproved).length} published</span>
                    <span className=" sm:inline mx-2 text-gray-400">•</span>
                    <span className="text-sm text-gray-600">{filteredReviews.filter((r) => !r.isApproved).length} hidden</span>
                  </div>

                  {/* Mobile-only stats layout */}
                  {/* <div className="sm:hidden flex items-center space-x-3 mt-1">
                    <span className="text-sm text-green-600 font-medium">{filteredReviews.filter((r) => r.isApproved).length} published</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-sm text-gray-600">{filteredReviews.filter((r) => !r.isApproved).length} hidden</span>
                  </div> */}
                </div>
              </div>

              {/* Search input - full width on mobile */}
              <div className="w-full sm:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search reviews..."
                    value={filters.search}
                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                    className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
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
        </motion.div>
      </main>
    </motion.div>
  );
}
