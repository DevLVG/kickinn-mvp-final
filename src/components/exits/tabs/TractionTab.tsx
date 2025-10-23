import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, DollarSign, Percent } from 'lucide-react';

interface TractionTabProps {
  venture: any;
}

const TractionTab = ({ venture }: TractionTabProps) => {
  // Mock growth data
  const growthData = [
    { month: 'Jan', revenue: 12000, users: 6500 },
    { month: 'Feb', revenue: 14500, users: 7800 },
    { month: 'Mar', revenue: 16200, users: 8600 },
    { month: 'Apr', revenue: 18000, users: 9200 },
    { month: 'May', revenue: 19800, users: 10100 },
    { month: 'Jun', revenue: 21200, users: 10900 },
    { month: 'Jul', revenue: 22100, users: 11400 },
    { month: 'Aug', revenue: 22900, users: 11800 },
    { month: 'Sep', revenue: 23400, users: 12200 },
    { month: 'Oct', revenue: 23900, users: 12500 },
    { month: 'Nov', revenue: 24200, users: 12700 },
    { month: 'Dec', revenue: 24500, users: 12847 }
  ];

  // Mock cohort data
  const cohortData = [
    { month: 'M1', retention: 100 },
    { month: 'M2', retention: 92 },
    { month: 'M3', retention: 88 },
    { month: 'M4', retention: 85 },
    { month: 'M5', retention: 83 },
    { month: 'M6', retention: 81 },
    { month: 'M7', retention: 80 },
    { month: 'M8', retention: 79 },
    { month: 'M9', retention: 78 },
    { month: 'M10', retention: 77 },
    { month: 'M11', retention: 77 },
    { month: 'M12', retention: 76 }
  ];

  const metrics = [
    {
      icon: <DollarSign className="w-5 h-5" />,
      label: 'MRR Trend',
      value: '$24,500',
      change: '+$3,200 from last month',
      color: 'text-[#4ade80]'
    },
    {
      icon: <DollarSign className="w-5 h-5" />,
      label: 'ARR',
      value: '$294,000',
      change: '$420K projected by year-end',
      color: 'text-[#679f83]'
    },
    {
      icon: <Users className="w-5 h-5" />,
      label: 'Active Users',
      value: '12,847',
      change: '+18% MoM',
      color: 'text-[#4ade80]'
    },
    {
      icon: <Users className="w-5 h-5" />,
      label: 'Paying Customers',
      value: '1,247',
      change: '9.7% conversion rate',
      color: 'text-[#679f83]'
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      label: 'Avg Revenue Per User',
      value: '$19.64',
      change: '+$2.15 YoY',
      color: 'text-[#4ade80]'
    },
    {
      icon: <Percent className="w-5 h-5" />,
      label: 'Customer Retention',
      value: '97.6%',
      change: '30-day retention',
      color: 'text-[#4ade80]'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Growth Chart */}
      <div className="bg-[rgba(25,74,97,0.3)] backdrop-blur-[20px] border border-[rgba(103,159,131,0.2)] rounded-3xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Revenue & User Growth (Last 12 Months)</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={growthData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(103,159,131,0.1)" />
            <XAxis dataKey="month" stroke="rgba(255,255,255,0.6)" />
            <YAxis yAxisId="left" stroke="rgba(255,255,255,0.6)" />
            <YAxis yAxisId="right" orientation="right" stroke="rgba(255,255,255,0.6)" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(25,74,97,0.95)',
                border: '1px solid rgba(103,159,131,0.3)',
                borderRadius: '12px',
                color: 'white'
              }}
            />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="revenue"
              stroke="#679f83"
              strokeWidth={3}
              name="Revenue (USD)"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="users"
              stroke="#60a5fa"
              strokeWidth={3}
              name="Users"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="bg-[rgba(25,74,97,0.3)] backdrop-blur-[20px] border border-[rgba(103,159,131,0.2)] rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-4 text-[#679f83]">
              {metric.icon}
              <span className="text-sm font-medium text-white/70">{metric.label}</span>
            </div>
            <p className={`text-3xl font-bold ${metric.color} mb-2`}>
              {metric.value}
            </p>
            <p className="text-sm text-white/60">{metric.change}</p>
          </div>
        ))}
      </div>

      {/* Cohort Analysis */}
      <div className="bg-[rgba(25,74,97,0.3)] backdrop-blur-[20px] border border-[rgba(103,159,131,0.2)] rounded-3xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Cohort Retention Analysis</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={cohortData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(103,159,131,0.1)" />
            <XAxis dataKey="month" stroke="rgba(255,255,255,0.6)" />
            <YAxis stroke="rgba(255,255,255,0.6)" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(25,74,97,0.95)',
                border: '1px solid rgba(103,159,131,0.3)',
                borderRadius: '12px',
                color: 'white'
              }}
            />
            <Bar dataKey="retention" fill="#679f83" name="Retention %" />
          </BarChart>
        </ResponsiveContainer>
        <p className="text-sm text-white/60 mt-4 text-center">
          Average retention rate across all cohorts: 82.5%
        </p>
      </div>
    </div>
  );
};

export default TractionTab;
