import { Link } from 'react-router-dom';

const Terms = () => {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0f2b38 0%, #194a61 50%, #0f2b38 100%)' }}>
      <div className="max-w-4xl mx-auto px-8 md:px-16 py-12">
        <Link to="/" className="block mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-wider cursor-pointer hover:opacity-90 transition-opacity" style={{ textShadow: '0 0 30px rgba(103, 159, 131, 0.5)' }}>
            KICK INN
          </h2>
        </Link>
        
        <div className="bg-white/5 backdrop-blur-md border border-secondary-teal/20 rounded-2xl p-8 md:p-12 shadow-[0_8px_32px_rgba(15,43,56,0.3)]">
          <h1 className="text-4xl font-bold text-white mb-6">Terms of Service</h1>
          <div className="prose prose-invert max-w-none">
            <p className="text-white/70 mb-4">Last updated: {new Date().toLocaleDateString()}</p>
            <p className="text-white/80 mb-4">
              Welcome to Kick Inn. By using our platform, you agree to these terms.
            </p>
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Acceptance of Terms</h2>
            <p className="text-white/80 mb-4">
              By accessing and using Kick Inn, you accept and agree to be bound by the terms and provision of this agreement.
            </p>
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Use License</h2>
            <p className="text-white/80 mb-4">
              Permission is granted to temporarily use Kick Inn for personal, non-commercial transitory viewing only.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;