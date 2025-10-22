import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AIAssistantPanelProps {
  content: string;
  type: 'voice' | 'video' | 'text' | 'file';
}

const AIAssistantPanel = ({ content, type }: AIAssistantPanelProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [copiedHeadline, setCopiedHeadline] = useState<string | null>(null);
  
  // Mock AI suggestions - in production, fetch from AI
  const [suggestions, setSuggestions] = useState({
    summary: '',
    headlines: [] as string[],
    rephrases: [] as Array<{ original: string; improved: string }>
  });

  useEffect(() => {
    // Simulate AI processing
    setIsLoading(true);
    const timer = setTimeout(() => {
      // Mock suggestions based on content
      setSuggestions({
        summary: content.length > 200 
          ? "The textile industry generates significant fabric waste in small shops. A fabric-sharing network could reduce waste by connecting shops to exchange scraps. This would create new revenue streams and promote sustainability."
          : '',
        headlines: [
          "Fabric Waste Reduction Network",
          "Peer-to-Peer Textile Exchange Platform",
          "Zero-Waste Supply Chain for Tailors"
        ],
        rephrases: content.length > 100 ? [
          {
            original: "We throw away tons of fabric every week",
            improved: "The shop generates approximately X kg of fabric waste weekly"
          }
        ] : []
      });
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [content]);

  const copyHeadline = (headline: string) => {
    navigator.clipboard.writeText(headline);
    setCopiedHeadline(headline);
    toast({
      title: "Headline copied!",
      description: "Paste it in your submission",
    });
    setTimeout(() => setCopiedHeadline(null), 2000);
  };

  if (isLoading) {
    return (
      <div 
        className="rounded-2xl p-6 mb-6"
        style={{
          background: 'linear-gradient(to bottom right, rgba(103, 159, 131, 0.1), rgba(35, 105, 138, 0.1))',
          border: '1px solid rgba(103, 159, 131, 0.3)'
        }}
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🤖</span>
          <div>
            <h3 className="text-lg font-bold text-primary-dark">AI Assistant</h3>
            <p className="text-xs text-gray-600">Real-time suggestions to improve your submission</p>
          </div>
        </div>

        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div 
              key={i}
              className="h-4 bg-gray-200 rounded animate-pulse"
              style={{ width: `${90 - i * 10}%` }}
            />
          ))}
        </div>
      </div>
    );
  }

  // No suggestions state
  if (!suggestions.summary && suggestions.headlines.length === 0 && suggestions.rephrases.length === 0) {
    return (
      <div 
        className="rounded-2xl p-6 mb-6"
        style={{
          background: 'linear-gradient(to bottom right, rgba(103, 159, 131, 0.1), rgba(35, 105, 138, 0.1))',
          border: '1px solid rgba(103, 159, 131, 0.3)'
        }}
      >
        <div className="flex flex-col items-center text-center py-6">
          <span className="text-5xl mb-3">✓</span>
          <p className="text-base text-gray-600 mb-1">Your submission looks great!</p>
          <p className="text-sm text-gray-500">Clear problem statement with good detail</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="rounded-2xl p-6 mb-6"
      style={{
        background: 'linear-gradient(to bottom right, rgba(103, 159, 131, 0.1), rgba(35, 105, 138, 0.1))',
        border: '1px solid rgba(103, 159, 131, 0.3)'
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl">🤖</span>
        <div>
          <h3 className="text-lg font-bold text-primary-dark">AI Assistant</h3>
          <p className="text-xs text-gray-600">Real-time suggestions to improve your submission</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Summary Preview */}
        {suggestions.summary && (
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Auto-Summary</p>
            <div 
              className="rounded-lg p-4"
              style={{ background: 'rgba(255, 255, 255, 0.5)' }}
            >
              <p className="text-sm text-gray-700 leading-relaxed mb-3">
                {suggestions.summary}
              </p>
              <Button
                size="sm"
                variant="outline"
                className="border-secondary-teal text-secondary-teal hover:bg-secondary-teal/10"
              >
                Use This Summary
              </Button>
            </div>
          </div>
        )}

        {/* Headline Suggestions */}
        {suggestions.headlines.length > 0 && (
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Suggested Headlines</p>
            <div className="flex flex-wrap gap-2">
              {suggestions.headlines.map((headline, index) => (
                <button
                  key={index}
                  onClick={() => copyHeadline(headline)}
                  className="group flex items-center gap-2 px-4 py-2 bg-white rounded-full transition-all hover:bg-secondary-teal/10"
                  style={{ 
                    border: '1px solid rgba(103, 159, 131, 0.3)',
                  }}
                >
                  <span className="text-xs font-medium text-primary-dark">
                    {headline}
                  </span>
                  {copiedHeadline === headline ? (
                    <Check className="w-3 h-3 text-green-600" />
                  ) : (
                    <Copy className="w-3 h-3 text-secondary-teal opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Rephrase Options */}
        {suggestions.rephrases.length > 0 && (
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Suggested Improvements</p>
            <div className="space-y-3">
              {suggestions.rephrases.map((rephrase, index) => (
                <div key={index} className="flex items-center gap-3">
                  {/* Original */}
                  <div className="flex-1 rounded-lg p-3" style={{ background: 'rgba(239, 68, 68, 0.1)', borderLeft: '3px solid #ef4444' }}>
                    <p className="text-xs text-gray-500 mb-1">Original</p>
                    <p className="text-xs text-gray-700">{rephrase.original}</p>
                  </div>

                  {/* Arrow */}
                  <span className="text-secondary-teal">→</span>

                  {/* Improved */}
                  <div className="flex-1 rounded-lg p-3" style={{ background: 'rgba(16, 185, 129, 0.1)', borderLeft: '3px solid #10b981' }}>
                    <p className="text-xs text-gray-500 mb-1">Improved</p>
                    <p className="text-xs text-gray-700">{rephrase.improved}</p>
                  </div>

                  {/* Apply Button */}
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-secondary-teal to-accent-blue text-white"
                  >
                    Apply
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIAssistantPanel;
