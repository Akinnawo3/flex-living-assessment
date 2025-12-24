"use client";

import { Star, CheckCircle, XCircle, AlertCircle, Eye, EyeOff, MessageSquare, ExternalLink } from "lucide-react";
import { NormalizedReview } from "@/lib/mockData";
import Link from "next/link";
import { slugify } from "@/lib/mockData";
import { useState } from "react";

interface ReviewTableProps {
  reviews: NormalizedReview[];
  onApproveToggle: (reviewId: number, approved: boolean) => Promise<void>;
}

export default function ReviewTable({ reviews, onApproveToggle }: ReviewTableProps) {
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const getChannelColor = (channel: string) => {
    const colors: Record<string, string> = {
      airbnb: "bg-pink-100 text-pink-800",
      vrbo: "bg-blue-100 text-blue-800",
      "booking.com": "bg-green-100 text-green-800",
      direct: "bg-gray-100 text-gray-800",
    };
    return colors[channel] || "bg-gray-100 text-gray-800";
  };

  const getSentimentColor = (sentiment: string) => {
    const colors: Record<string, string> = {
      positive: "bg-green-100 text-green-800",
      neutral: "bg-yellow-100 text-yellow-800",
      negative: "bg-red-100 text-red-800",
    };
    return colors[sentiment];
  };

  const handleToggle = async (reviewId: number, currentApproved: boolean) => {
    setUpdatingId(reviewId);
    try {
      console.log("Toggle button clicked:", { reviewId, newApproved: !currentApproved });
      await onApproveToggle(reviewId, !currentApproved);
    } catch (error) {
      console.error("Toggle failed:", error);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property & Guest</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Channel & Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Review Preview</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {reviews.map((review) => (
            <tr key={review.id} className={`hover:bg-gray-50 transition-colors ${review.needsAttention ? "bg-red-50" : ""}`}>
              {/* Property & Guest */}
              <td className="px-6 py-4">
                <div>
                  <div className="flex items-center">
                    <Link href={`/properties/${slugify(review.listingId)}`} className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline flex items-center" target="_blank">
                      {review.listingName}
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </Link>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Guest: {review.guestName}</p>
                  <div className="flex items-center mt-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${getChannelColor(review.channel)}`}>{review.channel}</span>
                    <span className={`ml-2 px-2 py-1 text-xs rounded-full ${getSentimentColor(review.sentiment)}`}>{review.sentiment}</span>
                    {review.needsAttention && <AlertCircle className="ml-2 w-4 h-4 text-red-500" />}
                  </div>
                </div>
              </td>

              {/* Rating */}
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                  <span className="text-lg font-bold text-gray-600">{review.overallRating.toFixed(1)}</span>
                  <span className="text-gray-500 text-sm ml-1">/10</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {review.categories.slice(0, 2).map((cat) => (
                    <div key={cat.category} className="truncate">
                      {cat.category}: {cat.rating}/10
                    </div>
                  ))}
                  {review.categories.length > 2 && <div className="text-blue-600">+{review.categories.length - 2} more</div>}
                </div>
              </td>

              {/* Channel & Date */}
              <td className="px-6 py-4">
                <div className="text-sm">
                  <div className="font-medium text-gray-900">{review.channel}</div>
                  <div className="text-gray-500">{new Date(review.submittedAt).toLocaleDateString()}</div>
                  <div className="text-xs text-gray-400 mt-1">{review.type.replace("-", " ")}</div>
                </div>
              </td>

              {/* Review Preview */}
              <td className="px-6 py-4">
                <div className="flex">
                  <MessageSquare className="w-4 h-4 text-gray-400 mr-2 mt-1 flex-shrink-0" />
                  <p className="text-sm text-gray-700 line-clamp-3">"{review.publicReview}"</p>
                </div>
              </td>

              {/* Status */}
              <td className="px-6 py-4">
                <div className="flex flex-col space-y-2">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      review.status === "published" ? "bg-green-100 text-green-800" : review.status === "pending" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {review.status === "published" && <CheckCircle className="w-3 h-3 mr-1" />}
                    {review.status === "pending" && <AlertCircle className="w-3 h-3 mr-1" />}
                    {review.status === "unpublished" && <XCircle className="w-3 h-3 mr-1" />}
                    {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
                  </span>
                  {review.isApproved ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      <Eye className="w-3 h-3 mr-1" />
                      Public
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      <EyeOff className="w-3 h-3 mr-1" />
                      Hidden
                    </span>
                  )}
                </div>
              </td>

              {/* Actions */}
              <td className="px-6 py-4">
                <div className="flex flex-col space-y-3">
                  {/* Status Card */}
                  <div
                    className={`
      rounded-lg p-3 border transition-all duration-200
      ${review.isApproved ? "bg-green-50 border-green-200 hover:bg-green-100" : "bg-yellow-50 border-yellow-200 hover:bg-yellow-100"}
    `}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div
                          className={`
            p-2 rounded-md mr-3
            ${review.isApproved ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}
          `}
                        >
                          {review.isApproved ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{review.isApproved ? "Published" : "Hidden"}</div>
                          <div className={`text-xs ${review.isApproved ? "text-green-700" : "text-yellow-700"}`}>{review.isApproved ? "Visible on website" : "Not visible on website"}</div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleToggle(review.id, review.isApproved)}
                        disabled={updatingId === review.id}
                        className={`
            px-3 py-1.5 rounded-md text-xs font-medium transition-colors
            ${updatingId === review.id ? "opacity-50 cursor-not-allowed" : ""}
            ${review.isApproved ? "bg-gray-200 text-gray-800 hover:bg-gray-300" : "bg-blue-600 text-white hover:bg-blue-700"}
          `}
                      >
                        {updatingId === review.id ? (
                          <span className="flex items-center">
                            <svg className="animate-spin h-3 w-3 mr-1" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Updating
                          </span>
                        ) : review.isApproved ? (
                          "Hide"
                        ) : (
                          "Publish"
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href={`/properties/${slugify(review.listingId)}`}
                      className="
          flex items-center justify-center px-3 py-2 
          bg-gray-100 text-gray-700 rounded-lg 
          hover:bg-gray-200 hover:text-gray-900 
          transition-colors text-sm font-medium
          border border-gray-300
        "
                      target="_blank"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      View
                    </Link>
                    <button
                      onClick={() => {
                        // Add reply functionality
                        alert(`Reply to review from ${review.guestName}`);
                      }}
                      className="
          flex items-center justify-center px-3 py-2 
          bg-blue-50 text-blue-700 rounded-lg 
          hover:bg-blue-100 hover:text-blue-800 
          transition-colors text-sm font-medium
          border border-blue-200
        "
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                      </svg>
                      Reply
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {reviews.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No reviews found matching your filters</p>
          <p className="text-gray-400 text-sm mt-2">Try adjusting your filters or refresh the page</p>
        </div>
      )}
    </div>
  );
}
