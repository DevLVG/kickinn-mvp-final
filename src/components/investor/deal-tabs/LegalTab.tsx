interface LegalTabProps {
  legal: {
    smart_contract_address: string;
    token_agreement_url: string;
    audit_status: 'completed' | 'pending' | 'none';
    audit_date?: string;
    audit_report_url?: string;
  };
}

const LegalTab = ({ legal }: LegalTabProps) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Could add a toast notification here
  };

  return (
    <div className="space-y-8">
      {/* Smart Contract */}
      <section>
        <h2 className="text-2xl font-bold text-primary-dark mb-4">Smart Contract Details</h2>
        
        <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
          {/* Network Badge */}
          <div className="inline-flex items-center gap-2 bg-accent-blue/10 text-accent-blue px-4 py-2 rounded-full text-sm font-medium mb-4">
            <span>⛓️</span>
            <span>TON Blockchain</span>
          </div>

          {/* Contract Address */}
          <div className="mb-6">
            <p className="font-medium text-sm text-gray-600 mb-2">Contract Address</p>
            <div className="bg-gray-50 border border-gray-200 p-3 rounded-lg flex items-center justify-between">
              <code className="text-sm text-primary-dark font-mono">
                {legal.smart_contract_address}
              </code>
              <button
                onClick={() => copyToClipboard(legal.smart_contract_address)}
                className="text-lg hover:text-secondary-teal transition-colors"
                title="Copy address"
              >
                📋
              </button>
            </div>
          </div>

          {/* Explorer Link */}
          <a
            href={`https://tonscan.org/address/${legal.smart_contract_address}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-accent-blue hover:underline"
          >
            <span>🔗</span>
            <span>View on TONScan</span>
          </a>

          {/* Audit Status */}
          {legal.audit_status === 'completed' && (
            <div className="mt-6 bg-green-50 border border-green-500 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">✅</span>
                <h3 className="font-bold text-base text-green-900">Security Audit Completed</h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Audited on {legal.audit_date}
              </p>
              {legal.audit_report_url && (
                <a
                  href={legal.audit_report_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-green-600 hover:underline"
                >
                  View Audit Report →
                </a>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Token Agreement */}
      <section>
        <h2 className="text-xl font-bold text-primary-dark mb-4">Token Agreement</h2>
        
        <div className="bg-white border border-gray-200 p-5 rounded-xl">
          <div className="flex items-start gap-4 mb-4">
            <span className="text-4xl">📄</span>
            <div className="flex-1">
              <h3 className="font-bold text-lg text-primary-dark mb-2">
                Investor Token Agreement
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Legal terms governing token ownership and rights
              </p>

              <div className="flex gap-3">
                <a
                  href={legal.token_agreement_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border-2 border-secondary-teal text-secondary-teal font-medium text-sm hover:bg-secondary-teal hover:text-white transition-colors"
                >
                  <span>👁️</span>
                  <span>View Agreement</span>
                </a>
                <a
                  href={legal.token_agreement_url}
                  download
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-secondary-teal to-accent-blue text-white font-medium text-sm hover:shadow-lg transition-shadow"
                >
                  <span>⬇️</span>
                  <span>Download PDF</span>
                </a>
              </div>
            </div>
          </div>

          {/* Key Terms */}
          <div className="bg-gray-50 p-5 rounded-lg mt-4">
            <h4 className="font-bold text-sm text-primary-dark mb-3">Key Terms:</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>Immediate token allocation upon funding completion</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>No lock-up period or vesting for investors</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>Proportional exit proceeds distribution</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>Refund mechanism if funding threshold not met</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>Transferable on secondary markets post-funding</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Risk Disclosure */}
      <section>
        <h2 className="text-xl font-bold text-primary-dark mb-4">Risk Disclosure</h2>
        
        {/* Warning Banner */}
        <div className="bg-red-50 border-2 border-red-500 p-5 rounded-xl mb-4">
          <div className="flex items-start gap-3 mb-2">
            <span className="text-2xl">⚠️</span>
            <div>
              <h3 className="font-bold text-lg text-red-900 mb-2">Investment Risk Warning</h3>
              <p className="text-sm text-red-900 leading-relaxed">
                Investing in early-stage ventures carries significant risk. You may lose your entire investment. Only invest what you can afford to lose.
              </p>
            </div>
          </div>
        </div>

        {/* Risks List */}
        <div className="space-y-3">
          {[
            {
              title: 'Market Risk',
              description: 'Token value may fluctuate significantly based on market conditions and venture performance.'
            },
            {
              title: 'Execution Risk',
              description: 'Venture may fail to achieve growth targets or market traction despite MVP validation.'
            },
            {
              title: 'Liquidity Risk',
              description: 'Limited trading volume may make it difficult to sell tokens at desired prices.'
            },
            {
              title: 'Regulatory Risk',
              description: 'Regulatory changes may affect token tradability or venture operations.'
            },
            {
              title: 'Technology Risk',
              description: 'Smart contract bugs or blockchain issues may affect token functionality.'
            }
          ].map((risk, index) => (
            <div key={index} className="bg-white border border-red-200 p-4 rounded-lg">
              <h4 className="font-bold text-base text-primary-dark mb-2">{risk.title}</h4>
              <p className="text-sm text-gray-600 leading-relaxed">{risk.description}</p>
            </div>
          ))}
        </div>

        {/* Acknowledgment */}
        <div className="bg-gray-50 p-4 rounded-lg mt-6 flex items-start gap-3">
          <span className="text-lg">ℹ️</span>
          <p className="text-sm text-primary-dark">
            By investing, you acknowledge that you have read and understood these risks.
          </p>
        </div>
      </section>
    </div>
  );
};

export default LegalTab;
