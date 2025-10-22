import { useNavigate } from "react-router-dom";

const PortfolioEmptyState = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center py-20 px-5 bg-white rounded-xl border border-[rgba(103,159,131,0.15)]">
      <div className="text-6xl opacity-30 mb-6">📊</div>
      <h2 className="text-2xl font-bold text-[#194a61] mb-3">No Investments Yet</h2>
      <p className="text-base text-gray-600 mb-8 max-w-md mx-auto">
        Start building your portfolio by investing in validated ventures
      </p>
      <button
        onClick={() => navigate('/deals')}
        className="bg-gradient-to-r from-[#679f83] to-[#23698a] text-white px-8 py-3 rounded-lg font-medium text-sm inline-flex items-center gap-2 hover:shadow-lg hover:-translate-y-0.5 transition-all"
      >
        <span className="text-lg">🔍</span>
        Explore Investment Opportunities
      </button>
    </div>
  );
};

export default PortfolioEmptyState;
