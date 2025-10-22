import { Button } from '@/components/ui/button';

interface Task {
  id: string;
  title: string;
  priority: 'high' | 'medium' | 'low';
  assignee?: { id: string; name: string; avatar: string };
  dueDate?: string;
  comments: number;
  attachments: number;
  blocked: boolean;
  blockerReason?: string;
}

interface TaskDetailModalProps {
  task: Task;
  onClose: () => void;
}

const TaskDetailModal = ({ task, onClose }: TaskDetailModalProps) => {
  const priorityColors = {
    high: '#ef4444',
    medium: '#f59e0b',
    low: '#6b7280',
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl p-8 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start gap-3 flex-1">
            <div
              className="w-3 h-3 rounded-full mt-1.5 flex-shrink-0"
              style={{ backgroundColor: priorityColors[task.priority] }}
            />
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-[hsl(var(--primary-dark))]">{task.title}</h2>
              <p className="text-xs text-muted-foreground mt-1">#TK-{task.id.slice(-3)}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-2xl text-muted-foreground hover:text-foreground transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Details */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-bold text-foreground mb-2 block">Status</label>
            <select className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--secondary-teal))]/20">
              <option>To Do</option>
              <option>In Progress</option>
              <option>Review</option>
              <option>Done</option>
              <option>Blocked</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-bold text-foreground mb-2 block">Assigned to</label>
            <select className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--secondary-teal))]/20">
              <option>{task.assignee?.name || 'Unassigned'}</option>
              <option>Sara (Dubai)</option>
              <option>Marco (Italy)</option>
              <option>Aisha (UAE)</option>
              <option>You</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-bold text-foreground mb-2 block">Due Date</label>
            <input
              type="date"
              defaultValue={
                task.dueDate
                  ? new Date(task.dueDate).toISOString().split('T')[0]
                  : undefined
              }
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--secondary-teal))]/20"
            />
          </div>

          <div>
            <label className="text-sm font-bold text-foreground mb-2 block">Priority</label>
            <select
              defaultValue={task.priority}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--secondary-teal))]/20"
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-bold text-foreground mb-2 block">Description</label>
            <textarea
              placeholder="Add task description..."
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--secondary-teal))]/20 min-h-[120px]"
              defaultValue="Implement the complete user authentication flow including login, signup, password reset, and email verification."
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-end mt-6 pt-6 border-t border-border">
          <Button variant="outline" className="border-destructive text-destructive">
            Delete Task
          </Button>
          <Button className="bg-gradient-to-r from-[hsl(var(--secondary-teal))] to-[hsl(var(--accent-blue))]">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailModal;
