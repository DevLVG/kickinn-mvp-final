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

interface TaskCardProps {
  task: Task;
  isDragging: boolean;
}

const TaskCard = ({ task, isDragging }: TaskCardProps) => {
  const priorityColors = {
    high: 'border-l-red-500',
    medium: 'border-l-amber-500',
    low: 'border-l-gray-500',
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date();

  return (
    <div
      className={`bg-card border border-border ${priorityColors[task.priority]} border-l-4 rounded-lg p-3 shadow-sm hover:shadow-md transition-all duration-200 cursor-grab relative ${
        isDragging ? 'shadow-lg opacity-80' : ''
      }`}
    >
      {/* Blocker Flag */}
      {task.blocked && (
        <div
          className="absolute -top-2 -left-2 w-6 h-6 bg-destructive rounded-full flex items-center justify-center shadow-md"
          title={task.blockerReason || 'Task blocked'}
        >
          <span className="text-xs">🚫</span>
        </div>
      )}

      {/* Priority Indicator */}
      <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-current" />

      {/* Task Title */}
      <h4 className="text-sm font-bold text-[hsl(var(--primary-dark))] mb-2 pr-4 line-clamp-2">
        {task.title}
      </h4>

      {/* Assignee */}
      {task.assignee && (
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[hsl(var(--secondary-teal))] to-[hsl(var(--accent-blue))] flex items-center justify-center text-white text-xs font-bold">
            {task.assignee.name[0]}
          </div>
          <span className="text-xs text-muted-foreground">{task.assignee.name}</span>
        </div>
      )}

      {/* Metadata */}
      <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
        {task.dueDate && (
          <div className={`flex items-center gap-1 ${isOverdue ? 'text-destructive font-medium' : ''}`}>
            <span>📅</span>
            <span>{new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
          </div>
        )}
        {task.comments > 0 && (
          <div className="flex items-center gap-1">
            <span>💬</span>
            <span>{task.comments}</span>
          </div>
        )}
        {task.attachments > 0 && (
          <div className="flex items-center gap-1">
            <span>📎</span>
            <span>{task.attachments}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
