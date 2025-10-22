interface StatCardProps {
  number: string;
  label: string;
}

const StatCard = ({ number, label }: StatCardProps) => {
  return (
    <div className="text-center">
      <div className="font-bold text-5xl text-secondary-teal mb-3">{number}</div>
      <div className="text-base text-white/70">{label}</div>
    </div>
  );
};

export default StatCard;
