interface StatCardProps {
  number: string;
  label: string;
}

const StatCard = ({ number, label }: StatCardProps) => {
  return (
    <div className="text-center">
      <div className="font-bold text-3xl md:text-4xl lg:text-5xl mb-2 md:mb-3" style={{ color: '#679f83' }}>{number}</div>
      <div className="text-sm md:text-base text-white/80">{label}</div>
    </div>
  );
};

export default StatCard;
