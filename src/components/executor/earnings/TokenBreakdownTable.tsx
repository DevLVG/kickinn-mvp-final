import { Link } from "react-router-dom";

interface VentureToken {
  venture_id: string;
  venture_name: string;
  venture_logo: string;
  venture_status: 'Building' | 'Funded' | 'Exited';
  token_symbol: string;
  total_allocated: number;
  vested: number;
  claimed: number;
  price_per_token: number;
  total_value_usd: number;
  vesting_progress: number;
}

const TokenBreakdownTable = () => {
  // Mock data
  const ventures: VentureToken[] = [
    {
      venture_id: '1',
      venture_name: 'ThreadCycle',
      venture_logo: '/placeholder.svg',
      venture_status: 'Building',
      token_symbol: 'FABR',
      total_allocated: 50000,
      vested: 25000,
      claimed: 15000,
      price_per_token: 0.25,
      total_value_usd: 6250,
      vesting_progress: 50
    },
    {
      venture_id: '2',
      venture_name: 'EcoTrack',
      venture_logo: '/placeholder.svg',
      venture_status: 'Funded',
      token_symbol: 'ECO',
      total_allocated: 75000,
      vested: 45000,
      claimed: 30000,
      price_per_token: 0.18,
      total_value_usd: 8100,
      vesting_progress: 60
    },
    {
      venture_id: '3',
      venture_name: 'HealthHub',
      venture_logo: '/placeholder.svg',
      venture_status: 'Building',
      token_symbol: 'HLTH',
      total_allocated: 40000,
      vested: 20000,
      claimed: 18000,
      price_per_token: 0.32,
      total_value_usd: 6400,
      vesting_progress: 50
    }
  ];

  const getStatusColor = (status: VentureToken['venture_status']) => {
    switch (status) {
      case 'Building': return 'text-[#f59e0b]';
      case 'Funded': return 'text-[#10b981]';
      case 'Exited': return 'text-[#3b82f6]';
    }
  };

  return (
    <div className="bg-card rounded-2xl p-8 shadow-md mb-8">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#194a61] mb-2">Token Breakdown by Venture</h2>
        <p className="text-sm text-muted-foreground">Your allocations across all ventures</p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[rgba(103,159,131,0.05)] border-b-2 border-[rgba(103,159,131,0.2)]">
              <th className="text-left p-4 text-[13px] font-medium text-[#194a61]">Venture</th>
              <th className="text-left p-4 text-[13px] font-medium text-[#194a61]">Token Symbol</th>
              <th className="text-left p-4 text-[13px] font-medium text-[#194a61]">Total Allocated</th>
              <th className="text-left p-4 text-[13px] font-medium text-[#194a61]">Vested</th>
              <th className="text-left p-4 text-[13px] font-medium text-[#194a61]">Claimed</th>
              <th className="text-left p-4 text-[13px] font-medium text-[#194a61]">USD Value</th>
              <th className="text-left p-4 text-[13px] font-medium text-[#194a61]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {ventures.map((venture) => {
              const claimable = venture.vested - venture.claimed;
              
              return (
                <tr
                  key={venture.venture_id}
                  className="border-b border-border hover:bg-[rgba(103,159,131,0.03)] transition-colors"
                >
                  {/* Venture */}
                  <td className="p-5">
                    <Link to={`/ventures/${venture.venture_id}`} className="flex items-center gap-3 group">
                      <img
                        src={venture.venture_logo}
                        alt={venture.venture_name}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-medium text-[15px] text-[#194a61] group-hover:text-[#679f83] transition-colors">
                          {venture.venture_name}
                        </p>
                        <p className={`text-xs ${getStatusColor(venture.venture_status)}`}>
                          {venture.venture_status}
                        </p>
                      </div>
                    </Link>
                  </td>

                  {/* Token Symbol */}
                  <td className="p-5">
                    <p className="font-bold text-sm text-[#679f83]">{venture.token_symbol}</p>
                  </td>

                  {/* Total Allocated */}
                  <td className="p-5">
                    <p className="font-medium text-[15px] text-[#194a61]">
                      {venture.total_allocated.toLocaleString()}
                    </p>
                  </td>

                  {/* Vested */}
                  <td className="p-5">
                    <p className="font-medium text-[15px] text-[#10b981] mb-1">
                      {venture.vested.toLocaleString()}
                    </p>
                    <div className="h-2 w-20 bg-[rgba(16,185,129,0.1)] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#10b981]"
                        style={{ width: `${venture.vesting_progress}%` }}
                      />
                    </div>
                  </td>

                  {/* Claimed */}
                  <td className="p-5">
                    <p className="font-medium text-[15px] text-[#3b82f6]">
                      {venture.claimed.toLocaleString()}
                    </p>
                  </td>

                  {/* USD Value */}
                  <td className="p-5">
                    <p className="font-bold text-base text-[#194a61]">
                      ${venture.total_value_usd.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      @ ${venture.price_per_token} per token
                    </p>
                  </td>

                  {/* Actions */}
                  <td className="p-5">
                    <div className="flex gap-2">
                      <Link
                        to={`/tokens/${venture.venture_id}`}
                        className="px-4 py-2 bg-[rgba(103,159,131,0.1)] text-[#679f83] rounded-lg text-xs font-medium hover:bg-[#679f83] hover:text-white transition-all"
                      >
                        View Details
                      </Link>
                      {claimable > 0 && (
                        <button className="px-4 py-2 bg-[#10b981] text-white rounded-lg text-xs font-medium hover:brightness-110 transition-all flex items-center gap-1">
                          <span>💰</span>
                          Claim
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TokenBreakdownTable;
