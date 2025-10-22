import { useNavigate } from 'react-router-dom';

const KYCBanner = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-amber-500 rounded-xl p-5 mb-8 flex items-center gap-4">
      <span className="text-3xl">⚠️</span>
      <div className="flex-1">
        <h3 className="text-base font-bold text-amber-900 mb-1">
          Complete KYC to Start Investing
        </h3>
        <p className="text-sm text-amber-900/70">
          Verification required to invest in ventures
        </p>
      </div>
      <button
        onClick={() => navigate('/investor/settings/kyc')}
        className="bg-amber-500 text-white px-6 py-2.5 rounded-lg font-medium text-sm hover:bg-amber-600 transition-colors"
      >
        Start KYC
      </button>
    </div>
  );
};

export default KYCBanner;
