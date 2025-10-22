interface TractionTabProps {
  traction: {
    users: number;
    mrr: number;
    growth_rate: number;
    live_months: number;
    chart_data: Array<{
      month: string;
      revenue: number;
      users: number;
    }>;
    milestones: Array<{
      title: string;
      description: string;
      date: string;
      completed: boolean;
    }>;
  };
}

const TractionTab = ({ traction }: TractionTabProps) => {
  const maxRevenue = Math.max(...traction.chart_data.map(d => d.revenue));
  const maxUsers = Math.max(...traction.chart_data.map(d => d.users));

  return (
    <div className="space-y-8">
      {/* Key Metrics */}
      <section>
        <h2 className="text-2xl font-bold text-primary-dark mb-4">Growth Metrics</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white border border-gray-200 rounded-xl p-5 text-center hover:shadow-md transition-shadow">
            <div className="text-3xl mb-3">👥</div>
            <p className="text-3xl font-bold text-primary-dark mb-1">
              {traction.users.toLocaleString()}
            </p>
            <p className="text-sm text-gray-600 mb-2">Active Users</p>
            <p className="text-xs text-green-600 font-medium">
              +{Math.floor(traction.growth_rate * 0.8)}% this month
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5 text-center hover:shadow-md transition-shadow">
            <div className="text-3xl mb-3">💵</div>
            <p className="text-3xl font-bold text-primary-dark mb-1">
              ${(traction.mrr / 1000).toFixed(1)}K
            </p>
            <p className="text-sm text-gray-600 mb-2">MRR</p>
            <p className="text-xs text-green-600 font-medium">
              +{traction.growth_rate}% MoM
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5 text-center hover:shadow-md transition-shadow">
            <div className="text-3xl mb-3">📈</div>
            <p className="text-3xl font-bold text-green-600 mb-1">
              +{traction.growth_rate}%
            </p>
            <p className="text-sm text-gray-600 mb-2">Month-over-Month</p>
            <p className="text-xs text-gray-500">Accelerating</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5 text-center hover:shadow-md transition-shadow">
            <div className="text-3xl mb-3">📅</div>
            <p className="text-3xl font-bold text-primary-dark mb-1">
              {traction.live_months} mo
            </p>
            <p className="text-sm text-gray-600 mb-2">Since Launch</p>
            <p className="text-xs text-gray-500">
              Launched {new Date().getMonth() - traction.live_months} months ago
            </p>
          </div>
        </div>
      </section>

      {/* Growth Chart */}
      <section>
        <h2 className="text-xl font-bold text-primary-dark mb-4">Revenue & User Growth</h2>
        
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
          <div className="flex justify-end gap-4 mb-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-gray-600">MRR</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-gray-600">Active Users</span>
            </div>
          </div>

          <div className="relative h-64">
            {/* Simple bar chart visualization */}
            <div className="flex items-end justify-around h-full gap-2">
              {traction.chart_data.map((data, index) => {
                const revenueHeight = (data.revenue / maxRevenue) * 100;
                const usersHeight = (data.users / maxUsers) * 100;
                
                return (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full flex justify-center gap-1" style={{ height: '200px', alignItems: 'flex-end' }}>
                      <div
                        className="w-1/3 bg-green-500 rounded-t transition-all hover:opacity-80"
                        style={{ height: `${revenueHeight}%` }}
                        title={`$${data.revenue}`}
                      />
                      <div
                        className="w-1/3 bg-blue-500 rounded-t transition-all hover:opacity-80"
                        style={{ height: `${usersHeight}%` }}
                        title={`${data.users} users`}
                      />
                    </div>
                    <p className="text-xs text-gray-600 font-medium">{data.month}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Milestones Timeline */}
      <section>
        <h2 className="text-xl font-bold text-primary-dark mb-4">Key Milestones Achieved</h2>
        
        <div className="relative pl-6 border-l-2 border-secondary-teal">
          {traction.milestones.map((milestone, index) => (
            <div key={index} className="relative pl-8 mb-6 last:mb-0">
              <div
                className="absolute left-[-9px] w-4 h-4 rounded-full border-3 border-white"
                style={{
                  backgroundColor: '#679f83',
                  boxShadow: '0 0 0 2px #679f83'
                }}
              />
              <p className="text-sm font-bold text-secondary-teal mb-1">{milestone.date}</p>
              <h3 className="text-base font-bold text-primary-dark mb-1">{milestone.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{milestone.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TractionTab;
