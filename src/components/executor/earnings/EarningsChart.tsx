import { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const EarningsChart = () => {
  const [timeframe, setTimeframe] = useState<'1M' | '3M' | '6M' | '1Y' | 'ALL'>('6M');

  // Mock chart data
  const chartData = [
    { date: "Jan", vested: 15000, claimed: 12000, value_usd: 6800 },
    { date: "Feb", vested: 28000, claimed: 20000, value_usd: 12500 },
    { date: "Mar", vested: 42000, claimed: 35000, value_usd: 18200 },
    { date: "Apr", vested: 58000, claimed: 48000, value_usd: 24800 },
    { date: "May", vested: 75000, claimed: 65000, value_usd: 32100 },
    { date: "Jun", vested: 95000, claimed: 85000, value_usd: 39500 },
    { date: "Jul", vested: 115000, claimed: 105000, value_usd: 45280 }
  ];

  const timeframes: Array<'1M' | '3M' | '6M' | '1Y' | 'ALL'> = ['1M', '3M', '6M', '1Y', 'ALL'];

  return (
    <div className="bg-card rounded-2xl p-8 shadow-md mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[#194a61]">Earnings Over Time</h2>
        
        {/* Timeframe Selector */}
        <div className="flex gap-2">
          {timeframes.map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`
                px-4 py-2 rounded-lg text-[13px] font-medium transition-all
                ${timeframe === tf
                  ? 'bg-[#679f83] text-white'
                  : 'bg-[rgba(103,159,131,0.1)] text-[#679f83] hover:bg-[rgba(103,159,131,0.2)]'
                }
              `}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="vestedGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="claimedGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
            <XAxis 
              dataKey="date" 
              stroke="hsl(var(--muted-foreground))"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              style={{ fontSize: '12px' }}
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                fontSize: '13px'
              }}
              formatter={(value: number, name: string) => {
                const label = name === 'vested' ? 'Total Vested' : 'Claimed';
                return [`${value.toLocaleString()} tokens`, label];
              }}
            />
            <Legend 
              wrapperStyle={{ fontSize: '13px', paddingTop: '20px' }}
            />
            <Area
              type="monotone"
              dataKey="vested"
              name="Total Vested"
              stroke="#10b981"
              strokeWidth={2}
              fill="url(#vestedGradient)"
            />
            <Area
              type="monotone"
              dataKey="claimed"
              name="Claimed"
              stroke="#3b82f6"
              strokeWidth={2}
              fill="url(#claimedGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EarningsChart;
