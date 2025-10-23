import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface FinancialsTabProps {
  venture: any;
}

const FinancialsTab = ({ venture }: FinancialsTabProps) => {
  // Revenue streams data
  const revenueStreams = [
    { name: 'Subscriptions', value: 227000, percent: 78 },
    { name: 'Usage Fees', value: 44000, percent: 15 },
    { name: 'One-time', value: 21000, percent: 7 }
  ];

  const COLORS = ['#679f83', '#60a5fa', '#fb923c'];

  // Monthly expenses data
  const expensesData = [
    { month: 'Jan', marketing: 3500, operations: 2800, development: 2400, total: 8700 },
    { month: 'Feb', marketing: 3600, operations: 2900, development: 2500, total: 9000 },
    { month: 'Mar', marketing: 3700, operations: 2950, development: 2500, total: 9150 },
    { month: 'Apr', marketing: 3800, operations: 3000, development: 2500, total: 9300 },
    { month: 'May', marketing: 3850, operations: 3050, development: 2450, total: 9350 },
    { month: 'Jun', marketing: 3900, operations: 3100, development: 2450, total: 9450 },
    { month: 'Jul', marketing: 3800, operations: 3000, development: 2400, total: 9200 },
    { month: 'Aug', marketing: 3750, operations: 2950, development: 2400, total: 9100 },
    { month: 'Sep', marketing: 3700, operations: 2950, development: 2450, total: 9100 },
    { month: 'Oct', marketing: 3675, operations: 2940, development: 2450, total: 9065 },
    { month: 'Nov', marketing: 3650, operations: 2940, development: 2450, total: 9040 },
    { month: 'Dec', marketing: 3675, operations: 2940, development: 2450, total: 9065 }
  ];

  // Projections data
  const projectionsData = [
    { month: 'Jan', conservative: 25000, optimistic: 27000 },
    { month: 'Feb', conservative: 26000, optimistic: 29000 },
    { month: 'Mar', conservative: 27000, optimistic: 31500 },
    { month: 'Apr', conservative: 28000, optimistic: 34500 },
    { month: 'May', conservative: 29000, optimistic: 38000 },
    { month: 'Jun', conservative: 30000, optimistic: 42000 },
    { month: 'Jul', conservative: 31000, optimistic: 46500 },
    { month: 'Aug', conservative: 32000, optimistic: 51500 },
    { month: 'Sep', conservative: 33000, optimistic: 57000 },
    { month: 'Oct', conservative: 34000, optimistic: 63000 },
    { month: 'Nov', conservative: 35000, optimistic: 69500 },
    { month: 'Dec', conservative: 36000, optimistic: 76500 }
  ];

  return (
    <div className="space-y-8">
      {/* Revenue Breakdown */}
      <div className="bg-[rgba(25,74,97,0.3)] backdrop-blur-[20px] border border-[rgba(103,159,131,0.2)] rounded-3xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Revenue Streams</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={revenueStreams}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${percent}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {revenueStreams.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(25,74,97,0.95)',
                  border: '1px solid rgba(103,159,131,0.3)',
                  borderRadius: '12px',
                  color: 'white'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          
          <div className="flex flex-col justify-center space-y-4">
            {revenueStreams.map((stream, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: COLORS[index] }}
                  />
                  <span className="text-white">{stream.name}</span>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold">${(stream.value / 1000).toFixed(0)}K</p>
                  <p className="text-sm text-white/60">{stream.percent}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* P&L Summary */}
      <div className="bg-[rgba(25,74,97,0.3)] backdrop-blur-[20px] border border-[rgba(103,159,131,0.2)] rounded-3xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Profit & Loss Statement (Last 12 Months)</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[rgba(103,159,131,0.2)]">
                <th className="text-left py-3 px-4 text-white/70 font-medium">Category</th>
                <th className="text-right py-3 px-4 text-white/70 font-medium">Amount</th>
                <th className="text-right py-3 px-4 text-white/70 font-medium">% of Revenue</th>
              </tr>
            </thead>
            <tbody className="text-white">
              <tr className="border-b border-[rgba(103,159,131,0.1)]">
                <td className="py-3 px-4">Revenue</td>
                <td className="text-right py-3 px-4 font-bold">$294,000</td>
                <td className="text-right py-3 px-4">100%</td>
              </tr>
              <tr className="border-b border-[rgba(103,159,131,0.1)]">
                <td className="py-3 px-4">COGS</td>
                <td className="text-right py-3 px-4 text-[#ef4444]">-$58,800</td>
                <td className="text-right py-3 px-4">20%</td>
              </tr>
              <tr className="border-b-2 border-[rgba(103,159,131,0.3)] font-bold">
                <td className="py-3 px-4">Gross Profit</td>
                <td className="text-right py-3 px-4 text-[#4ade80]">$235,200</td>
                <td className="text-right py-3 px-4">80%</td>
              </tr>
              <tr className="border-b border-[rgba(103,159,131,0.1)]">
                <td className="py-3 px-4">Marketing</td>
                <td className="text-right py-3 px-4 text-[#ef4444]">-$44,100</td>
                <td className="text-right py-3 px-4">15%</td>
              </tr>
              <tr className="border-b border-[rgba(103,159,131,0.1)]">
                <td className="py-3 px-4">Operations</td>
                <td className="text-right py-3 px-4 text-[#ef4444]">-$35,280</td>
                <td className="text-right py-3 px-4">12%</td>
              </tr>
              <tr className="border-b border-[rgba(103,159,131,0.1)]">
                <td className="py-3 px-4">Development</td>
                <td className="text-right py-3 px-4 text-[#ef4444]">-$29,400</td>
                <td className="text-right py-3 px-4">10%</td>
              </tr>
              <tr className="border-b-2 border-[rgba(103,159,131,0.3)] font-bold">
                <td className="py-3 px-4">Operating Profit</td>
                <td className="text-right py-3 px-4 text-[#4ade80]">$126,420</td>
                <td className="text-right py-3 px-4">43%</td>
              </tr>
              <tr className="bg-[rgba(74,222,128,0.1)]">
                <td className="py-4 px-4 font-bold text-lg">Net Margin</td>
                <td className="text-right py-4 px-4"></td>
                <td className="text-right py-4 px-4 font-bold text-lg text-[#4ade80]">43%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Monthly Burn Rate */}
      <div className="bg-[rgba(25,74,97,0.3)] backdrop-blur-[20px] border border-[rgba(103,159,131,0.2)] rounded-3xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Monthly Expenses & Cash Flow</h2>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={expensesData}>
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
            <Legend />
            <Bar dataKey="marketing" stackId="a" fill="#fb923c" name="Marketing" />
            <Bar dataKey="operations" stackId="a" fill="#60a5fa" name="Operations" />
            <Bar dataKey="development" stackId="a" fill="#679f83" name="Development" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Financial Projections */}
      <div className="bg-[rgba(25,74,97,0.3)] backdrop-blur-[20px] border border-[rgba(103,159,131,0.2)] rounded-3xl p-8">
        <h2 className="text-2xl font-bold text-white mb-2">12-Month Revenue Projection</h2>
        <p className="text-sm text-white/60 mb-6">Based on current growth trajectory</p>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={projectionsData}>
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
            <Legend />
            <Line
              type="monotone"
              dataKey="conservative"
              stroke="#679f83"
              strokeWidth={3}
              name="Conservative"
            />
            <Line
              type="monotone"
              dataKey="optimistic"
              stroke="#86b39c"
              strokeWidth={3}
              strokeDasharray="5 5"
              name="Optimistic"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FinancialsTab;
