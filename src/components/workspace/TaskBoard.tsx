import { useState, useEffect } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import TaskColumn from './TaskColumn';
import TaskDetailModal from './TaskDetailModal';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

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
    todo: [],
    inProgress: [],
    review: [],
    done: []
  });

  // Fetch and subscribe to tasks
  useEffect(() => {
    const fetchTasks = async () => {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('venture_id', ventureId);

      if (error) {
        console.error('Error fetching tasks:', error);
        return;
      }

      const grouped: TasksState = {
        todo: [],
        inProgress: [],
        review: [],
        done: []
      };

      data.forEach(task => {
        const taskObj: Task = {
          id: task.id,
          title: task.title,
          priority: task.priority as any,
          assignee: task.assignee_id ? { id: task.assignee_id, name: 'Team Member', avatar: '' } : undefined,
          dueDate: task.due_date,
          comments: task.comments_count,
          attachments: task.attachments_count,
          blocked: task.blocked,
          blockerReason: task.blocker_reason
        };

        if (task.status === 'todo') grouped.todo.push(taskObj);
        else if (task.status === 'inProgress') grouped.inProgress.push(taskObj);
        else if (task.status === 'review') grouped.review.push(taskObj);
        else if (task.status === 'done') grouped.done.push(taskObj);
      });

      setTasks(grouped);
    };

    fetchTasks();

    // Subscribe to real-time updates
    const channel = supabase
      .channel(`tasks-${ventureId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'tasks',
          filter: `venture_id=eq.${ventureId}`
        },
        () => {
          fetchTasks(); // Refetch all tasks on any change
          toast.success('Tasks updated');
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [ventureId]);

  const handleDragEnd = async (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index)
      return;

    const sourceColumn = source.droppableId as keyof TasksState;
    const destColumn = destination.droppableId as keyof TasksState;

    const sourceTasks = [...tasks[sourceColumn]];
    const [removed] = sourceTasks.splice(source.index, 1);

    // Optimistic update
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

      // Update task status in database
      try {
        const { error } = await supabase
          .from('tasks')
          .update({ status: destColumn })
          .eq('id', removed.id);

        if (error) throw error;
      } catch (error) {
        console.error('Error updating task:', error);
        toast.error('Failed to update task');
      }
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
