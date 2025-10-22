import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

interface TokenPriceSectionProps {
  market: any;
  symbol: string;
}

const TokenPriceSection = ({ market, symbol }: TokenPriceSectionProps) => {
  const [timeframe, setTimeframe] = useState<'1H' | '24H' | '7D' | '30D' | 'ALL'>('24H');

  // Mock price history data
  const generatePriceData = () => {
    const dataPoints = timeframe === '1H' ? 12 : timeframe === '24H' ? 24 : timeframe === '7D' ? 7 : 30;
    const data = [];
    let basePrice = market.current_price_usdt;
    
    for (let i = dataPoints; i >= 0; i--) {
      const variance = (Math.random() - 0.5) * 0.02;
      const price = basePrice * (1 + variance);
      data.push({
        time: i,
        price: parseFloat(price.toFixed(4)),
        volume: Math.floor(Math.random() * 10000) + 5000
      });
      basePrice = price;
    }
    return data.reverse();
  };

  const priceData = generatePriceData();

  return (
    <div className="bg-card rounded-xl p-6 md:p-8 border border-border mb-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-1">Market Price</h2>
        <p className="text-sm text-muted-foreground">Live from STON.fi DEX</p>
      </div>

      {/* Live Price Card */}
      <div className="bg-primary/5 p-6 rounded-lg mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-xs text-muted-foreground uppercase mb-1">Current Price</p>
            <p className="text-4xl font-bold text-foreground mb-1">
              ${market.current_price_usdt}
            </p>
            <p className="text-xs text-muted-foreground">Updated 5s ago</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase mb-1">24h Volume</p>
            <p className="text-2xl font-bold text-foreground">
              ${market.trading_volume_24h.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase mb-1">Liquidity</p>
            <p className="text-2xl font-bold text-foreground">
              ${market.liquidity_pool_size.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Price Chart */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-foreground">Price History</h3>
          <div className="flex gap-2">
            {(['1H', '24H', '7D', '30D', 'ALL'] as const).map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  timeframe === tf
                    ? 'bg-gradient-to-r from-primary to-accent text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={priceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="time" 
              stroke="hsl(var(--muted-foreground))"
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              tick={{ fontSize: 12 }}
              domain={['dataMin - 0.01', 'dataMax + 0.01']}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }}
              formatter={(value: number) => [`$${value.toFixed(4)}`, 'Price']}
            />
            <Line 
              type="monotone" 
              dataKey="price" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TokenPriceSection;
