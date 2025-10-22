interface TokenomicsTabProps {
  tokenomics: {
    total_supply: number;
    price_per_token: number;
    allocations: {
      ideator: number;
      executors: number;
      investors: number;
      liquidity: number;
      protocol: number;
    };
    min_investment: number;
    max_investment: number;
    use_of_funds: Array<{
      category: string;
      percentage: number;
      amount: number;
      description: string;
      breakdown: string[];
    }>;
  };
  target: number;
}

const TokenomicsTab = ({ tokenomics, target }: TokenomicsTabProps) => {
  const allocationColors = {
    ideator: '#679f83',
    executors: '#23698a',
    investors: '#3b82f6',
    liquidity: '#10b981',
    protocol: '#f59e0b'
  };

  return (
    <div className="space-y-8">
      {/* Token Allocation */}
      <section>
        <h2 className="text-2xl font-bold text-primary-dark mb-4">Token Distribution</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Pie Chart Visual */}
          <div className="bg-white border border-gray-200 p-6 rounded-xl">
            <div className="w-full aspect-square max-w-xs mx-auto relative">
              {/* Simple pie chart representation */}
              <div className="w-full h-full rounded-full overflow-hidden flex"
                style={{
                  background: `conic-gradient(
                    ${allocationColors.ideator} 0% ${tokenomics.allocations.ideator}%,
                    ${allocationColors.executors} ${tokenomics.allocations.ideator}% ${tokenomics.allocations.ideator + tokenomics.allocations.executors}%,
                    ${allocationColors.investors} ${tokenomics.allocations.ideator + tokenomics.allocations.executors}% ${tokenomics.allocations.ideator + tokenomics.allocations.executors + tokenomics.allocations.investors}%,
                    ${allocationColors.liquidity} ${tokenomics.allocations.ideator + tokenomics.allocations.executors + tokenomics.allocations.investors}% ${tokenomics.allocations.ideator + tokenomics.allocations.executors + tokenomics.allocations.investors + tokenomics.allocations.liquidity}%,
                    ${allocationColors.protocol} ${tokenomics.allocations.ideator + tokenomics.allocations.executors + tokenomics.allocations.investors + tokenomics.allocations.liquidity}% 100%
                  )`
                }}
              />
            </div>

            {/* Legend */}
            <div className="mt-6 space-y-2">
              {Object.entries(tokenomics.allocations).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: allocationColors[key as keyof typeof allocationColors] }}
                    />
                    <span className="text-sm text-gray-700 capitalize">{key}</span>
                  </div>
                  <span className="text-sm font-bold text-gray-900">{value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Distribution Table */}
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left text-xs font-bold text-primary-dark p-3">Stakeholder</th>
                  <th className="text-left text-xs font-bold text-primary-dark p-3">Allocation</th>
                  <th className="text-left text-xs font-bold text-primary-dark p-3">Tokens</th>
                  <th className="text-left text-xs font-bold text-primary-dark p-3">Vesting</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-3 text-sm text-gray-700">Ideator</td>
                  <td className="p-3 text-sm text-gray-700">{tokenomics.allocations.ideator}%</td>
                  <td className="p-3 text-sm text-gray-700">{(tokenomics.total_supply * tokenomics.allocations.ideator / 100).toLocaleString()}</td>
                  <td className="p-3"><span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">No vesting</span></td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 text-sm text-gray-700">Executors</td>
                  <td className="p-3 text-sm text-gray-700">{tokenomics.allocations.executors}%</td>
                  <td className="p-3 text-sm text-gray-700">{(tokenomics.total_supply * tokenomics.allocations.executors / 100).toLocaleString()}</td>
                  <td className="p-3 text-xs text-gray-600">12 months linear</td>
                </tr>
                <tr className="border-b bg-secondary-teal/5">
                  <td className="p-3 text-sm font-bold text-gray-900">Investors (You)</td>
                  <td className="p-3 text-sm font-bold text-gray-900">{tokenomics.allocations.investors}%</td>
                  <td className="p-3 text-sm font-bold text-gray-900">{(tokenomics.total_supply * tokenomics.allocations.investors / 100).toLocaleString()}</td>
                  <td className="p-3"><span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">No vesting</span></td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 text-sm text-gray-700">DEX Liquidity</td>
                  <td className="p-3 text-sm text-gray-700">{tokenomics.allocations.liquidity}%</td>
                  <td className="p-3 text-sm text-gray-700">{(tokenomics.total_supply * tokenomics.allocations.liquidity / 100).toLocaleString()}</td>
                  <td className="p-3 text-xs text-gray-600">Locked until listing</td>
                </tr>
                <tr>
                  <td className="p-3 text-sm text-gray-700">Protocol</td>
                  <td className="p-3 text-sm text-gray-700">{tokenomics.allocations.protocol}%</td>
                  <td className="p-3 text-sm text-gray-700">{(tokenomics.total_supply * tokenomics.allocations.protocol / 100).toLocaleString()}</td>
                  <td className="p-3 text-xs text-gray-600">24 months linear</td>
                </tr>
                <tr className="bg-gray-100 font-bold">
                  <td className="p-3 text-sm text-gray-900">Total</td>
                  <td className="p-3 text-sm text-gray-900">100%</td>
                  <td className="p-3 text-sm text-gray-900">{tokenomics.total_supply.toLocaleString()} tokens</td>
                  <td className="p-3"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Token Economics */}
      <section>
        <h2 className="text-xl font-bold text-primary-dark mb-4">Token Economics</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-accent-blue/10 border border-accent-blue p-5 rounded-xl text-center">
            <div className="text-3xl mb-3">🪙</div>
            <p className="text-sm text-gray-600 mb-1">Token Price</p>
            <p className="text-3xl font-bold text-accent-blue mb-1">
              ${tokenomics.price_per_token.toFixed(2)}
            </p>
            <p className="text-xs text-gray-500">at funding</p>
          </div>

          <div className="bg-gray-50 border border-gray-200 p-5 rounded-xl text-center">
            <div className="text-3xl mb-3">📊</div>
            <p className="text-sm text-gray-600 mb-1">Total Supply</p>
            <p className="text-3xl font-bold text-primary-dark mb-1">
              {(tokenomics.total_supply / 1000000).toFixed(1)}M
            </p>
            <p className="text-xs text-gray-500">fixed supply</p>
          </div>

          <div className="bg-gray-50 border border-gray-200 p-5 rounded-xl text-center">
            <div className="text-3xl mb-3">💰</div>
            <p className="text-sm text-gray-600 mb-1">Target Raise</p>
            <p className="text-3xl font-bold text-primary-dark mb-1">
              ${(target / 1000).toFixed(0)}K
            </p>
            <p className="text-xs text-gray-500">USDT</p>
          </div>
        </div>

        {/* Investment Limits */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="bg-white border border-gray-200 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Minimum Investment</p>
            <p className="text-xl font-bold text-primary-dark">
              ${tokenomics.min_investment.toLocaleString()} USDT
            </p>
            <p className="text-sm text-gray-500 mt-1">
              = {Math.floor(tokenomics.min_investment / tokenomics.price_per_token).toLocaleString()} tokens
            </p>
          </div>

          <div className="bg-white border border-gray-200 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Maximum Investment</p>
            <p className="text-xl font-bold text-primary-dark">
              ${tokenomics.max_investment.toLocaleString()} USDT
            </p>
            <p className="text-sm text-gray-500 mt-1">
              = {Math.floor(tokenomics.max_investment / tokenomics.price_per_token).toLocaleString()} tokens
            </p>
          </div>
        </div>
      </section>

      {/* Use of Funds */}
      <section>
        <h2 className="text-xl font-bold text-primary-dark mb-4">Fund Allocation</h2>
        
        <div className="space-y-3">
          {tokenomics.use_of_funds.map((fund, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium text-sm text-primary-dark">{fund.category}</p>
                <p className="text-sm text-gray-600">${(fund.amount / 1000).toFixed(0)}K</p>
              </div>
              <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${fund.percentage}%`,
                    backgroundColor: index === 0 ? '#679f83' : index === 1 ? '#23698a' : index === 2 ? '#3b82f6' : '#10b981'
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Breakdown */}
        <div className="mt-6 space-y-4">
          {tokenomics.use_of_funds.map((fund, index) => (
            <div key={index} className="bg-gray-50 p-5 rounded-xl">
              <h3 className="font-bold text-base text-primary-dark mb-2">{fund.category}</h3>
              <p className="text-sm text-gray-600 mb-3">{fund.description}</p>
              <ul className="space-y-2">
                {fund.breakdown.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-secondary-teal mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TokenomicsTab;
