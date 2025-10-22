import { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import TaskColumn from './TaskColumn';
import TaskDetailModal from './TaskDetailModal';
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

interface TasksState {
  todo: Task[];
  inProgress: Task[];
  review: Task[];
  done: Task[];
}

interface TaskBoardProps {
  ventureId: string;
}

const TaskBoard = ({ ventureId }: TaskBoardProps) => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [tasks, setTasks] = useState<TasksState>({
    todo: [
      {
        id: 't1',
        title: 'Implement user authentication flow',
        priority: 'high' as const,
        assignee: { id: 't4', name: 'You', avatar: '' },
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        comments: 2,
        attachments: 1,
        blocked: false,
      },
      {
        id: 't2',
        title: 'Design dashboard components',
        priority: 'medium' as const,
        assignee: { id: 't3', name: 'Aisha', avatar: '' },
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        comments: 0,
        attachments: 0,
        blocked: false,
      },
    ],
    inProgress: [
      {
        id: 't3',
        title: 'Set up API endpoints',
        priority: 'high' as const,
        assignee: { id: 't2', name: 'Marco', avatar: '' },
        dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
        comments: 5,
        attachments: 2,
        blocked: false,
      },
    ],
    review: [
      {
        id: 't4',
        title: 'Complete wireframe designs',
        priority: 'medium' as const,
        assignee: { id: 't3', name: 'Aisha', avatar: '' },
        dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        comments: 3,
        attachments: 4,
        blocked: false,
      },
    ],
    done: [
      {
        id: 't5',
        title: 'Project setup and configuration',
        priority: 'low' as const,
        assignee: { id: 't2', name: 'Marco', avatar: '' },
        dueDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        comments: 1,
        attachments: 0,
        blocked: false,
      },
    ],
  });

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index)
      return;

    const sourceColumn = source.droppableId as keyof TasksState;
    const destColumn = destination.droppableId as keyof TasksState;

    const sourceTasks = [...tasks[sourceColumn]];
    const [removed] = sourceTasks.splice(source.index, 1);

    if (sourceColumn === destColumn) {
      sourceTasks.splice(destination.index, 0, removed);
      setTasks({ ...tasks, [sourceColumn]: sourceTasks });
    } else {
      const destTasks = [...tasks[destColumn]];
      destTasks.splice(destination.index, 0, removed);
      setTasks({
        ...tasks,
        [sourceColumn]: sourceTasks,
        [destColumn]: destTasks,
      });
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-5 h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">📋</span>
          <h2 className="text-lg font-bold text-[hsl(var(--primary-dark))]">Task Board</h2>
        </div>
        <Button className="bg-[hsl(var(--secondary-teal))] hover:bg-[hsl(var(--accent-blue))] text-white text-xs px-3 py-1.5 h-auto">
          + New Task
        </Button>
      </div>

      {/* Task Columns */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-4 gap-3 flex-1 overflow-x-auto">
          <TaskColumn
            id="todo"
            title="To Do"
            tasks={tasks.todo}
            count={tasks.todo.length}
            color="gray"
            onTaskClick={setSelectedTask}
          />
          <TaskColumn
            id="inProgress"
            title="In Progress"
            tasks={tasks.inProgress}
            count={tasks.inProgress.length}
            color="blue"
            onTaskClick={setSelectedTask}
          />
          <TaskColumn
            id="review"
            title="Review"
            tasks={tasks.review}
            count={tasks.review.length}
            color="amber"
            onTaskClick={setSelectedTask}
          />
          <TaskColumn
            id="done"
            title="Done"
            tasks={tasks.done}
            count={tasks.done.length}
            color="green"
            onTaskClick={setSelectedTask}
          />
        </div>
      </DragDropContext>

      {/* Task Detail Modal */}
      {selectedTask && (
        <TaskDetailModal task={selectedTask} onClose={() => setSelectedTask(null)} />
      )}
    </div>
  );
};

export default TaskBoard;
