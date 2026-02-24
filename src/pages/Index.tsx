import { useTaskStore } from "@/lib/taskStore";
import StatsCard from "@/components/StatsCard";
import TaskColumn from "@/components/TaskColumn";
import AddTaskDialog from "@/components/AddTaskDialog";
import { CheckCircle2, Clock, ListTodo, LayoutDashboard } from "lucide-react";

const Index = () => {
  const { tasks, addTask, deleteTask, moveTask } = useTaskStore();

  const todo = tasks.filter((t) => t.status === "todo");
  const inProgress = tasks.filter((t) => t.status === "in-progress");
  const done = tasks.filter((t) => t.status === "done");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary p-2">
              <LayoutDashboard className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">TaskFlow</h1>
              <p className="text-xs text-muted-foreground">Smart Task Management</p>
            </div>
          </div>
          <AddTaskDialog onAdd={addTask} />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <StatsCard title="To Do" value={todo.length} icon={ListTodo} accent="bg-primary/10 text-primary" />
          <StatsCard title="In Progress" value={inProgress.length} icon={Clock} accent="bg-priority-medium/10 text-priority-medium" />
          <StatsCard title="Completed" value={done.length} icon={CheckCircle2} accent="bg-priority-low/10 text-priority-low" />
        </div>

        {/* Columns */}
        <div className="flex gap-6 overflow-x-auto pb-4">
          <TaskColumn title="To Do" status="todo" tasks={todo} onDelete={deleteTask} onMove={moveTask} count={todo.length} dotColor="bg-primary" />
          <TaskColumn title="In Progress" status="in-progress" tasks={inProgress} onDelete={deleteTask} onMove={moveTask} count={inProgress.length} dotColor="bg-priority-medium" />
          <TaskColumn title="Done" status="done" tasks={done} onDelete={deleteTask} onMove={moveTask} count={done.length} dotColor="bg-priority-low" />
        </div>
      </main>
    </div>
  );
};

export default Index;
