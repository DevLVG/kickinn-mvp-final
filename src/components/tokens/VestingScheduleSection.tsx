import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Area, AreaChart } from 'recharts';

interface VestingScheduleSectionProps {
  tokens: any;
  symbol: string;
}

const VestingScheduleSection = ({ tokens, symbol }: VestingScheduleSectionProps) => {
  const daysSinceStart = Math.floor(
    (Date.now() - new Date(tokens.vesting_start_date).getTime()) / (1000 * 60 * 60 * 24)
  );

  const monthsSinceStart = Math.floor(daysSinceStart / 30);
  const remainingDays = daysSinceStart % 30;
  const daysUntilComplete = 365 - daysSinceStart;
  const monthsUntilComplete = Math.floor(daysUntilComplete / 30);
  const daysRemaining = daysUntilComplete % 30;

  // Generate vesting chart data
  const chartData = [];
  for (let day = 0; day <= 365; day += 15) {
    const vested = Math.min((tokens.total_allocated / 365) * day, tokens.total_allocated);
    chartData.push({
      day,
      vested: Math.round(vested),
      month: Math.round(day / 30)
    });
  }

  // Milestone dates
  const milestones = [
    { 
      months: 3, 
      percentage: 25, 
      tokens: Math.round(tokens.total_allocated * 0.25),
      date: new Date(new Date(tokens.vesting_start_date).getTime() + 90 * 24 * 60 * 60 * 1000),
      passed: daysSinceStart >= 90
    },
    { 
      months: 6, 
      percentage: 50, 
      tokens: Math.round(tokens.total_allocated * 0.5),
      date: new Date(new Date(tokens.vesting_start_date).getTime() + 180 * 24 * 60 * 60 * 1000),
      passed: daysSinceStart >= 180
    },
    { 
      months: 9, 
      percentage: 75, 
      tokens: Math.round(tokens.total_allocated * 0.75),
      date: new Date(new Date(tokens.vesting_start_date).getTime() + 270 * 24 * 60 * 60 * 1000),
      passed: daysSinceStart >= 270
    },
    { 
      months: 12, 
      percentage: 100, 
      tokens: tokens.total_allocated,
      date: new Date(new Date(tokens.vesting_start_date).getTime() + 365 * 24 * 60 * 60 * 1000),
      passed: daysSinceStart >= 365
    }
  ];

  return (
    <div className="bg-card rounded-xl p-6 md:p-8 border border-border mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Vesting Schedule</h2>
          <p className="text-sm text-muted-foreground mt-1">Linear vesting over 12 months</p>
        </div>
        <span className="text-3xl opacity-30">🔒</span>
      </div>

      {/* Progress Summary */}
      <div className="bg-[rgba(139,92,246,0.05)] p-5 rounded-lg mb-6">
        <div className="space-y-2">
          <p className="text-sm text-foreground/80">
            Time since vesting started: <span className="font-bold">{monthsSinceStart} months, {remainingDays} days</span>
          </p>
          <p className="text-base font-bold text-primary flex items-center gap-2">
            <span>📈</span>
            {tokens.daily_unlock_rate.toLocaleString()} tokens unlock daily
          </p>
          <p className="text-sm text-muted-foreground">
            Fully vested in: <span className="font-medium">{monthsUntilComplete} months, {daysRemaining} days</span>
          </p>
        </div>
      </div>

      {/* Vesting Chart */}
      <div className="mb-6">
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="vestedGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="month" 
              label={{ value: 'Months', position: 'insideBottom', offset: -5 }}
              stroke="hsl(var(--muted-foreground))"
            />
            <YAxis 
              label={{ value: 'Tokens', angle: -90, position: 'insideLeft' }}
              stroke="hsl(var(--muted-foreground))"
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }}
              formatter={(value: number) => [`${value.toLocaleString()} ${symbol}`, 'Vested']}
            />
            <Area 
              type="monotone" 
              dataKey="vested" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              fill="url(#vestedGradient)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Unlock Calendar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {milestones.map((milestone) => (
          <div
            key={milestone.months}
            className={`p-4 rounded-lg text-center ${
              milestone.passed 
                ? 'bg-[rgba(16,185,129,0.05)] border-2 border-[hsl(var(--success))]' 
                : 'bg-primary/5 border border-primary/20'
            }`}
          >
            <p className="text-sm font-bold text-foreground/70 mb-1">{milestone.months} Months</p>
            <p className="text-lg font-bold text-primary mb-1">
              {milestone.tokens.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground mb-2">
              {milestone.date.toLocaleDateString()}
            </p>
            <p className={`text-xs font-bold ${milestone.passed ? 'text-[hsl(var(--success))]' : 'text-[#8b5cf6]'}`}>
              {milestone.passed ? '✓ Unlocked' : '⏳ Pending'}
            </p>
          </div>
        ))}
      </div>

      {/* Next Unlock */}
      <div className="bg-gradient-to-r from-[rgba(139,92,246,0.1)] to-[rgba(109,40,217,0.1)] border-2 border-[#8b5cf6] p-5 rounded-lg">
        <div className="flex items-start gap-3">
          <span className="text-2xl">⏰</span>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-foreground mb-2">Next Unlock</h3>
            <p className="text-3xl font-bold text-[#8b5cf6] mb-2">
              Tomorrow
            </p>
            <p className="text-base text-foreground/70">
              {tokens.daily_unlock_rate.toLocaleString()} tokens will unlock
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VestingScheduleSection;
