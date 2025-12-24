const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export interface FetchReviewsParams {
  listingId?: string;
  startDate?: string;
  endDate?: string;
  channel?: string;
  minRating?: number;
  status?: string;
  needsAttention?: boolean;
  search?: string;
}

export async function fetchReviews(params: FetchReviewsParams = {}) {
  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      queryParams.append(key, value.toString());
    }
  });

  try {
    const response = await fetch(`${API_BASE_URL}/api/reviews/hostaway?${queryParams}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch reviews: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
}

// Function to update review status (approve/unapprove)
export async function updateReviewStatus(reviewId: number, approved: boolean) {
  try {
    // In a real implementation, this would call the backend API
    // For now, we'll simulate a successful response
    return { success: true, message: `Review ${reviewId} ${approved ? "approved" : "unapproved"}` };
  } catch (error) {
    console.error("Error updating review status:", error);
    throw error;
  }
}
