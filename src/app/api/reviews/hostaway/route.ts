import { NextRequest, NextResponse } from "next/server";
import { mockReviews, normalizeReviews, slugify } from "@/lib/mockData";
import { initializeApprovedReviews, getApprovedReviews, getAllReviewsWithApproval, setReviewApproval } from "@/lib/reviewStore";

// Initialize once when the module loads
const normalizedReviews = normalizeReviews(mockReviews);
const approvals = initializeApprovedReviews(normalizedReviews);

console.log("Review API initialized with", Object.keys(approvals).length, "approval records");

// GET endpoint - Fetch reviews with filters
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const listingId = searchParams.get("listingId");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const onlyApproved = searchParams.get("onlyApproved") === "true";

    // Get reviews based on approval filter
    let filteredReviews = onlyApproved ? getApprovedReviews(normalizedReviews) : getAllReviewsWithApproval(normalizedReviews);

    // Apply listing filter
    if (listingId) {
      filteredReviews = filteredReviews.filter((review) => slugify(review.listingId) === listingId);
    }

    // Apply date filters
    if (startDate && endDate) {
      filteredReviews = filteredReviews.filter((review) => {
        const reviewDate = new Date(review.submittedAt);
        return reviewDate >= new Date(startDate) && reviewDate <= new Date(endDate);
      });
    }

    return NextResponse.json({
      status: "success",
      count: filteredReviews.length,
      reviews: filteredReviews,
      metadata: {
        totalListings: Array.from(new Set(filteredReviews.map((r) => r.listingName))).length,
        approvalsCount: Object.keys(approvals).length,
        dateRange: {
          oldest: filteredReviews.reduce((min, r) => (new Date(r.submittedAt) < new Date(min) ? r.submittedAt : min), filteredReviews[0]?.submittedAt || new Date().toISOString()),
          newest: filteredReviews.reduce((max, r) => (new Date(r.submittedAt) > new Date(max) ? r.submittedAt : max), filteredReviews[0]?.submittedAt || new Date().toISOString()),
        },
      },
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json({ status: "error", message: "Failed to fetch reviews" }, { status: 500 });
  }
}

// PUT endpoint - Update review approval status
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { reviewId, approved } = body;

    console.log("API: Updating review approval:", { reviewId, approved });

    // Validate input
    if (typeof reviewId !== "number" || typeof approved !== "boolean") {
      return NextResponse.json({ status: "error", message: "Invalid request body" }, { status: 400 });
    }

    // Update approval status in server store
    const success = setReviewApproval(reviewId, approved);

    if (!success) {
      return NextResponse.json({ status: "error", message: "Failed to update review" }, { status: 500 });
    }

    // Return success response
    return NextResponse.json({
      status: "success",
      message: `Review ${reviewId} ${approved ? "approved" : "unapproved"}`,
      reviewId,
      approved,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error updating review:", error);
    return NextResponse.json({ status: "error", message: "Failed to update review" }, { status: 500 });
  }
}
