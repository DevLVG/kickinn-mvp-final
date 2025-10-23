import { FileText, Download, Eye, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LegalTabProps {
  venture: any;
  userKYCStatus: string;
}

const LegalTab = ({ venture, userKYCStatus }: LegalTabProps) => {
  const documents = [
    {
      name: "Token Purchase Agreement",
      pages: 24,
      lastUpdated: "2 weeks ago",
      verified: true,
      type: "restricted"
    },
    {
      name: "Operating Agreement",
      pages: 18,
      lastUpdated: "1 month ago",
      verified: true,
      type: "restricted"
    },
    {
      name: "IP Assignment Agreement",
      pages: 8,
      lastUpdated: "3 weeks ago",
      verified: true,
      type: "restricted"
    },
    {
      name: "User Terms of Service",
      pages: 12,
      lastUpdated: "Current version",
      verified: true,
      type: "public"
    },
    {
      name: "Privacy Policy",
      pages: 10,
      lastUpdated: "Current version",
      verified: true,
      type: "public"
    },
    {
      name: "Trademark Registration",
      pages: 4,
      lastUpdated: "Approved",
      verified: true,
      type: "public"
    },
    {
      name: "Employment Contracts (Anonymized)",
      pages: 16,
      lastUpdated: "Template versions",
      verified: true,
      type: "restricted"
    },
    {
      name: "Vendor Agreements",
      pages: 22,
      lastUpdated: "Active contracts",
      verified: true,
      type: "restricted"
    }
  ];

  const compliance = [
    { item: "GDPR compliant (EU)", status: true },
    { item: "CCPA compliant (California)", status: true },
    { item: "SOC 2 Type II certified", status: true },
    { item: "Terms of Service reviewed", status: true },
    { item: "Data processing agreements", status: true },
    { item: "Cookie consent implemented", status: true },
    { item: "PCI DSS (using Stripe)", status: false, note: "In progress" }
  ];

  const liabilities = [
    "Outstanding invoices: $2,400 (AWS, due in 15 days)",
    "Contractor payments: $8,500 (monthly)",
    "No pending litigation",
    "No regulatory warnings",
    "No outstanding tax liabilities"
  ];

  const handleView = (doc: any) => {
    if (userKYCStatus !== 'verified' && doc.type === 'restricted') {
      alert("Complete KYC to access this document");
    } else {
      console.log("Viewing document:", doc.name);
    }
  };

  const handleDownload = (doc: any) => {
    if (userKYCStatus !== 'verified' && doc.type === 'restricted') {
      alert("Complete KYC to download this document");
    } else {
      console.log("Downloading document:", doc.name);
    }
  };

  return (
    <div className="space-y-8">
      {/* Legal Documents */}
      <div className="bg-[rgba(25,74,97,0.3)] backdrop-blur-[20px] border border-[rgba(103,159,131,0.2)] rounded-3xl p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Legal Documentation</h2>
          <div className="flex items-center gap-2 text-sm text-[#60a5fa]">
            <CheckCircle className="w-4 h-4" />
            <span>Verified by Kick Inn legal team</span>
          </div>
        </div>
        
        <div className="space-y-4">
          {documents.map((doc, index) => (
            <div
              key={index}
              className="bg-[rgba(103,159,131,0.05)] border border-[rgba(103,159,131,0.2)] rounded-xl p-6 hover:bg-[rgba(103,159,131,0.1)] transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <FileText className="w-6 h-6 text-[#679f83] flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                      {doc.name}
                      {doc.verified && (
                        <CheckCircle className="w-4 h-4 text-[#4ade80]" />
                      )}
                      {doc.type === 'restricted' && userKYCStatus !== 'verified' && (
                        <span className="text-xs bg-[rgba(251,146,60,0.2)] text-[#fb923c] px-2 py-1 rounded">
                          KYC Required
                        </span>
                      )}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-sm text-white/60">
                      <span>{doc.pages} pages</span>
                      <span>•</span>
                      <span>Last updated: {doc.lastUpdated}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => handleView(doc)}
                    variant="outline"
                    size="sm"
                    className="bg-[rgba(103,159,131,0.2)] border-[rgba(103,159,131,0.4)] text-[#86b39c] hover:bg-[rgba(103,159,131,0.3)]"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </Button>
                  <Button
                    onClick={() => handleDownload(doc)}
                    variant="outline"
                    size="sm"
                    className="bg-[rgba(103,159,131,0.2)] border-[rgba(103,159,131,0.4)] text-[#86b39c] hover:bg-[rgba(103,159,131,0.3)]"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Compliance Status */}
      <div className="bg-[rgba(25,74,97,0.3)] backdrop-blur-[20px] border border-[rgba(103,159,131,0.2)] rounded-3xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Regulatory Compliance</h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          {compliance.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 bg-[rgba(103,159,131,0.05)] border border-[rgba(103,159,131,0.2)] rounded-xl p-4"
            >
              {item.status ? (
                <CheckCircle className="w-5 h-5 text-[#4ade80] flex-shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-[#fb923c] flex-shrink-0" />
              )}
              <div>
                <p className="text-white">{item.item}</p>
                {item.note && (
                  <p className="text-sm text-[#fb923c]">{item.note}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Liabilities & Disclosures */}
      <div className="bg-[rgba(251,146,60,0.1)] border border-[rgba(251,146,60,0.3)] rounded-3xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Known Liabilities & Disclosures</h2>
        
        <div className="space-y-3">
          {liabilities.map((liability, index) => (
            <div key={index} className="flex items-start gap-3">
              <span className="text-[#fb923c] mt-1">•</span>
              <p className="text-white/90">{liability}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-[rgba(103,159,131,0.1)] border border-[rgba(103,159,131,0.2)] rounded-xl p-4">
          <p className="text-sm text-white/80">
            <strong>Note:</strong> All liabilities disclosed above are standard operating expenses. There are no hidden debts, pending legal actions, or regulatory violations. Full financial records available for verified buyers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LegalTab;
