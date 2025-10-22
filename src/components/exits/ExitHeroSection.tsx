const ExitHeroSection = () => {
  const stats = [
    { number: "47", label: "Available Ventures" },
    { number: "$2.4M", label: "Avg Exit Price" },
    { number: "8.2x", label: "Avg Multiple" },
    { number: "18 days", label: "Avg Time to Close" }
  ];

  return (
    <div 
      className="px-4 md:px-10 py-16 md:py-20"
      style={{
        background: 'linear-gradient(135deg, #0f2b38 0%, #194a61 50%, #0f2b38 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Subtle radial overlay */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 70% 30%, rgba(103, 159, 131, 0.08), transparent 40%)',
          pointerEvents: 'none'
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Page Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Exit-Ready Ventures
        </h1>

        {/* Value Proposition */}
        <p 
          className="text-lg max-w-3xl mb-10"
          style={{ color: 'rgba(255, 255, 255, 0.8)' }}
        >
          Acquire proven digital businesses with traction, revenue, and exit-ready infrastructure. Due diligence included.
        </p>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-2xl"
              style={{
                background: 'rgba(103, 159, 131, 0.1)',
                border: '1px solid rgba(103, 159, 131, 0.2)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <div className="text-3xl md:text-4xl font-bold mb-2" style={{ color: '#679f83' }}>
                {stat.number}
              </div>
              <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExitHeroSection;
