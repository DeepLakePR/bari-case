import type { TaskFilterStatus, TaskPriority } from "@/types/task";

export const PRIORITY_META = {
    high: { label: "Alta", color: "#bf2222" },
    medium: { label: "Média", color: "#f3a411" },
    low: { label: "Baixa", color: "#0dd2dc" },
} as const satisfies Record<TaskPriority, { label: string; color: string }>;

export const FILTER_OPTIONS = [
    { value: "all", label: "Todas" },
    { value: "pending", label: "Pendentes" },
    { value: "concluded", label: "Concluídas" },
] as const satisfies ReadonlyArray<{ value: TaskFilterStatus; label: string }>;
