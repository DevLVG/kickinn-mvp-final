import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import IssueReportModal from './IssueReportModal';

interface WorkspaceHeaderProps {
  ventureName: string;
  executorRole: string;
  overallProgress: number;
  contractId: string;
}

const WorkspaceHeader = ({
  ventureName,
  executorRole,
  overallProgress,
  contractId,
}: WorkspaceHeaderProps) => {
  const [showIssueModal, setShowIssueModal] = useState(false);

  return (
    <>
      <div className="bg-card border-b-2 border-[hsl(var(--secondary-teal))]/20 px-6 py-5 sticky top-0 z-20 shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-4">
          {/* Left Section */}
          <div>
            <Link
              to="/executor/active"
              className="text-sm font-medium text-[hsl(var(--secondary-teal))] hover:underline inline-flex items-center gap-1 mb-2"
            >
              <span>←</span>
              <span>Back to Active Projects</span>
            </Link>
            <div className="flex items-center gap-3 mt-2">
              <h1 className="text-2xl font-bold text-[hsl(var(--primary-dark))]">{ventureName}</h1>
              <div className="inline-flex items-center bg-[hsl(var(--secondary-teal))]/10 border border-[hsl(var(--secondary-teal))] px-3 py-1 rounded-full">
                <span className="text-xs font-medium text-[hsl(var(--secondary-teal))]">
                  {executorRole}
                </span>
              </div>
            </div>
          </div>

          {/* Center Section - Progress */}
          <div className="flex flex-col items-center">
            <p className="text-xs font-medium text-muted-foreground mb-1">Overall Progress</p>
            <div className="w-72 h-2.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[hsl(var(--secondary-teal))] to-[hsl(var(--accent-blue))] rounded-full transition-all duration-500"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
            <p className="text-sm font-bold text-[hsl(var(--secondary-teal))] mt-1">
              {overallProgress}% Complete
            </p>
          </div>

          {/* Right Section - Quick Actions */}
          <div className="flex gap-2">
            <Link to={`/executor/contracts/${contractId}`}>
              <Button variant="outline" className="flex items-center gap-2">
                <span>📄</span>
                <span className="text-sm">View Contract</span>
              </Button>
            </Link>
            <Button
              variant="outline"
              className="border-destructive text-destructive hover:bg-destructive/10 flex items-center gap-2"
              onClick={() => setShowIssueModal(true)}
            >
              <span>⚠️</span>
              <span className="text-sm">Report Issue</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Issue Report Modal */}
      <IssueReportModal
        isOpen={showIssueModal}
        onClose={() => setShowIssueModal(false)}
        ventureId=""
      />
    </>
  );
};

export default WorkspaceHeader;
