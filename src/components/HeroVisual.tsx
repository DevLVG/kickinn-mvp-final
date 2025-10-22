const HeroVisual = () => {
  return (
    <div className="h-[400px] flex items-center justify-center relative">
      {/* Outer glow */}
      <div 
        className="absolute w-80 h-80 rounded-full blur-[40px] opacity-60"
        style={{
          background: 'radial-gradient(circle, hsl(150, 25%, 52%), hsl(199, 60%, 34%), transparent)'
        }}
      />
      
      {/* Main circle */}
      <div 
        className="relative w-[280px] h-[280px] rounded-full border-2 border-secondary-teal/20 flex items-center justify-center"
        style={{
          background: 'radial-gradient(circle at 35% 35%, hsla(150, 25%, 52%, 0.3), hsla(199, 60%, 34%, 0.1), transparent)'
        }}
      >
        {/* Inner geometric shape - hexagon */}
        <svg width="140" height="140" viewBox="0 0 140 140" className="opacity-80">
          <defs>
            <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: 'hsl(150, 25%, 52%)', stopOpacity: 0.6 }} />
              <stop offset="50%" style={{ stopColor: 'hsl(199, 60%, 34%)', stopOpacity: 0.4 }} />
              <stop offset="100%" style={{ stopColor: 'hsl(150, 28%, 62%)', stopOpacity: 0.6 }} />
            </linearGradient>
          </defs>
          <polygon 
            points="70,10 120,40 120,100 70,130 20,100 20,40" 
            fill="url(#hexGradient)"
            stroke="hsl(150, 25%, 52%)"
            strokeWidth="2"
            className="animate-pulse"
            style={{ animationDuration: '3s' }}
          />
        </svg>
      </div>
    </div>
  );
};

export default HeroVisual;
