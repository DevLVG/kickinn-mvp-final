import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface CapTableTabProps {
  venture: any;
}

const CapTableTab = ({ venture }: CapTableTabProps) => {
  const capTableData = [
    { name: 'Ideator', tokens: 100000, percent: 10, color: '#3b82f6' },
    { name: 'Executors', tokens: 350000, percent: 35, color: '#679f83' },
    { name: 'Investors', tokens: 250000, percent: 25, color: '#f59e0b' },
    { name: 'Protocol', tokens: 200000, percent: 20, color: '#8b5cf6' },
    { name: 'Liquidity Pool', tokens: 100000, percent: 10, color: '#60a5fa' }
  ];

  const executors = [
    { id: 'A', tokens: 150000, vested: 100 },
    { id: 'B', tokens: 100000, vested: 75 },
    { id: 'C', tokens: 70000, vested: 90 },
    { id: 'D', tokens: 30000, vested: 100 }
  ];

  return (
    <div className="space-y-8">
      {/* Token Distribution */}
      <div className="bg-[rgba(25,74,97,0.3)] backdrop-blur-[20px] border border-[rgba(103,159,131,0.2)] rounded-3xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Current Token Allocation</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={capTableData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}\n${percent}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="tokens"
              >
                {capTableData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
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
            {capTableData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-white">{item.name}</span>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold">{item.tokens.toLocaleString()} tokens</p>
                  <p className="text-sm text-white/60">{item.percent}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stakeholder Breakdown */}
      <div className="bg-[rgba(25,74,97,0.3)] backdrop-blur-[20px] border border-[rgba(103,159,131,0.2)] rounded-3xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Stakeholder Details</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[rgba(103,159,131,0.2)]">
                <th className="text-left py-3 px-4 text-white/70 font-medium">Role</th>
                <th className="text-center py-3 px-4 text-white/70 font-medium">Count</th>
                <th className="text-right py-3 px-4 text-white/70 font-medium">Total Tokens</th>
                <th className="text-right py-3 px-4 text-white/70 font-medium">%</th>
                <th className="text-right py-3 px-4 text-white/70 font-medium">Vesting Status</th>
              </tr>
            </thead>
            <tbody className="text-white">
              <tr className="border-b border-[rgba(103,159,131,0.1)]">
                <td className="py-3 px-4">Ideator</td>
                <td className="text-center py-3 px-4">1</td>
                <td className="text-right py-3 px-4 font-medium">100,000</td>
                <td className="text-right py-3 px-4">10%</td>
                <td className="text-right py-3 px-4 text-[#4ade80]">Fully vested</td>
              </tr>
              <tr className="border-b border-[rgba(103,159,131,0.1)]">
                <td className="py-3 px-4">Executors</td>
                <td className="text-center py-3 px-4">4</td>
                <td className="text-right py-3 px-4 font-medium">350,000</td>
                <td className="text-right py-3 px-4">35%</td>
                <td className="text-right py-3 px-4 text-[#fb923c]">Mixed</td>
              </tr>
              <tr className="border-b border-[rgba(103,159,131,0.1)]">
                <td className="py-3 px-4 pl-8 text-sm text-white/70">• Executor A</td>
                <td className="text-center py-3 px-4"></td>
                <td className="text-right py-3 px-4 text-sm">150,000</td>
                <td className="text-right py-3 px-4"></td>
                <td className="text-right py-3 px-4 text-sm text-[#4ade80]">100%</td>
              </tr>
              <tr className="border-b border-[rgba(103,159,131,0.1)]">
                <td className="py-3 px-4 pl-8 text-sm text-white/70">• Executor B</td>
                <td className="text-center py-3 px-4"></td>
                <td className="text-right py-3 px-4 text-sm">100,000</td>
                <td className="text-right py-3 px-4"></td>
                <td className="text-right py-3 px-4 text-sm text-[#fb923c]">75%</td>
              </tr>
              <tr className="border-b border-[rgba(103,159,131,0.1)]">
                <td className="py-3 px-4 pl-8 text-sm text-white/70">• Executor C</td>
                <td className="text-center py-3 px-4"></td>
                <td className="text-right py-3 px-4 text-sm">70,000</td>
                <td className="text-right py-3 px-4"></td>
                <td className="text-right py-3 px-4 text-sm text-[#4ade80]">90%</td>
              </tr>
              <tr className="border-b border-[rgba(103,159,131,0.1)]">
                <td className="py-3 px-4 pl-8 text-sm text-white/70">• Executor D</td>
                <td className="text-center py-3 px-4"></td>
                <td className="text-right py-3 px-4 text-sm">30,000</td>
                <td className="text-right py-3 px-4"></td>
                <td className="text-right py-3 px-4 text-sm text-[#4ade80]">100%</td>
              </tr>
              <tr className="border-b border-[rgba(103,159,131,0.1)]">
                <td className="py-3 px-4">Investors</td>
                <td className="text-center py-3 px-4">12</td>
                <td className="text-right py-3 px-4 font-medium">250,000</td>
                <td className="text-right py-3 px-4">25%</td>
                <td className="text-right py-3 px-4 text-[#4ade80]">Fully vested</td>
              </tr>
              <tr className="border-b border-[rgba(103,159,131,0.1)]">
                <td className="py-3 px-4">Protocol (Kick Inn)</td>
                <td className="text-center py-3 px-4">1</td>
                <td className="text-right py-3 px-4 font-medium">200,000</td>
                <td className="text-right py-3 px-4">20%</td>
                <td className="text-right py-3 px-4 text-[#8b5cf6]">Locked</td>
              </tr>
              <tr>
                <td className="py-3 px-4">Liquidity Pool</td>
                <td className="text-center py-3 px-4">-</td>
                <td className="text-right py-3 px-4 font-medium">100,000</td>
                <td className="text-right py-3 px-4">10%</td>
                <td className="text-right py-3 px-4 text-[#60a5fa]">DEX</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Buyer's Share Calculation */}
      <div className="bg-gradient-to-br from-[rgba(103,159,131,0.15)] to-[rgba(35,105,138,0.15)] border border-[rgba(103,159,131,0.3)] rounded-3xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Acquisition Structure</h2>
        
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-white/70 mb-2">Acquisition Price</p>
              <p className="text-4xl font-bold text-white">$1,850,000</p>
            </div>
            <div>
              <p className="text-sm text-white/70 mb-2">Tokens for Buyer</p>
              <p className="text-4xl font-bold text-[#679f83]">700,000 (70%)</p>
            </div>
          </div>

          <div className="bg-[rgba(103,159,131,0.1)] border border-[rgba(103,159,131,0.2)] rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-3">Acquisition Details</h3>
            <p className="text-white/80 leading-relaxed mb-4">
              Upon acquisition, the buyer receives 70% of the total token supply (700,000 tokens). The remaining 30% is distributed among original stakeholders who have fully vested tokens, providing continuity and alignment of interests.
            </p>
            <p className="text-white/80 leading-relaxed">
              Protocol tokens (20%) remain locked with Kick Inn to ensure platform stability. The liquidity pool (10%) continues to facilitate trading on STON.fi DEX.
            </p>
          </div>
        </div>
      </div>

      {/* Vesting Schedule Visualization */}
      <div className="bg-[rgba(25,74,97,0.3)] backdrop-blur-[20px] border border-[rgba(103,159,131,0.2)] rounded-3xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Executor Vesting Timeline</h2>
        
        <div className="space-y-4">
          {executors.map((exec) => (
            <div key={exec.id}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium">
                  Executor {exec.id} ({exec.tokens.toLocaleString()} tokens)
                </span>
                <span className="text-[#679f83] font-bold">{exec.vested}% vested</span>
              </div>
              <div className="h-3 bg-[rgba(139,92,246,0.2)] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#4ade80] to-[#22c55e] rounded-full transition-all"
                  style={{ width: `${exec.vested}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <p className="text-sm text-white/60 mt-6">
          All executor tokens follow a 12-month linear vesting schedule. Current average vesting: 91.25%
        </p>
      </div>
    </div>
  );
};

export default CapTableTab;
