const AIStructuredPitch = () => {
  return (
    <div className="bg-gradient-to-br from-secondary-teal/5 to-accent-blue/5 border border-secondary-teal/20 rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">🤖</span>
        <div>
          <h2 className="text-xl font-bold text-primary-dark">AI-Structured Pitch</h2>
          <p className="text-xs text-gray-600 italic">Automatically generated from your submission</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Problem Statement */}
        <div>
          <h3 className="font-bold text-base text-primary-dark mb-3">Problem Statement</h3>
          <div className="bg-white border-l-4 border-secondary-teal rounded-lg p-4">
            <p className="text-sm text-gray-800 leading-relaxed">
              Small textile shops generate approximately 15-25kg of fabric waste weekly. Current disposal methods 
              are costly and environmentally harmful. There is no local network for sharing or exchanging fabric 
              scraps among shops, leading to lost revenue opportunities and environmental impact.
            </p>
          </div>
        </div>

        {/* Target Market */}
        <div>
          <h3 className="font-bold text-base text-primary-dark mb-3">Target Market</h3>
          <div className="bg-white rounded-lg p-4">
            <p className="text-sm text-gray-700 mb-3">
              Small to medium textile shops, tailoring businesses, and fashion workshops in urban areas
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-secondary-teal/10 text-secondary-teal px-3 py-1 rounded-full text-xs font-medium">
                Textile Industry
              </span>
              <span className="bg-secondary-teal/10 text-secondary-teal px-3 py-1 rounded-full text-xs font-medium">
                Small Businesses
              </span>
              <span className="bg-secondary-teal/10 text-secondary-teal px-3 py-1 rounded-full text-xs font-medium">
                UAE Region
              </span>
              <span className="bg-secondary-teal/10 text-secondary-teal px-3 py-1 rounded-full text-xs font-medium">
                Sustainability
              </span>
            </div>
          </div>
        </div>

        {/* Problem Scope */}
        <div>
          <h3 className="font-bold text-base text-primary-dark mb-3">Problem Scope</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">🌍</div>
              <div className="text-xs text-gray-500 uppercase mb-1">Geography</div>
              <div className="font-bold text-sm text-primary-dark">Urban - UAE</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">📅</div>
              <div className="text-xs text-gray-500 uppercase mb-1">Frequency</div>
              <div className="font-bold text-sm text-primary-dark">Daily</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">🔄</div>
              <div className="text-xs text-gray-500 uppercase mb-1">Impact</div>
              <div className="font-bold text-sm text-primary-dark">Systemic</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIStructuredPitch;
