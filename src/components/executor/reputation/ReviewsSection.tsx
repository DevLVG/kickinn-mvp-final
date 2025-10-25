import { useState } from "react";

const ReviewsSection = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 10;

  const reviews = [
    {
      review_id: "1",
      venture_name: "ThreadCycle",
      role: "Lead Developer",
      rating: 5,
      review_text: "Exceptional work quality and professionalism. Mehul delivered ahead of schedule and maintained excellent communication throughout the project. The technical implementation exceeded our expectations, and the code quality was outstanding. Would definitely work with again!",
      reviewer_type: "Ideator",
      created_at: "2 months ago"
    },
    {
      review_id: "2",
      venture_name: "AI Content Studio",
      role: "Full-Stack Engineer",
      rating: 5,
      review_text: "Outstanding developer with deep technical expertise. The AI integration was seamless and the performance optimizations made a huge difference. Very responsive to feedback and always willing to go the extra mile.",
      reviewer_type: "Ideator",
      created_at: "3 months ago"
    },
    {
      review_id: "3",
      venture_name: "HealthTrack Pro",
      role: "Mobile Developer",
      rating: 4.8,
      review_text: "Great collaboration and technical skills. The mobile app works flawlessly across all devices. Minor delays in the final sprint, but overall excellent delivery. Highly recommended!",
      reviewer_type: "Ideator",
      created_at: "4 months ago"
    },
    {
      review_id: "4",
      venture_name: "EduLearn Platform",
      role: "Backend Developer",
      rating: 4.7,
      review_text: "Solid backend architecture and API design. Mehul showed great problem-solving skills when we faced scaling challenges. Professional and reliable throughout the entire project.",
      reviewer_type: "Ideator",
      created_at: "5 months ago"
    },
    {
      review_id: "5",
      venture_name: "FinFlow Analytics",
      role: "Data Engineer",
      rating: 4.9,
      review_text: "Incredible work on the data pipeline and analytics dashboard. The real-time processing is super fast and the insights are invaluable. One of the best executors we've worked with!",
      reviewer_type: "Ideator",
      created_at: "6 months ago"
    },
    {
      review_id: "6",
      venture_name: "GreenEnergy Dashboard",
      role: "Frontend Developer",
      rating: 5.0,
      review_text: "Beautiful UI implementation with excellent attention to detail. The dashboard is intuitive and performs great even with large datasets. Perfect execution!",
      reviewer_type: "Ideator",
      created_at: "7 months ago"
    }
  ];

  const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className="flex gap-0.5">
        {[...Array(fullStars)].map((_, i) => (
          <span key={i} className="text-yellow-400">⭐</span>
        ))}
        {hasHalfStar && <span className="text-yellow-400">⭐</span>}
        {[...Array(5 - Math.ceil(rating))].map((_, i) => (
          <span key={i} className="text-gray-600">⭐</span>
        ))}
      </div>
    );
  };

  return (
    <section 
      className="w-full py-20 px-10"
      style={{ background: 'rgba(25, 74, 97, 0.5)' }}
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-4">
          Reviews from Ventures
        </h2>

        {/* Rating Summary */}
        <div className="flex items-center gap-3 mb-12">
          <span className="text-5xl font-bold text-white">
            {averageRating.toFixed(1)}
          </span>
          <span className="text-3xl">⭐</span>
          <span className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            Based on {reviews.length} reviews
          </span>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {reviews.slice((currentPage - 1) * reviewsPerPage, currentPage * reviewsPerPage).map((review) => (
            <div
              key={review.review_id}
              className="rounded-2xl p-6 transition-all hover:border-opacity-100"
              style={{
                background: 'linear-gradient(135deg, rgba(103, 159, 131, 0.08), rgba(35, 105, 138, 0.08))',
                border: '1px solid rgba(103, 159, 131, 0.2)'
              }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-white mb-1">
                    {review.venture_name}
                  </h3>
                  <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                    as {review.role}
                  </p>
                </div>
                <div className="text-right">
                  {renderStars(review.rating)}
                  <p className="text-sm font-medium mt-1" style={{ color: '#679f83' }}>
                    {review.rating.toFixed(1)}
                  </p>
                </div>
              </div>

              {/* Review Text */}
              <p 
                className="text-sm leading-relaxed mb-4"
                style={{ color: 'rgba(255, 255, 255, 0.8)' }}
              >
                {review.review_text}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                <span className="flex items-center gap-1">
                  👤 Review by {review.reviewer_type}
                </span>
                <span className="flex items-center gap-1">
                  📅 {review.created_at}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className="w-10 h-10 rounded-lg font-medium text-sm transition-all"
                style={{
                  background: currentPage === index + 1 
                    ? '#679f83' 
                    : 'rgba(103, 159, 131, 0.2)',
                  color: 'white'
                }}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ReviewsSection;
