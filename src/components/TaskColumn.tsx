import { Task, Status } from "@/lib/taskStore";
import TaskCard from "./TaskCard";

interface TaskColumnProps {
  title: string;
  status: Status;
  tasks: Task[];
  onDelete: (id: string) => void;
  onMove: (id: string, status: Status) => void;
  count: number;
  dotColor: string;
}

const TaskColumn = ({ title, tasks, onDelete, onMove, count, dotColor }: TaskColumnProps) => (
  <div className="flex-1 min-w-[280px]">
    <div className="flex items-center gap-2 mb-4">
      <span className={`h-2.5 w-2.5 rounded-full ${dotColor}`} />
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      <span className="text-xs text-muted-foreground ml-auto bg-muted rounded-full px-2 py-0.5">
        {count}
      </span>
    </div>
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onDelete={onDelete} onMove={onMove} />
      ))}
      {tasks.length === 0 && (
        <div className="rounded-lg border border-dashed border-border p-6 text-center">
          <p className="text-xs text-muted-foreground">No tasks</p>
        </div>
      )}
    </div>
  </div>
);

export default TaskColumn;
