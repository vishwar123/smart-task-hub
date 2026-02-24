import { Task, Status } from "@/lib/taskStore";
import { Trash2, ArrowRight, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onMove: (id: string, status: Status) => void;
}

const priorityStyles: Record<string, string> = {
  high: "bg-priority-high/15 text-priority-high border-priority-high/30",
  medium: "bg-priority-medium/15 text-priority-medium border-priority-medium/30",
  low: "bg-priority-low/15 text-priority-low border-priority-low/30",
};

const statusFlow: Record<Status, { prev?: Status; next?: Status }> = {
  todo: { next: "in-progress" },
  "in-progress": { prev: "todo", next: "done" },
  done: { prev: "in-progress" },
};

const TaskCard = ({ task, onDelete, onMove }: TaskCardProps) => {
  const flow = statusFlow[task.status];

  return (
    <div className="group rounded-lg border border-border bg-card p-4 transition-all hover:shadow-md hover:border-primary/30">
      <div className="flex items-start justify-between gap-2 mb-2">
        <h4 className="text-sm font-semibold text-card-foreground leading-tight">
          {task.title}
        </h4>
        <Badge variant="outline" className={`text-[10px] px-1.5 py-0 shrink-0 ${priorityStyles[task.priority]}`}>
          {task.priority}
        </Badge>
      </div>
      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
        {task.description}
      </p>
      <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex gap-1">
          {flow.prev && (
            <button
              onClick={() => onMove(task.id, flow.prev!)}
              className="rounded p-1 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
            </button>
          )}
          {flow.next && (
            <button
              onClick={() => onMove(task.id, flow.next!)}
              className="rounded p-1 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
        <button
          onClick={() => onDelete(task.id)}
          className="rounded p-1 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
