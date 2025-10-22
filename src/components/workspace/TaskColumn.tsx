import { Droppable, Draggable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';

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

interface TaskColumnProps {
  id: string;
  title: string;
  tasks: Task[];
  count: number;
  color: 'gray' | 'blue' | 'amber' | 'green';
  onTaskClick: (task: Task) => void;
}

const TaskColumn = ({ id, title, tasks, count, color, onTaskClick }: TaskColumnProps) => {
  const colorConfig = {
    gray: { header: 'bg-gray-200', badge: 'bg-gray-600' },
    blue: { header: 'bg-blue-500/10', badge: 'bg-blue-600' },
    amber: { header: 'bg-amber-500/10', badge: 'bg-amber-600' },
    green: { header: 'bg-green-500/10', badge: 'bg-green-600' },
  };

  return (
    <div className="bg-muted border border-border rounded-lg p-3 flex flex-col min-h-[400px]">
      {/* Column Header */}
      <div
        className={`${colorConfig[color].header} px-3 py-2 rounded-lg mb-3 flex items-center justify-between`}
      >
        <h3 className="text-xs font-bold uppercase text-foreground">{title}</h3>
        <div
          className={`${colorConfig[color].badge} text-white px-2 py-0.5 rounded-full text-[11px] font-bold`}
        >
          {count}
        </div>
      </div>

      {/* Droppable Area */}
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 space-y-2 ${snapshot.isDraggingOver ? 'bg-muted' : ''}`}
          >
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    onClick={() => onTaskClick(task)}
                  >
                    <TaskCard task={task} isDragging={snapshot.isDragging} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TaskColumn;
