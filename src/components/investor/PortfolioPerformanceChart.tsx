import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

interface PortfolioPerformanceChartProps {
  timePeriod: '7D' | '1M' | '3M' | '6M' | '1Y' | 'ALL';
  onTimePeriodChange: (period: '7D' | '1M' | '3M' | '6M' | '1Y' | 'ALL') => void;
}

const PortfolioPerformanceChart = ({ timePeriod, onTimePeriodChange }: PortfolioPerformanceChartProps) => {
  // Mock performance data
  const data = [
    { date: 'Oct 1', portfolio_value: 118000, invested_value: 118000 },
    { date: 'Oct 5', portfolio_value: 122000, invested_value: 118000 },
    { date: 'Oct 10', portfolio_value: 119500, invested_value: 118000 },
    { date: 'Oct 15', portfolio_value: 125000, invested_value: 118000 },
    { date: 'Oct 20', portfolio_value: 127500, invested_value: 118000 },
    { date: 'Oct 25', portfolio_value: 124000, invested_value: 118000 },
    { date: 'Oct 30', portfolio_value: 128500, invested_value: 118000 },
    { date: 'Nov 1', portfolio_value: 131000, invested_value: 118000 },
    { date: 'Nov 5', portfolio_value: 134500, invested_value: 118000 },
    { date: 'Nov 10', portfolio_value: 137200, invested_value: 118000 },
    { date: 'Nov 15', portfolio_value: 139800, invested_value: 118000 },
    { date: 'Nov 20', portfolio_value: 142500, invested_value: 118000 },
    { date: 'Today', portfolio_value: 144833, invested_value: 118000 }
  ];

  const periods: Array<'7D' | '1M' | '3M' | '6M' | '1Y' | 'ALL'> = ['7D', '1M', '3M', '6M', '1Y', 'ALL'];

  return (
    <div className="bg-white border border-[rgba(103,159,131,0.15)] rounded-2xl p-8 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[#194a61]">Portfolio Performance</h2>
        <div className="flex gap-2">
          {periods.map((period) => (
            <button
              key={period}
              onClick={() => onTimePeriodChange(period)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                timePeriod === period
                  ? 'bg-[#679f83] text-white'
                  : 'bg-transparent text-gray-600 hover:bg-gray-100'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorPortfolio" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#679f83" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#679f83" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="date"
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
          />
          <YAxis
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '12px'
            }}
            formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
            labelStyle={{ color: '#194a61', fontWeight: 'bold', marginBottom: '4px' }}
          />
          <Area
            type="monotone"
            dataKey="portfolio_value"
            stroke="#679f83"
            strokeWidth={2}
            fill="url(#colorPortfolio)"
            name="Portfolio Value"
          />
          <Line
            type="monotone"
            dataKey="invested_value"
            stroke="#9ca3af"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
            name="Initial Investment"
          />
        </AreaChart>
      </ResponsiveContainer>

      <div className="flex items-center justify-end gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-0.5 bg-[#679f83]"></div>
          <span className="text-sm text-gray-600">Portfolio Value</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-0.5 bg-[#9ca3af]" style={{ borderTop: '2px dashed #9ca3af' }}></div>
          <span className="text-sm text-gray-600">Initial Investment</span>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPerformanceChart;
