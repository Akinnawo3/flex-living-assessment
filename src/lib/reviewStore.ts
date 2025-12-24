import { NormalizedReview } from "./mockData";

// Simple server-side in-memory store that persists with server
// This will persist as long as the server doesn't restart
let approvedReviews: Record<number, boolean> = {};

// Initialize with mock data
export function initializeApprovedReviews(reviews: NormalizedReview[]) {
  reviews.forEach((review) => {
    if (approvedReviews[review.id] === undefined) {
      approvedReviews[review.id] = review.isApproved;
    }
  });
  return approvedReviews;
}

// Get approval status
export function isReviewApproved(reviewId: number): boolean {
  return approvedReviews[reviewId] || false;
}

// Set approval status - This is the key function that updates server state
export function setReviewApproval(reviewId: number, approved: boolean): boolean {
  console.log(`Setting review ${reviewId} approval to: ${approved}`);
  approvedReviews[reviewId] = approved;
  return true; // Return success
}

// Get all approved reviews
export function getApprovedReviews(allReviews: NormalizedReview[]): NormalizedReview[] {
  return allReviews.filter((review) => approvedReviews[review.id]);
}

// Get all reviews with approval status
export function getAllReviewsWithApproval(allReviews: NormalizedReview[]): NormalizedReview[] {
  return allReviews.map((review) => ({
    ...review,
    isApproved: approvedReviews[review.id] || false,
    status: approvedReviews[review.id] ? "published" : "unpublished",
  }));
}

// For debugging
export function getApprovedReviewsStore() {
  return approvedReviews;
}
