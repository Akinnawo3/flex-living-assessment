import { Star, CheckCircle, XCircle, AlertCircle, Eye, EyeOff, MessageSquare } from "lucide-react";
import { NormalizedReview } from "@/lib/mockData";

interface ReviewTableProps {
  reviews: NormalizedReview[];
  onApproveToggle: (reviewId: number, approved: boolean) => void;
}

export default function ReviewTable({ reviews, onApproveToggle }: ReviewTableProps) {
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
            <tr key={review.id} className={`hover:bg-gray-50 ${review.needsAttention ? "bg-red-50" : ""}`}>
              {/* Property & Guest */}
              <td className="px-6 py-4">
                <div>
                  <p className="text-sm font-medium text-gray-900">{review.listingName}</p>
                  <p className="text-sm text-gray-600">Guest: {review.guestName}</p>
                  <div className="flex items-center mt-1">
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
                  <span className="text-lg font-bold">{review.overallRating.toFixed(1)}</span>
                  <span className="text-gray-500 text-sm ml-1">/10</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {review.categories.map((cat) => (
                    <div key={cat.category} className="truncate">
                      {cat.category}: {cat.rating}/10
                    </div>
                  ))}
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
                  {review.isApproved && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      <Eye className="w-3 h-3 mr-1" />
                      Public
                    </span>
                  )}
                </div>
              </td>

              {/* Actions */}
              <td className="px-6 py-4 text-sm font-medium">
                <div className="flex space-x-2">
                  <button onClick={() => onApproveToggle(review.id, !review.isApproved)} className={`px-3 py-1 rounded-lg text-sm ${review.isApproved ? "bg-gray-100 text-gray-700 hover:bg-gray-200" : "bg-blue-100 text-blue-700 hover:bg-blue-200"}`}>
                    {review.isApproved ? (
                      <>
                        <EyeOff className="w-4 h-4 inline mr-1" />
                        Hide
                      </>
                    ) : (
                      <>
                        <Eye className="w-4 h-4 inline mr-1" />
                        Publish
                      </>
                    )}
                  </button>
                  <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm">Reply</button>
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
        </div>
      )}
    </div>
  );
}
