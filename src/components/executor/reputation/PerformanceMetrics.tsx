interface PerformanceMetricsProps {
  scores: {
    overall: number;
    quality: number;
    timeliness: number;
    communication: number;
  };
}

const PerformanceMetrics = ({ scores }: PerformanceMetricsProps) => {
  const metrics = [
    { icon: "🎯", label: "Overall Score", score: scores.overall, color: "#679f83" },
    { icon: "💎", label: "Quality Score", score: scores.quality, color: "#4ade80" },
    { icon: "⏱️", label: "Timeliness", score: scores.timeliness, color: "#60a5fa" },
    { icon: "💬", label: "Communication", score: scores.communication, color: "#86b39c" }
  ];

  return (
    <section 
      className="w-full py-20 px-10"
      style={{ background: 'rgba(15, 43, 56, 0.3)' }}
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-white text-center mb-4">
          Performance Metrics
        </h2>
        <p className="text-base text-center mb-16" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
          Your performance across all completed ventures
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="rounded-2xl p-7 text-center transition-all hover:translate-y-[-4px]"
              style={{
                background: 'linear-gradient(135deg, rgba(103, 159, 131, 0.1), rgba(35, 105, 138, 0.1))',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(103, 159, 131, 0.2)'
              }}
            >
              <div className="text-5xl mb-4">{metric.icon}</div>
              <div className="text-5xl font-bold text-white mb-2">
                {metric.score}
              </div>
              <div className="text-sm mb-3" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                {metric.label}
              </div>
              
              {/* Progress Bar */}
              <div 
                className="h-1.5 rounded-full overflow-hidden"
                style={{ background: 'rgba(103, 159, 131, 0.2)' }}
              >
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{
                    width: `${metric.score}%`,
                    background: `linear-gradient(90deg, ${metric.color}, ${metric.color}dd)`
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PerformanceMetrics;
