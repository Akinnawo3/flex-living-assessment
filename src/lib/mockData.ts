export interface ReviewCategory {
  category: string;
  rating: number;
}

export interface RawReview {
  id: number;
  type: string;
  status: string;
  rating: number | null;
  publicReview: string;
  reviewCategory: ReviewCategory[];
  submittedAt: string;
  guestName: string;
  listingName: string;
  channel?: "airbnb" | "vrbo" | "booking.com" | "direct";
}

export interface NormalizedReview {
  id: number;
  type: "guest-to-host" | "host-to-guest";
  status: "published" | "unpublished" | "pending";
  overallRating: number;
  publicReview: string;
  categories: ReviewCategory[];
  submittedAt: string;
  guestName: string;
  listingId: string;
  listingName: string;
  channel: "airbnb" | "vrbo" | "booking.com" | "direct";
  isApproved: boolean;
  needsAttention: boolean;
  sentiment: "positive" | "neutral" | "negative";
}

// Type guard functions
function isValidChannel(channel?: string): channel is NormalizedReview["channel"] {
  return ["airbnb", "vrbo", "booking.com", "direct"].includes(channel || "");
}

function isValidType(type: string): type is NormalizedReview["type"] {
  return type === "guest-to-host" || type === "host-to-guest";
}

function isValidStatus(status: string): status is NormalizedReview["status"] {
  return status === "published" || status === "unpublished" || status === "pending";
}

// Comprehensive mock data
export const mockReviews: RawReview[] = [
  {
    id: 7453,
    type: "host-to-guest",
    status: "published",
    rating: null,
    publicReview: "Shane and family are wonderful! Would definitely host again :)",
    reviewCategory: [
      { category: "cleanliness", rating: 10 },
      { category: "communication", rating: 10 },
      { category: "respect_house_rules", rating: 10 },
    ],
    submittedAt: "2020-08-21 22:45:14",
    guestName: "Shane Finkelstein",
    listingName: "2B N1 A - 29 Shoreditch Heights",
    channel: "airbnb",
  },
  {
    id: 7454,
    type: "guest-to-host",
    status: "published",
    rating: 4.5,
    publicReview: "Great location but the bathroom could have been cleaner.",
    reviewCategory: [
      { category: "cleanliness", rating: 6 },
      { category: "location", rating: 9 },
      { category: "value", rating: 8 },
      { category: "checkin", rating: 10 },
    ],
    submittedAt: "2021-03-15 14:30:00",
    guestName: "Maria Rodriguez",
    listingName: "2B N1 A - 29 Shoreditch Heights",
    channel: "vrbo",
  },
  {
    id: 7455,
    type: "guest-to-host",
    status: "unpublished",
    rating: 2.0,
    publicReview: "Had issues with heating not working properly during our stay. The host was slow to respond.",
    reviewCategory: [
      { category: "amenities", rating: 3 },
      { category: "communication", rating: 4 },
      { category: "cleanliness", rating: 7 },
      { category: "accuracy", rating: 5 },
    ],
    submittedAt: "2021-12-05 09:15:00",
    guestName: "James Wilson",
    listingName: "Studio 3C - Downtown Loft",
    channel: "booking.com",
  },
  {
    id: 7456,
    type: "guest-to-host",
    status: "pending",
    rating: 9.0,
    publicReview: "Absolutely perfect stay! Will definitely return. The view was breathtaking.",
    reviewCategory: [
      { category: "cleanliness", rating: 10 },
      { category: "communication", rating: 9 },
      { category: "location", rating: 10 },
      { category: "value", rating: 8 },
    ],
    submittedAt: "2022-05-20 16:45:00",
    guestName: "Sarah Chen",
    listingName: "3B N2 B - Lakeside Villa",
    channel: "airbnb",
  },
  {
    id: 7457,
    type: "host-to-guest",
    status: "published",
    rating: null,
    publicReview: "Excellent guests, left the place spotless! Highly recommend.",
    reviewCategory: [
      { category: "cleanliness", rating: 10 },
      { category: "respect_house_rules", rating: 10 },
      { category: "communication", rating: 9 },
    ],
    submittedAt: "2022-08-10 11:20:00",
    guestName: "Robert Kim",
    listingName: "Studio 3C - Downtown Loft",
    channel: "direct",
  },
  {
    id: 7458,
    type: "guest-to-host",
    status: "published",
    rating: 8.5,
    publicReview: "Comfortable stay with great amenities. Minor issue with WiFi speed.",
    reviewCategory: [
      { category: "cleanliness", rating: 9 },
      { category: "amenities", rating: 7 },
      { category: "location", rating: 9 },
      { category: "value", rating: 9 },
    ],
    submittedAt: "2023-01-12 18:30:00",
    guestName: "David Miller",
    listingName: "2B N1 A - 29 Shoreditch Heights",
    channel: "airbnb",
  },
  {
    id: 7459,
    type: "guest-to-host",
    status: "published",
    rating: 10.0,
    publicReview: "Best Airbnb experience ever! The host went above and beyond.",
    reviewCategory: [
      { category: "cleanliness", rating: 10 },
      { category: "communication", rating: 10 },
      { category: "location", rating: 10 },
      { category: "value", rating: 10 },
    ],
    submittedAt: "2023-04-22 10:15:00",
    guestName: "Lisa Thompson",
    listingName: "3B N2 B - Lakeside Villa",
    channel: "airbnb",
  },
  {
    id: 7460,
    type: "guest-to-host",
    status: "unpublished",
    rating: 3.0,
    publicReview: "The apartment didn't match the photos. Furniture was worn out.",
    reviewCategory: [
      { category: "accuracy", rating: 2 },
      { category: "cleanliness", rating: 5 },
      { category: "amenities", rating: 4 },
    ],
    submittedAt: "2023-07-30 13:45:00",
    guestName: "Michael Brown",
    listingName: "Penthouse A - Skyline View",
    channel: "vrbo",
  },
  {
    id: 7461,
    type: "host-to-guest",
    status: "published",
    rating: null,
    publicReview: "Polite and respectful guests. Welcome back anytime!",
    reviewCategory: [
      { category: "cleanliness", rating: 9 },
      { category: "respect_house_rules", rating: 10 },
      { category: "communication", rating: 8 },
    ],
    submittedAt: "2023-09-05 15:20:00",
    guestName: "Emily Davis",
    listingName: "Penthouse A - Skyline View",
    channel: "booking.com",
  },
  {
    id: 7462,
    type: "guest-to-host",
    status: "pending",
    rating: 7.5,
    publicReview: "Good value for money. The kitchen was well-equipped.",
    reviewCategory: [
      { category: "cleanliness", rating: 8 },
      { category: "amenities", rating: 9 },
      { category: "value", rating: 10 },
      { category: "location", rating: 6 },
    ],
    submittedAt: "2023-11-18 12:00:00",
    guestName: "Thomas Wilson",
    listingName: "Studio 3C - Downtown Loft",
    channel: "direct",
  },
];

// Normalize the raw API data
export function normalizeReviews(rawReviews: RawReview[]): NormalizedReview[] {
  return rawReviews.map((review) => {
    // Calculate overall rating
    const categoryRatings = review.reviewCategory.map((cat) => cat.rating);
    const overallRating = categoryRatings.length > 0 ? categoryRatings.reduce((sum, rating) => sum + rating, 0) / categoryRatings.length : review.rating || 0;

    // Extract listing ID
    const listingId = review.listingName.split(" - ")[0] || review.listingName;

    // Determine sentiment
    let sentiment: "positive" | "neutral" | "negative" = "neutral";
    if (overallRating >= 8) sentiment = "positive";
    if (overallRating <= 5) sentiment = "negative";

    // Check if needs attention
    const lowCategory = review.reviewCategory.some((cat) => cat.rating < 5);
    const negativeKeywords = ["issue", "problem", "broken", "dirty", "poor", "bad", "disappointed"];
    const hasNegativeKeywords = negativeKeywords.some((keyword) => review.publicReview.toLowerCase().includes(keyword));

    const needsAttention = overallRating < 7 || lowCategory || hasNegativeKeywords;

    // Determine channel
    const channel: NormalizedReview["channel"] = isValidChannel(review.channel) ? review.channel : "direct";

    // Determine type
    const type: NormalizedReview["type"] = isValidType(review.type) ? review.type : "guest-to-host";

    // Determine status
    const status: NormalizedReview["status"] = isValidStatus(review.status) ? review.status : "pending";

    return {
      id: review.id,
      type,
      status,
      overallRating: parseFloat(overallRating.toFixed(1)),
      publicReview: review.publicReview,
      categories: review.reviewCategory,
      submittedAt: review.submittedAt,
      guestName: review.guestName,
      listingId,
      listingName: review.listingName,
      channel,
      isApproved: status === "published",
      needsAttention,
      sentiment,
    };
  });
}

// Helper functions for the dashboard
export function getUniqueListings(reviews: NormalizedReview[]) {
  const listings = new Set(reviews.map((review) => review.listingName));
  return Array.from(listings).map((name) => {
    const listingReviews = reviews.filter((r) => r.listingName === name);
    const avgRating = listingReviews.length > 0 ? listingReviews.reduce((sum, r) => sum + r.overallRating, 0) / listingReviews.length : 0;

    return {
      name,
      id: listingReviews[0]?.listingId || "",
      reviewCount: listingReviews.length,
      avgRating: parseFloat(avgRating.toFixed(1)),
      needsAttentionCount: listingReviews.filter((r) => r.needsAttention).length,
    };
  });
}

export function getReviewStats(reviews: NormalizedReview[]) {
  const total = reviews.length;
  const published = reviews.filter((r) => r.status === "published").length;
  const needsAttention = reviews.filter((r) => r.needsAttention).length;
  const avgRating = total > 0 ? reviews.reduce((sum, r) => sum + r.overallRating, 0) / total : 0;

  const byChannel = reviews.reduce((acc, review) => {
    acc[review.channel] = (acc[review.channel] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const bySentiment = reviews.reduce((acc, review) => {
    acc[review.sentiment] = (acc[review.sentiment] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    total,
    published,
    pending: reviews.filter((r) => r.status === "pending").length,
    unpublished: reviews.filter((r) => r.status === "unpublished").length,
    needsAttention,
    avgRating: parseFloat(avgRating.toFixed(1)),
    byChannel,
    bySentiment,
  };
}
