import { Star, AlertCircle, CheckCircle, BarChart3, Building } from "lucide-react";
import { NormalizedReview, getReviewStats, getUniqueListings } from "@/lib/mockData";

interface StatsCardsProps {
  reviews: NormalizedReview[];
}

export default function StatsCards({ reviews }: StatsCardsProps) {
  const stats = getReviewStats(reviews);
  const listings = getUniqueListings(reviews);

  const cards = [
    {
      title: "Total Reviews",
      value: stats.total,
      icon: BarChart3,
      color: "bg-blue-500",
      textColor: "text-blue-600",
    },
    {
      title: "Average Rating",
      value: stats.avgRating,
      icon: Star,
      color: "bg-yellow-500",
      textColor: "text-yellow-600",
      suffix: "/10",
    },
    {
      title: "Published",
      value: stats.published,
      icon: CheckCircle,
      color: "bg-green-500",
      textColor: "text-green-600",
    },
    {
      title: "Need Attention",
      value: stats.needsAttention,
      icon: AlertCircle,
      color: "bg-red-500",
      textColor: "text-red-600",
    },
    {
      title: "Properties",
      value: listings.length,
      icon: Building,
      color: "bg-purple-500",
      textColor: "text-purple-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div key={card.title} className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{card.title}</p>
                <p className="text-2xl font-bold mt-2 text-gray-300">
                  {card.value}
                  {card.suffix && <span className="text-xl text-gray-500">{card.suffix}</span>}
                </p>
              </div>
              <div className={`${card.color} p-3 rounded-lg`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
