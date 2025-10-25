interface StatCardProps {
  number: string;
  label: string;
}

const StatCard = ({ number, label }: StatCardProps) => {
  return (
    <div className="text-center">
      <div className="font-bold text-5xl mb-3" style={{ color: '#679f83' }}>{number}</div>
      <div className="text-base text-white/80">{label}</div>
    </div>
  );
};

export default StatCard;
