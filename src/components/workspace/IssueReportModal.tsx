import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface IssueReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  ventureId: string;
}

const IssueReportModal = ({ isOpen, onClose, ventureId }: IssueReportModalProps) => {
  const { toast } = useToast();
  const [issueType, setIssueType] = useState('blocker');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');

  if (!isOpen) return null;

  const handleSubmit = () => {
    toast({
      title: 'Issue reported',
      description: 'The team has been notified',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-xl p-8 max-w-2xl w-full shadow-2xl">
        {/* Header */}
        <div className="text-center mb-6">
          <span className="text-5xl mb-3 block">⚠️</span>
          <h2 className="text-2xl font-bold text-[hsl(var(--primary-dark))]">Report an Issue</h2>
          <p className="text-sm text-muted-foreground mt-2">
            Let the team know about blockers or problems
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Issue Type</label>
            <select
              value={issueType}
              onChange={(e) => setIssueType(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--secondary-teal))]/20"
            >
              <option value="blocker">Blocker (prevents work)</option>
              <option value="bug">Bug (technical issue)</option>
              <option value="clarification">Clarification Needed</option>
              <option value="resource">Resource Request</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Description <span className="text-destructive">*</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the issue in detail..."
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--secondary-teal))]/20 min-h-[120px] resize-none"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Priority</label>
            <div className="flex gap-3">
              {['low', 'medium', 'high', 'critical'].map((p) => (
                <label key={p} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="priority"
                    value={p}
                    checked={priority === p}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-4 h-4 text-[hsl(var(--secondary-teal))]"
                  />
                  <span className="text-sm capitalize">{p}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-6">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!description.trim()}
            className="flex-1 bg-destructive hover:bg-destructive/90"
          >
            Submit Issue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IssueReportModal;
