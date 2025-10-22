import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

interface Traction {
  users: { count: number; change: number; change_percent: number };
  revenue: { mrr: number; arr: number; change: number; change_percent: number };
  growth_rate: number;
  chart_data: Array<{
    week: string;
    users: number;
    revenue: number;
    signups: number;
  }>;
  last_updated: string;
  next_update: string;
}

interface VentureTractionTabProps {
  traction: Traction;
}

const VentureTractionTab = ({ traction }: VentureTractionTabProps) => {
  const [selectedMetric, setSelectedMetric] = useState<'users' | 'revenue' | 'signups'>('users');

  const getMetricData = () => {
    return traction.chart_data.map(item => ({
      week: item.week,
      value: item[selectedMetric]
    }));
  };

  return (
    <div className="space-y-6">
      {/* Last Updated Banner */}
      <div className="bg-gradient-to-r from-[rgba(103,159,131,0.1)] to-[rgba(35,105,138,0.1)] border-l-4 border-[#679f83] p-5 rounded-r-lg">
        <div className="flex items-center gap-2">
          <span className="text-base">🔄</span>
          <p className="text-sm text-gray-700">
            Traction data updated weekly • Last update: <strong>{traction.last_updated}</strong>
          </p>
        </div>
        <p className="text-xs text-gray-500 mt-1 ml-7">Next update: {traction.next_update}</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Users */}
        <div className="bg-white rounded-xl p-6 border border-[rgba(103,159,131,0.15)] relative">
          <div className="absolute top-6 right-6 text-2xl opacity-50">👥</div>
          <div className="text-xs text-gray-500 uppercase mb-2">Total Users</div>
          <div className="text-4xl font-bold text-[#194a61] mb-2">
            {traction.users.count.toLocaleString()}
          </div>
          <div className={`text-sm ${traction.users.change >= 0 ? 'text-[#10b981]' : 'text-[#ef4444]'}`}>
            {traction.users.change >= 0 ? '+' : ''}{traction.users.change.toLocaleString()} ({traction.users.change >= 0 ? '+' : ''}
            {traction.users.change_percent.toFixed(1)}%)
          </div>
          <div className="text-xs text-gray-500 mt-1">vs. last week</div>
        </div>

        {/* Revenue */}
        <div className="bg-white rounded-xl p-6 border border-[rgba(103,159,131,0.15)] relative">
          <div className="absolute top-6 right-6 text-2xl opacity-50">💵</div>
          <div className="text-xs text-gray-500 uppercase mb-2">Monthly Recurring Revenue</div>
          <div className="text-4xl font-bold text-[#194a61] mb-2">
            ${(traction.revenue.mrr / 1000).toFixed(0)}K
          </div>
          <div className={`text-sm ${traction.revenue.change >= 0 ? 'text-[#10b981]' : 'text-[#ef4444]'}`}>
            {traction.revenue.change >= 0 ? '+' : ''}${(traction.revenue.change / 1000).toFixed(0)}K ({traction.revenue.change >= 0 ? '+' : ''}
            {traction.revenue.change_percent.toFixed(1)}%)
          </div>
          <div className="text-xs text-gray-500 mt-1">vs. last month</div>
        </div>

        {/* Growth Rate */}
        <div className="bg-white rounded-xl p-6 border border-[rgba(103,159,131,0.15)] relative">
          <div className="absolute top-6 right-6 text-2xl opacity-50">📊</div>
          <div className="text-xs text-gray-500 uppercase mb-2">Growth Rate</div>
          <div className={`text-4xl font-bold mb-2 ${traction.growth_rate >= 0 ? 'text-[#10b981]' : 'text-[#ef4444]'}`}>
            {traction.growth_rate >= 0 ? '+' : ''}{traction.growth_rate}%
          </div>
          <div className="text-xs text-gray-500">Month-over-Month</div>
          <div className={`text-sm mt-1 ${traction.growth_rate >= 15 ? 'text-[#10b981]' : 'text-[#f59e0b]'}`}>
            {traction.growth_rate >= 15 ? '↑ Accelerating' : '↓ Slowing'}
          </div>
        </div>
      </div>

      {/* Traction Chart */}
      <div className="bg-white rounded-xl p-8 border border-[rgba(103,159,131,0.15)]">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-[#194a61]">8-Week Traction Trend</h2>
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value as 'users' | 'revenue' | 'signups')}
            className="px-4 py-2 border border-[rgba(103,159,131,0.2)] rounded-lg text-sm focus:border-[#679f83] focus:ring-2 focus:ring-[rgba(103,159,131,0.2)] transition-all"
          >
            <option value="users">Users</option>
            <option value="revenue">Revenue</option>
            <option value="signups">Sign-ups</option>
          </select>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={getMetricData()}>
            <defs>
              <linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#679f83" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#679f83" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="week" stroke="#6b7280" style={{ fontSize: '12px' }} />
            <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '12px'
              }}
              formatter={(value: number) => [value.toLocaleString(), '']}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#679f83"
              strokeWidth={2}
              fill="url(#colorMetric)"
            />
          </AreaChart>
        </ResponsiveContainer>

        <div className="flex items-center justify-center gap-3 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 bg-[#679f83]"></div>
            <span className="text-sm text-gray-600 capitalize">{selectedMetric}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VentureTractionTab;
