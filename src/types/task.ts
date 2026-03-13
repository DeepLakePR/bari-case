export type TaskPriority = "high" | "medium" | "low";
export type TaskFilterStatus = "all" | "pending" | "concluded";

export type Task = {
    id: string;
    title: string;
    description?: string;
    priority: TaskPriority;
    dueDate?: string | null;
    done: boolean;
};
