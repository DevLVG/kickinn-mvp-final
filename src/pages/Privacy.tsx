import { Link } from 'react-router-dom';

const Privacy = () => {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0f2b38 0%, #194a61 50%, #0f2b38 100%)' }}>
      <div className="max-w-4xl mx-auto px-8 md:px-16 py-12">
        <Link to="/" className="block mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-wider cursor-pointer hover:opacity-90 transition-opacity" style={{ textShadow: '0 0 30px rgba(103, 159, 131, 0.5)' }}>
            KICK INN
          </h2>
        </Link>
        
        <div className="bg-white/5 backdrop-blur-md border border-secondary-teal/20 rounded-2xl p-8 md:p-12 shadow-[0_8px_32px_rgba(15,43,56,0.3)]">
          <h1 className="text-4xl font-bold text-white mb-6">Privacy Policy</h1>
          <div className="prose prose-invert max-w-none">
            <p className="text-white/70 mb-4">Last updated: {new Date().toLocaleDateString()}</p>
            <p className="text-white/80 mb-4">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </p>
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Information We Collect</h2>
            <p className="text-white/80 mb-4">
              We collect information you provide directly to us, including email addresses, profile information, and wallet addresses.
            </p>
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">How We Use Your Information</h2>
            <p className="text-white/80 mb-4">
              We use your information to provide and improve our services, communicate with you, and ensure platform security.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;