import { NextRequest, NextResponse } from "next/server";
import { mockReviews, normalizeReviews } from "@/lib/mockData";

// This is the required API endpoint
export async function GET(request: NextRequest) {
  try {
    // In a real scenario, we would:
    // 1. Fetch from Hostaway API with provided credentials
    // 2. Parse and normalize the data
    // 3. Return structured data

    // For now, we'll use mock data
    const searchParams = request.nextUrl.searchParams;
    const listingId = searchParams.get("listingId");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    // Normalize the mock data
    const normalizedReviews = normalizeReviews(mockReviews);

    // Apply filters if provided
    let filteredReviews = normalizedReviews;

    if (listingId) {
      filteredReviews = filteredReviews.filter((review) => review.listingId === listingId);
    }

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
