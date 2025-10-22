import { Idea } from '@/pages/Ideas';

interface OriginalSubmissionProps {
  idea: Idea;
}

const OriginalSubmission = ({ idea }: OriginalSubmissionProps) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'voice': return '🎤';
      case 'video': return '📹';
      case 'text': return '📝';
      case 'file': return '📎';
      default: return '📝';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'voice': return 'Voice Recording';
      case 'video': return 'Video Recording';
      case 'text': return 'Text Submission';
      case 'file': return 'File Upload';
      default: return 'Text Submission';
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-primary-dark">Original Submission</h2>
        <span className="inline-flex items-center gap-2 bg-secondary-teal/10 text-secondary-teal px-3 py-1.5 rounded-full text-xs font-medium">
          {getTypeIcon(idea.submissionType)}
          {getTypeLabel(idea.submissionType)}
        </span>
      </div>

      {/* Mock content based on submission type */}
      {idea.submissionType === 'voice' && (
        <div className="space-y-4">
          <div className="bg-secondary-teal/5 rounded-lg p-4">
            <audio controls className="w-full">
              <source src="" type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
          
          <div>
            <button className="text-sm text-secondary-teal font-medium mb-2 hover:underline">
              Show Transcription ▼
            </button>
            <div className="bg-secondary-teal/5 border-l-4 border-secondary-teal rounded-lg p-4">
              <p className="text-sm text-gray-700 leading-relaxed">
                I've noticed that small textile shops in our area generate a significant amount of fabric waste every week. 
                Most of this waste ends up in landfills because there's no easy way to share or exchange leftover materials 
                between shops. I think there's an opportunity to create a peer-to-peer marketplace where textile businesses 
                can trade or donate their fabric scraps. This would help reduce waste, save costs, and create a more 
                sustainable supply chain in the fashion industry.
              </p>
            </div>
          </div>
        </div>
      )}

      {idea.submissionType === 'video' && (
        <div className="space-y-4">
          <div className="relative bg-gray-900 rounded-lg overflow-hidden" style={{ aspectRatio: '16/9' }}>
            <video controls className="w-full h-full">
              <source src="" type="video/mp4" />
              Your browser does not support the video element.
            </video>
            <button className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-lg transition-colors">
              <span className="text-xl">⬇️</span>
            </button>
          </div>
        </div>
      )}

      {idea.submissionType === 'text' && (
        <div className="prose max-w-none">
          <p className="text-gray-800 leading-relaxed">
            Small textile shops and tailoring businesses in urban areas face a persistent challenge with fabric waste management. 
            On average, each shop generates 15-25kg of fabric scraps weekly from cutting and production processes. Currently, 
            these materials are either disposed of at a cost or stored indefinitely, taking up valuable space.
          </p>
          <p className="text-gray-800 leading-relaxed mt-4">
            The problem is compounded by the fact that what's waste for one shop could be valuable raw material for another. 
            Smaller shops making accessories, for example, could use the larger shops' offcuts. However, there's no efficient 
            platform connecting these businesses to facilitate material exchange.
          </p>
          <p className="text-gray-800 leading-relaxed mt-4">
            This creates a triple problem: environmental impact from textile waste, unnecessary disposal costs for businesses, 
            and missed revenue opportunities. A peer-to-peer fabric exchange marketplace could address all three issues while 
            promoting circular economy principles in the textile industry.
          </p>
          <div className="mt-4 text-right text-xs text-gray-500">
            248 words
          </div>
        </div>
      )}

      {idea.submissionType === 'file' && (
        <div className="bg-secondary-teal/5 border border-secondary-teal/20 rounded-lg p-5">
          <div className="flex items-center gap-4">
            <div className="text-5xl">📄</div>
            <div className="flex-1">
              <h4 className="font-bold text-primary-dark mb-1">textile-waste-analysis.pdf</h4>
              <p className="text-sm text-gray-600">2.3 MB • PDF Document</p>
            </div>
            <button className="text-secondary-teal hover:text-accent-blue transition-colors">
              <span className="text-2xl">⬇️</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OriginalSubmission;
