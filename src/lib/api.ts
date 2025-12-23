
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export interface FetchReviewsParams {
  listingId?: string;
  startDate?: string;
  endDate?: string;
  channel?: string;
  minRating?: number;
}

export async function fetchReviews(params: FetchReviewsParams = {}) {
  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      queryParams.append(key, value.toString());
    }
  });

  const response = await fetch(`${API_BASE_URL}/api/reviews/hostaway?${queryParams}`);

  if (!response.ok) {
    throw new Error("Failed to fetch reviews");
  }

  return response.json();
}
