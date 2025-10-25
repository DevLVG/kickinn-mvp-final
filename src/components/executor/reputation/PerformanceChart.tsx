import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

interface PerformanceChartProps {
  history: Array<{
    month: string;
    score: number;
  }>;
}

const PerformanceChart = ({ history }: PerformanceChartProps) => {
  const [timeframe, setTimeframe] = useState<'6M' | '1Y' | 'ALL'>('ALL');

  const timeframes = ['6M', '1Y', 'ALL'] as const;

  return (
    <section 
      className="w-full py-20 px-10"
      style={{ background: 'rgba(25, 74, 97, 0.3)' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-4xl font-bold text-white">
            Reputation Trend
          </h2>

          {/* Timeframe Selector */}
          <div className="flex gap-2">
            {timeframes.map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className="px-4 py-2 rounded-lg font-medium text-sm transition-all"
                style={{
                  background: timeframe === tf ? '#679f83' : 'rgba(103, 159, 131, 0.1)',
                  color: timeframe === tf ? 'white' : 'rgba(255, 255, 255, 0.6)'
                }}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        {/* Chart Container */}
        <div 
          className="rounded-2xl p-8 h-96"
          style={{
            background: 'rgba(103, 159, 131, 0.05)',
            border: '1px solid rgba(103, 159, 131, 0.2)'
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={history}>
              <defs>
                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#679f83" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#679f83" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" />
              <XAxis 
                dataKey="month" 
                stroke="rgba(255, 255, 255, 0.5)"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                domain={[0, 100]}
                stroke="rgba(255, 255, 255, 0.5)"
                style={{ fontSize: '12px' }}
              />
              <Tooltip 
                contentStyle={{
                  background: 'rgba(25, 74, 97, 0.95)',
                  border: '1px solid rgba(103, 159, 131, 0.3)',
                  borderRadius: '8px',
                  color: 'white'
                }}
              />
              <Area
                type="monotone"
                dataKey="score"
                stroke="#679f83"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorScore)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};

export default PerformanceChart;
