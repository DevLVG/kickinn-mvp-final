const HeroVisual = () => {
  return (
    <div className="h-[500px] flex items-center justify-center relative">
      {/* Multiple glow layers for depth */}
      <div 
        className="absolute w-[450px] h-[450px] rounded-full blur-[60px] opacity-40 animate-pulse"
        style={{
          background: 'radial-gradient(circle, hsl(150, 25%, 52%), hsl(199, 60%, 34%), transparent)',
          animationDuration: '4s'
        }}
      />
      <div 
        className="absolute w-[350px] h-[350px] rounded-full blur-[40px] opacity-50"
        style={{
          background: 'radial-gradient(circle, hsl(199, 60%, 34%), hsl(150, 28%, 62%), transparent)'
        }}
      />
      
      {/* Rotating outer ring */}
      <div 
        className="absolute w-[340px] h-[340px] rounded-full border border-secondary-teal/10 animate-spin"
        style={{ animationDuration: '20s' }}
      />
      
      {/* Main circle with enhanced glow */}
      <div 
        className="relative w-[300px] h-[300px] rounded-full border-2 border-secondary-teal/30 flex items-center justify-center shadow-[0_0_60px_hsla(150,25%,52%,0.4)]"
        style={{
          background: 'radial-gradient(circle at 35% 35%, hsla(150, 25%, 52%, 0.4), hsla(199, 60%, 34%, 0.2), transparent)'
        }}
      >
        {/* Inner geometric shape - hexagon with enhanced visuals */}
        <svg width="160" height="160" viewBox="0 0 160 160" className="relative z-10">
          <defs>
            <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: 'hsl(150, 25%, 52%)', stopOpacity: 0.8 }} />
              <stop offset="50%" style={{ stopColor: 'hsl(199, 60%, 34%)', stopOpacity: 0.6 }} />
              <stop offset="100%" style={{ stopColor: 'hsl(150, 28%, 62%)', stopOpacity: 0.8 }} />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <polygon 
            points="80,15 130,50 130,110 80,145 30,110 30,50" 
            fill="url(#hexGradient)"
            stroke="hsl(150, 25%, 52%)"
            strokeWidth="2.5"
            filter="url(#glow)"
            className="animate-pulse"
            style={{ animationDuration: '3s' }}
          />
        </svg>
        
        {/* Floating particles */}
        <div className="absolute w-2 h-2 bg-secondary-teal/60 rounded-full top-12 left-12 animate-pulse" style={{ animationDuration: '2s' }} />
        <div className="absolute w-1.5 h-1.5 bg-light-teal/50 rounded-full bottom-16 right-16 animate-pulse" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }} />
        <div className="absolute w-2 h-2 bg-accent-blue/40 rounded-full top-24 right-12 animate-pulse" style={{ animationDuration: '3s', animationDelay: '1s' }} />
      </div>
    </div>
  );
};

export default HeroVisual;
