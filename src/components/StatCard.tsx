interface StatCardProps {
  number: string;
  label: string;
}

const StatCard = ({ number, label }: StatCardProps) => {
  return (
    <div className="text-center">
      <div className="font-bold text-4xl md:text-5xl lg:text-6xl mb-2 md:mb-3" style={{ color: '#86efac' }}>{number}</div>
      <div className="text-xs md:text-sm text-slate-50">{label}</div>
      <div className="text-xs text-white/40 mt-1">*Platform data as of Dec 2024</div>
    </div>
  );
};

export default StatCard;
