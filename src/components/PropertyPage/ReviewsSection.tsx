"use client";

import { useState } from "react";
import { Star, MessageSquare, ChevronDown, ChevronUp, Calendar, User } from "lucide-react";
import { NormalizedReview } from "@/lib/mockData";

interface ReviewsSectionProps {
  reviews: NormalizedReview[];
  propertyId: string;
  propertyName: string;
}

export default function ReviewsSection({ reviews, propertyId, propertyName }: ReviewsSectionProps) {
  const [expandedReview, setExpandedReview] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<"date" | "rating">("date");
  const [filterRating, setFilterRating] = useState<number>(0);

  // Calculate average rating
  const averageRating = reviews.length > 0 ? reviews.reduce((sum, review) => sum + review.overallRating, 0) / reviews.length : 0;

  // Filter and sort reviews
  const filteredReviews = reviews
    .filter((review) => filterRating === 0 || review.overallRating >= filterRating)
    .sort((a, b) => {
      if (sortBy === "date") {
        return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime();
      } else {
        return b.overallRating - a.overallRating;
      }
    });

  // Group reviews by sentiment for the summary
  const positiveReviews = reviews.filter((r) => r.sentiment === "positive").length;
  const negativeReviews = reviews.filter((r) => r.sentiment === "negative").length;

  return (
    <div className="mt-8 border-t border-gray-200 pt-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Guest Reviews</h2>
          <div className="flex items-center mt-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-5 h-5 ${i < Math.floor(averageRating / 2) ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
              ))}
              <span className="ml-2 text-lg font-semibold">{averageRating.toFixed(1)}</span>
              <span className="ml-2 text-gray-600">({reviews.length} reviews)</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mt-4 md:mt-0">
          {/* Sort dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sort by</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value as "date" | "rating")} className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
              <option value="date">Most recent</option>
              <option value="rating">Highest rating</option>
            </select>
          </div>

          {/* Rating filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Filter by rating</label>
            <select value={filterRating} onChange={(e) => setFilterRating(Number(e.target.value))} className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
              <option value="0">All ratings</option>
              <option value="9">9+ Excellent</option>
              <option value="8">8+ Very good</option>
              <option value="7">7+ Good</option>
              <option value="6">6+ Okay</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reviews Summary */}
      {reviews.length > 0 && (
        <div className="bg-blue-50 rounded-xl p-6 mb-8">
          <div className="flex items-center mb-4">
            <MessageSquare className="w-6 h-6 text-blue-600 mr-2" />
            <h3 className="text-lg font-semibold text-blue-900">What guests are saying</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-green-600">{positiveReviews}</div>
              <div className="text-sm text-gray-600 mt-1">Positive reviews</div>
            </div>

            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-red-600">{negativeReviews}</div>
              <div className="text-sm text-gray-600 mt-1">Needs improvement</div>
            </div>

            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-blue-600">{reviews.length > 0 ? Math.round((positiveReviews / reviews.length) * 100) : 0}%</div>
              <div className="text-sm text-gray-600 mt-1">Would recommend</div>
            </div>
          </div>
        </div>
      )}

      {/* Reviews List */}
      {filteredReviews.length > 0 ? (
        <div className="space-y-6">
          {filteredReviews.map((review) => (
            <div key={review.id} className="border border-gray-200 rounded-xl p-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center mb-2">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                      <User className="w-5 h-5 text-gray-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{review.guestName}</p>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(review.submittedAt).toLocaleDateString("en-US", {
                          month: "long",
                          year: "numeric",
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < Math.floor(review.overallRating / 2) ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
                    ))}
                    <span className="ml-2 font-semibold">{review.overallRating.toFixed(1)}</span>
                  </div>
                </div>

                <span className={`px-3 py-1 rounded-full text-xs font-medium ${review.sentiment === "positive" ? "bg-green-100 text-green-800" : review.sentiment === "negative" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"}`}>
                  {review.sentiment.charAt(0).toUpperCase() + review.sentiment.slice(1)}
                </span>
              </div>

              <p className="text-gray-700 mt-3">{expandedReview === review.id ? review.publicReview : `${review.publicReview.substring(0, 200)}${review.publicReview.length > 200 ? "..." : ""}`}</p>

              {review.publicReview.length > 200 && (
                <button onClick={() => setExpandedReview(expandedReview === review.id ? null : review.id)} className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-2 flex items-center">
                  {expandedReview === review.id ? (
                    <>
                      <ChevronUp className="w-4 h-4 mr-1" />
                      Show less
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4 mr-1" />
                      Read more
                    </>
                  )}
                </button>
              )}

              {/* Category Ratings */}
              {review.categories.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-sm font-medium text-gray-700 mb-2">Detailed ratings:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {review.categories.map((category) => (
                      <div key={category.category} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 capitalize">{category.category.replace("_", " ")}</span>
                        <div className="flex items-center">
                          <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                            <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${category.rating * 10}%` }} />
                          </div>
                          <span className="text-sm font-medium w-8">{category.rating}/10</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">{filterRating > 0 ? `No reviews with rating ${filterRating}+` : "No approved reviews yet for this property"}</p>
          <p className="text-gray-500 text-sm mt-2">Reviews need to be approved in the dashboard before they appear here.</p>
        </div>
      )}

      {/* Back to Dashboard Link */}
      <div className="mt-8 pt-8 border-t border-gray-200">
        <a href="/dashboard" className="inline-flex items-center text-blue-600 hover:text-blue-800">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Manage reviews in Dashboard
        </a>
      </div>
    </div>
  );
}
