import { useState, useCallback } from "react";

export type Priority = "high" | "medium" | "low";
export type Status = "todo" | "in-progress" | "done";

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  createdAt: Date;
}

const initialTasks: Task[] = [
  { id: "1", title: "Design system audit", description: "Review and update design tokens across the app", priority: "high", status: "todo", createdAt: new Date("2026-02-20") },
  { id: "2", title: "API integration tests", description: "Write integration tests for user endpoints", priority: "medium", status: "todo", createdAt: new Date("2026-02-21") },
  { id: "3", title: "Dashboard analytics", description: "Implement chart components for the analytics view", priority: "low", status: "todo", createdAt: new Date("2026-02-22") },
  { id: "4", title: "Auth flow refactor", description: "Migrate to new auth provider", priority: "high", status: "in-progress", createdAt: new Date("2026-02-18") },
  { id: "5", title: "Mobile responsive nav", description: "Fix navigation layout on mobile devices", priority: "medium", status: "in-progress", createdAt: new Date("2026-02-19") },
  { id: "6", title: "Onboarding emails", description: "Set up automated email sequences", priority: "low", status: "done", createdAt: new Date("2026-02-15") },
  { id: "7", title: "Performance optimization", description: "Lazy load routes and optimize bundle size", priority: "high", status: "done", createdAt: new Date("2026-02-14") },
];

export function useTaskStore() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const addTask = useCallback((task: Omit<Task, "id" | "createdAt">) => {
    setTasks((prev) => [
      ...prev,
      { ...task, id: crypto.randomUUID(), createdAt: new Date() },
    ]);
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const moveTask = useCallback((id: string, status: Status) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status } : t))
    );
  }, []);

  return { tasks, addTask, deleteTask, moveTask };
}
